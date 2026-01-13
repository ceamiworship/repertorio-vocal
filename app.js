(function () {
  const LS_KEY = "ceami_vocal_data_v1";
  const LS_VIEW_KEY = "ceami_view_pref_v1";
  const LS_RANK_KEY = "ceami_rank_pref_v1";
  const LS_KEYFILTER_KEY = "ceami_key_pref_v1";

  const els = {
    view: document.getElementById("view"),
    q: document.getElementById("q"),
    rank: document.getElementById("rank"),
    keyFilter: document.getElementById("keyFilter"),
    results: document.getElementById("results"),
    dataStatus: document.getElementById("dataStatus"),

    toggleAdmin: document.getElementById("toggleAdmin"),
    adminArea: document.getElementById("adminArea"),
    adminJson: document.getElementById("adminJson"),
    saveData: document.getElementById("saveData"),
    resetData: document.getElementById("resetData"),
    copyData: document.getElementById("copyData"),
  };

  function loadData() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { data: window.APP_DATA_DEFAULT, status: "padrão" };
    try {
      const parsed = JSON.parse(raw);
      return { data: parsed, status: "local" };
    } catch {
      return { data: window.APP_DATA_DEFAULT, status: "padrão" };
    }
  }

  function saveDataToLocal(data) {
    localStorage.setItem(LS_KEY, JSON.stringify(data, null, 2));
  }

  function resetLocal() {
    localStorage.removeItem(LS_KEY);
  }

  function normalize(str) {
    return (str || "")
      .toString()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function escapeHtml(str) {
    return (str ?? "").toString()
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function memberById(data, id) {
    return data.members.find(m => m.id === id);
  }

  function songById(data, id) {
    return data.songs.find(s => s.id === id);
  }

  function rankMatches(rankValue, assignmentRank) {
    if (rankValue === "all") return true;
    if (rankValue === "1-5") return assignmentRank >= 1 && assignmentRank <= 5;
    if (rankValue === "6-10") return assignmentRank >= 6 && assignmentRank <= 10;
    const exact = parseInt(rankValue, 10);
    return Number.isFinite(exact) ? assignmentRank === exact : true;
  }

  function keyMatches(keyValue, assignmentKey) {
    if (keyValue === "all") return true;
    const a = normalize(assignmentKey);
    const k = normalize(keyValue);

    // Se o assignment for "E ou F", aceitamos quando filtro for "E" ou "F" ou "E ou F"
    if (a.includes("ou")) {
      // quebra por "ou"
      const parts = a.split("ou").map(s => s.trim());
      return parts.includes(k) || a === k;
    }

    return a === k;
  }

  function getAllKeys(data) {
    const set = new Set();
    for (const a of data.assignments || []) {
      if (!a.key) continue;
      set.add(a.key.trim());
    }
    // ordena com locale pt-BR, e empurra os "ou" pro final
    const arr = Array.from(set);
    arr.sort((x, y) => {
      const xo = normalize(x).includes("ou") ? 1 : 0;
      const yo = normalize(y).includes("ou") ? 1 : 0;
      if (xo !== yo) return xo - yo;
      return x.localeCompare(y, "pt-BR");
    });
    return arr;
  }

  function renderKeyOptions(data) {
    const keys = getAllKeys(data);
    const current = els.keyFilter.value || "all";
    els.keyFilter.innerHTML =
      `<option value="all">Todos</option>` +
      keys.map(k => `<option value="${escapeHtml(k)}">${escapeHtml(k)}</option>`).join("");

    // tenta manter selecionado
    if ([...els.keyFilter.options].some(o => o.value === current)) {
      els.keyFilter.value = current;
    } else {
      els.keyFilter.value = "all";
    }
  }

  function renderSongsView(data, q, rankValue, keyValue) {
    const qn = normalize(q);

    // songId -> assignments filtrados
    const map = new Map();

    for (const a of data.assignments) {
      if (!rankMatches(rankValue, a.rank)) continue;
      if (!keyMatches(keyValue, a.key || "")) continue;

      if (!map.has(a.songId)) map.set(a.songId, []);
      map.get(a.songId).push(a);
    }

    let songs = data.songs
      .map(s => ({ song: s, list: map.get(s.id) || [] }))
      .filter(x => x.list.length > 0);

    if (qn) {
      songs = songs.filter(x => normalize(x.song.title).includes(qn));
    }

    songs.sort((a, b) => a.song.title.localeCompare(b.song.title, "pt-BR"));

    if (!songs.length) {
      els.results.innerHTML =
        `<div class="item"><h3>Nenhum resultado</h3><div class="meta">Tente mudar a busca, domínio ou tom.</div></div>`;
      return;
    }

    els.results.innerHTML = songs.map(({ song, list }) => {
      const sorted = [...list].sort((x, y) => x.rank - y.rank);

      const chips = sorted.map(a => {
        const m = memberById(data, a.memberId);
        const name = m?.name ?? a.memberId;
        const key = a.key || "-";
        return `<span class="chip good"><span>${escapeHtml(name)} · #${a.rank}</span><b>${escapeHtml(key)}</b></span>`;
      }).join("");

      return `
        <article class="item">
          <h3>${escapeHtml(song.title)}</h3>
          <div class="meta">Quem canta (domínio • tom):</div>
          <div class="chips">${chips}</div>
        </article>
      `;
    }).join("");
  }

  function renderMembersView(data, q, rankValue, keyValue) {
    const qn = normalize(q);

    let members = data.members.slice();
    if (qn) {
      members = members.filter(m => normalize(m.name).includes(qn));
    }
    members.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

    if (!members.length) {
      els.results.innerHTML =
        `<div class="item"><h3>Nenhum vocal encontrado</h3><div class="meta">Tente outra busca.</div></div>`;
      return;
    }

    els.results.innerHTML = members.map(m => {
      let list = data.assignments
        .filter(a => a.memberId === m.id)
        .filter(a => rankMatches(rankValue, a.rank))
        .filter(a => keyMatches(keyValue, a.key || ""))
        .sort((a, b) => a.rank - b.rank);

      const chips = list.length
        ? list.map(a => {
            const s = songById(data, a.songId);
            const title = s?.title ?? a.songId;
            const key = a.key || "-";
            return `<span class="chip good"><span>#${a.rank} · ${escapeHtml(title)}</span><b>${escapeHtml(key)}</b></span>`;
          }).join("")
        : `<span class="chip warn"><span>Sem músicas nesse filtro</span><b>—</b></span>`;

      return `
        <article class="item">
          <h3>${escapeHtml(m.name)}</h3>
          <div class="meta">Top 10 (domínio):</div>
          <div class="chips">${chips}</div>
        </article>
      `;
    }).join("");
  }

  function applySavedPrefs() {
    const savedView = localStorage.getItem(LS_VIEW_KEY);
    if (savedView === "songs" || savedView === "members") els.view.value = savedView;

    const savedRank = localStorage.getItem(LS_RANK_KEY);
    if (savedRank && [...els.rank.options].some(o => o.value === savedRank)) {
      els.rank.value = savedRank;
    }

    const savedKey = localStorage.getItem(LS_KEYFILTER_KEY);
    if (savedKey) {
      // não setamos aqui ainda, porque as options são montadas após carregar dados
      // fica pro renderKeyOptions + validação
    }
  }

  function render() {
    const { data, status } = loadData();
    els.dataStatus.textContent = `Dados: ${status}`;

    // monta filtro de tom baseado nos dados
    renderKeyOptions(data);

    // aplica preferências (view/rank) e tenta aplicar keyFilter salvo
    applySavedPrefs();

    const savedKey = localStorage.getItem(LS_KEYFILTER_KEY);
    if (savedKey && [...els.keyFilter.options].some(o => normalize(o.value) === normalize(savedKey))) {
      // encontra option exata (caso encoding etc)
      const opt = [...els.keyFilter.options].find(o => normalize(o.value) === normalize(savedKey));
      if (opt) els.keyFilter.value = opt.value;
    }

    const view = els.view.value;
    const q = els.q.value;
    const rankValue = els.rank.value;
    const keyValue = els.keyFilter.value;

    if (view === "songs") renderSongsView(data, q, rankValue, keyValue);
    else renderMembersView(data, q, rankValue, keyValue);

    // Admin JSON
    els.adminJson.value = JSON.stringify(data, null, 2);
  }

  // Admin
  els.toggleAdmin.addEventListener("click", () => {
    const isHidden = els.adminArea.classList.contains("hidden");
    els.adminArea.classList.toggle("hidden");
    els.toggleAdmin.textContent = isHidden ? "Fechar" : "Abrir";
    render();
  });

  els.saveData.addEventListener("click", () => {
    try {
      const parsed = JSON.parse(els.adminJson.value);
      if (!parsed.members || !parsed.songs || !parsed.assignments) {
        throw new Error("JSON precisa ter members, songs e assignments");
      }
      saveDataToLocal(parsed);
      render();
      alert("Salvo no navegador!");
    } catch (e) {
      alert("Erro no JSON: " + (e?.message || "formato inválido"));
    }
  });

  els.resetData.addEventListener("click", () => {
    resetLocal();
    render();
    alert("Voltou ao padrão.");
  });

  els.copyData.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(els.adminJson.value);
      alert("JSON copiado!");
    } catch {
      alert("Não consegui copiar automaticamente. Selecione e copie manualmente.");
    }
  });

  // Preferências + render
  els.view.addEventListener("change", () => {
    localStorage.setItem(LS_VIEW_KEY, els.view.value);
    render();
  });

  els.rank.addEventListener("change", () => {
    localStorage.setItem(LS_RANK_KEY, els.rank.value);
    render();
  });

  els.keyFilter.addEventListener("change", () => {
    localStorage.setItem(LS_KEYFILTER_KEY, els.keyFilter.value);
    render();
  });

  els.q.addEventListener("input", render);

  render();
})();
