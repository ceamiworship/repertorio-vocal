(function () {
  const els = {
    view: document.getElementById("view"),
    q: document.getElementById("q"),
    person: document.getElementById("personSelect"),
    rank: document.getElementById("rank"),
    key: document.getElementById("keyFilter"),
    results: document.getElementById("results"),
    unusedList: document.getElementById("unusedList"),
    unusedCount: document.getElementById("unusedCount"),
    dataStatus: document.getElementById("dataStatus"),
  };

  const data = window.APP_DATA_DEFAULT;

  function norm(s) {
    return (s || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
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

  function yt(song) {
    const q = `${song?.title || ""} ${song?.artist || ""}`.trim();
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
  }

  function songById(id) {
    return (data.songs || []).find(s => s.id === id);
  }

  function memberById(id) {
    return (data.members || []).find(m => m.id === id);
  }

  function rankPass(rankFilter, rank) {
    if (rankFilter === "all") return true;
    if (rankFilter === "1-5") return rank >= 1 && rank <= 5;
    if (rankFilter === "6-10") return rank >= 6 && rank <= 10;
    const exact = parseInt(rankFilter, 10);
    return Number.isFinite(exact) ? rank === exact : true;
  }

  function keyPass(keyFilter, keyValue) {
    if (keyFilter === "all") return true;
    return norm(keyValue) === norm(keyFilter);
  }

  function fillPersons() {
    const members = (data.members || []).slice().sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    els.person.innerHTML =
      `<option value="">Todas as pessoas</option>` +
      members.map(m => `<option value="${escapeHtml(m.id)}">${escapeHtml(m.name)}</option>`).join("");
  }

  function fillKeys() {
    const set = new Set();
    for (const a of (data.assignments || [])) {
      if (a.key) set.add(a.key.trim());
    }
    const keys = Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
    els.key.innerHTML =
      `<option value="all">Todos</option>` +
      keys.map(k => `<option value="${escapeHtml(k)}">${escapeHtml(k)}</option>`).join("");
  }

  function toggleSearchMode() {
    const byPerson = els.view.value === "members";
    els.person.classList.toggle("hidden", !byPerson);
    els.q.classList.toggle("hidden", byPerson);

    if (byPerson) {
      els.q.value = "";
    } else {
      els.person.value = "";
    }
  }

  function renderMembers() {
    const selectedPersonId = els.person.value;
    const qn = norm(els.q.value);
    const rankFilter = els.rank.value;
    const keyFilter = els.key.value;

    let members = (data.members || []).slice().sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

    if (selectedPersonId) members = members.filter(m => m.id === selectedPersonId);

    // Se estiver em modo texto (quando não é por pessoa), permite filtrar por nome
    if (qn && els.view.value !== "members") {
      members = members.filter(m => norm(m.name).includes(qn));
    }

    const html = members.map(m => {
      let list = (data.assignments || [])
        .filter(a => a.memberId === m.id)
        .filter(a => rankPass(rankFilter, a.rank))
        .filter(a => keyPass(keyFilter, a.key || ""))
        .sort((a, b) => a.rank - b.rank);

      // Se estiver usando busca texto (fora do select), filtra também por música/cantor
      if (qn && els.view.value !== "members") {
        list = list.filter(a => {
          const s = songById(a.songId);
          return s ? (norm(s.title).includes(qn) || norm(s.artist || "").includes(qn)) : false;
        });
      }

      const rows = list.map(a => {
        const s = songById(a.songId) || { title: a.songId, artist: "" };
        const title = s.title || a.songId;
        const artist = s.artist || "—";
        const key = a.key || "—";

        return `
          <div class="rowItem">
            <div class="songText">
              <div class="line1">#${a.rank}. ${escapeHtml(title)}</div>
              <div class="line2">${escapeHtml(artist)}</div>
            </div>
            <div class="kBadge">${escapeHtml(key)}</div>
            <a class="yt" href="${yt(s)}" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        `;
      }).join("");

      return `
        <article class="item">
          <h3>${escapeHtml(m.name)}</h3>
          <div class="list">
            ${rows || `<div class="muted">Sem músicas nesse filtro.</div>`}
          </div>
        </article>
      `;
    }).join("");

    els.results.innerHTML = html || `
      <article class="item">
        <h3>Nenhum resultado</h3>
        <div class="muted">Tente limpar filtros.</div>
      </article>
    `;
  }

  function renderSongs() {
    const qn = norm(els.q.value);
    const rankFilter = els.rank.value;
    const keyFilter = els.key.value;

    // agrupa por música
    const map = new Map();
    for (const a of (data.assignments || [])) {
      if (!rankPass(rankFilter, a.rank)) continue;
      if (!keyPass(keyFilter, a.key || "")) continue;
      if (!map.has(a.songId)) map.set(a.songId, []);
      map.get(a.songId).push(a);
    }

    let songs = (data.songs || [])
      .map(s => ({ song: s, list: map.get(s.id) || [] }))
      .filter(x => x.list.length > 0);

    if (qn) {
      songs = songs.filter(x =>
        norm(x.song.title).includes(qn) || norm(x.song.artist || "").includes(qn)
      );
    }

    songs.sort((a, b) => (a.song.title || "").localeCompare(b.song.title || "", "pt-BR"));

    const html = songs.map(({ song, list }) => {
      list.sort((a, b) => a.rank - b.rank);

      const rows = list.map(a => {
        const member = memberById(a.memberId);
        const name = member?.name || a.memberId;
        const key = a.key || "—";

        return `
          <div class="rowItem">
            <div class="songText">
              <div class="line1">${escapeHtml(name)} · #${a.rank}</div>
              <div class="line2">canta este louvor</div>
            </div>
            <div class="kBadge">${escapeHtml(key)}</div>
            <span class="yt" style="opacity:.55;pointer-events:none;">YouTube</span>
          </div>
        `;
      }).join("");

      return `
        <article class="item">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;">
            <div>
              <h3 style="margin:0;">${escapeHtml(song.title || "")}</h3>
              <div class="muted small">${escapeHtml(song.artist || "—")}</div>
            </div>
            <a class="yt" href="${yt(song)}" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <div class="divider" style="margin:10px 0;"></div>
          <div class="list">${rows}</div>
        </article>
      `;
    }).join("");

    els.results.innerHTML = html || `
      <article class="item">
        <h3>Nenhum resultado</h3>
        <div class="muted">Tente limpar busca/filtros.</div>
      </article>
    `;
  }

  function renderUnused() {
    const used = new Set((data.assignments || []).map(a => a.songId));
    const unused = (data.songs || [])
      .filter(s => !used.has(s.id))
      .sort((a, b) => (a.title || "").localeCompare(b.title || "", "pt-BR"));

    els.unusedCount.textContent = String(unused.length);

    els.unusedList.innerHTML = unused.map(s => {
      const title = s.title || "";
      const artist = s.artist || "—";
      return `
        <div class="unusedItem">
          <div class="unusedText">
            <p class="unusedTitle" title="${escapeHtml(title)}">${escapeHtml(title)}</p>
            <div class="unusedArtist" title="${escapeHtml(artist)}">${escapeHtml(artist)}</div>
          </div>
          <div class="unusedActions">
            <a class="yt ytSmall" href="${yt(s)}" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      `;
    }).join("") || `
      <article class="item">
        <h3>0 músicas</h3>
        <div class="muted">Todas as músicas do catálogo aparecem em algum Top 10.</div>
      </article>
    `;
  }

  function render() {
    if (!data || !data.members || !data.songs || !data.assignments) {
      els.results.innerHTML = `
        <article class="item">
          <h3>Dados não carregaram</h3>
          <div class="muted">Verifique se <code>data.js</code> está antes de <code>app.js</code>.</div>
        </article>
      `;
      return;
    }

    if (els.dataStatus) els.dataStatus.textContent = "Dados: padrão";

    // garante que os selects estão preenchidos
    if (els.person && els.person.options.length <= 1) fillPersons();
    if (els.key && els.key.options.length <= 1) fillKeys();

    if (els.view.value === "songs") renderSongs();
    else renderMembers();

    renderUnused();
  }

  // Eventos
  els.view.addEventListener("change", () => { toggleSearchMode(); render(); });
  els.rank.addEventListener("change", render);
  els.key.addEventListener("change", render);
  els.q.addEventListener("input", render);
  els.person.addEventListener("change", render);

  // Init
  toggleSearchMode();
  fillPersons();
  fillKeys();
  render();
})();
