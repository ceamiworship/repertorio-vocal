// Dados extraídos do TXT do grupo VOCAL CEAMI WORSHIP (listas 1–10 por domínio)
// Observação: nomes foram normalizados para evitar duplicados (ex.: "Oh"/"O" quão lindo esse nome é).

window.APP_DATA_DEFAULT = {
  members: [
    { id: "ana", name: "Ana" },
    { id: "daniela", name: "Daniela" },
    { id: "elisama", name: "Elisama" },
    { id: "eduarda", name: "Eduarda" },
    { id: "nicolas", name: "Nicolas" },
    { id: "gabriel_lima", name: "Gabriel" },
    { id: "kauane", name: "Kauane" },
    { id: "kaua", name: "Kauã" },
    { id: "keila", name: "Keila" },
    { id: "filipe", name: "Filipe" },
    { id: "giovana", name: "Giovana" },
    { id: "davi", name: "Davi" },
  ],

  // Catálogo (somente títulos canônicos)
  songs: [
    { id: "em-teu-nome", title: "Em Teu Nome" },
    { id: "yeshua", title: "Yeshua" },
    { id: "eu-te-louvarei", title: "Eu Te Louvarei" },
    { id: "alem-do-impossivel", title: "Além do Impossível" },
    { id: "jesus-em-tua-presenca", title: "Jesus em Tua Presença" },
    { id: "teu-toque", title: "Teu Toque" },
    { id: "tu-es-bom", title: "Tu És Bom" },
    { id: "paz-sem-fim", title: "Paz Sem Fim" },
    { id: "eu-me-rendo", title: "Eu Me Rendo" },
    { id: "filho-do-deus-vivo", title: "Filho do Deus Vivo" },

    { id: "agnus-dei", title: "Agnus Dei" },
    { id: "clamo-jesus", title: "Clamo Jesus" },
    { id: "levanto-um-aleluia", title: "Levanto Um Aleluia" },
    { id: "oh-quao-lindo-esse-nome-e", title: "Oh Quão Lindo Esse Nome É" },
    { id: "poderoso-deus", title: "Poderoso Deus" },
    { id: "sublime", title: "Sublime" },
    { id: "vida-aos-sepulcros", title: "Vida Aos Sepulcros" },

    { id: "tudo-e-perda", title: "Tudo É Perda" },
    { id: "preciso-de-ti", title: "Preciso de Ti" },
    { id: "tudo-e-teu", title: "Tudo É Teu" },
    { id: "e-ele", title: "É Ele" },
    { id: "que-ele-cresca", title: "Que Ele Cresça" },
    { id: "quem-e-como-nosso-deus", title: "Quem É Como Nosso Deus?" },
    { id: "mais-do-que-tudo", title: "Mais do Que Tudo" },
    { id: "a-ele-a-gloria", title: "A Ele a Glória" },

    { id: "a-espreita-de-ti", title: "À Espreita de Ti" },
    { id: "santo", title: "Santo" },
    { id: "so-tu-es-santo", title: "Só Tu És Santo" },
    { id: "maravilhosa-graca", title: "Maravilhosa Graça" },
    { id: "tua-igreja-canta", title: "Tua Igreja Canta" },

    { id: "cristo", title: "Cristo" },
    { id: "dependo-de-ti", title: "Dependo de Ti" },
    { id: "glorioso-dia", title: "Glorioso Dia" },
    { id: "toda-terra", title: "Toda Terra" },

    { id: "ao-que-esta-assentado", title: "Ao Que Está Assentado" },
    { id: "ha-poder", title: "Há Poder" },
    { id: "sem-ti-nao-irei", title: "Sem Ti Não Irei" },
    { id: "milagres", title: "Milagres" },
    { id: "vem-sobre-nos", title: "Vem Sobre Nós" },

    { id: "bondade-de-deus", title: "Bondade de Deus" },
    { id: "meia-noite", title: "Meia Noite" },
    { id: "que-se-abram-os-ceus", title: "Que Se Abram os Céus" },
    { id: "ao-lembrarmos", title: "Ao Lembrarmos" },

    { id: "me-ama", title: "Me Ama" },
    { id: "fogo-em-teus-olhos-eu-navegarei", title: "Fogo em Teus Olhos / Eu Navegarei" },

    { id: "teu-amor-nao-falha", title: "Teu Amor Não Falha" },
    { id: "desperta", title: "Desperta" },
    { id: "altar", title: "Altar" },

    { id: "veste-de-louvor", title: "Vestes de Louvor" },
    { id: "essa-casa-e-sua-casa", title: "Essa Casa É Sua Casa" },

    { id: "quem-e-esse", title: "Quem É Esse" },
    { id: "tao-profundo", title: "Tão Profundo" },
    { id: "a-tua-mesa-cura", title: "A Tua Mesa Cura" },

    { id: "redentor", title: "Redentor" },
    { id: "maranata", title: "Maranata" },
    { id: "senhor-tu-es-bom", title: "Senhor, Tu És Bom" },
    { id: "me-ama-gratidao", title: "Me Ama + Gratidão" },
  ],

  // Relacionamento: quem canta o quê + rank (1-10) + tom (por pessoa)
  assignments: [
    // ANA
    { memberId: "ana", songId: "em-teu-nome", rank: 1, key: "E" },
    { memberId: "ana", songId: "yeshua", rank: 2, key: "G" },
    { memberId: "ana", songId: "eu-te-louvarei", rank: 3, key: "C" },
    { memberId: "ana", songId: "alem-do-impossivel", rank: 4, key: "C" },
    { memberId: "ana", songId: "jesus-em-tua-presenca", rank: 5, key: "C" },
    { memberId: "ana", songId: "teu-toque", rank: 6, key: "G" },
    { memberId: "ana", songId: "tu-es-bom", rank: 7, key: "D" },
    { memberId: "ana", songId: "paz-sem-fim", rank: 8, key: "E" },
    { memberId: "ana", songId: "eu-me-rendo", rank: 9, key: "G" },
    { memberId: "ana", songId: "filho-do-deus-vivo", rank: 10, key: "E" },

    // DANIELA
    { memberId: "daniela", songId: "agnus-dei", rank: 1, key: "F" },
    { memberId: "daniela", songId: "alem-do-impossivel", rank: 2, key: "Db" },
    { memberId: "daniela", songId: "clamo-jesus", rank: 3, key: "C" },
    { memberId: "daniela", songId: "eu-te-louvarei", rank: 4, key: "C" },
    { memberId: "daniela", songId: "levanto-um-aleluia", rank: 5, key: "Db" },
    { memberId: "daniela", songId: "oh-quao-lindo-esse-nome-e", rank: 6, key: "D" },
    { memberId: "daniela", songId: "poderoso-deus", rank: 7, key: "G" },
    { memberId: "daniela", songId: "sublime", rank: 8, key: "E" },
    { memberId: "daniela", songId: "teu-toque", rank: 9, key: "G" },
    { memberId: "daniela", songId: "vida-aos-sepulcros", rank: 10, key: "C" },

    // ELISAMA
    { memberId: "elisama", songId: "tudo-e-perda", rank: 1, key: "C" },
    { memberId: "elisama", songId: "clamo-jesus", rank: 2, key: "C" },
    { memberId: "elisama", songId: "preciso-de-ti", rank: 3, key: "F" },
    { memberId: "elisama", songId: "tudo-e-teu", rank: 4, key: "C" },
    { memberId: "elisama", songId: "e-ele", rank: 5, key: "C" },
    { memberId: "elisama", songId: "que-ele-cresca", rank: 6, key: "G" },
    { memberId: "elisama", songId: "quem-e-como-nosso-deus", rank: 7, key: "G" },
    { memberId: "elisama", songId: "mais-do-que-tudo", rank: 8, key: "C" },
    { memberId: "elisama", songId: "a-ele-a-gloria", rank: 9, key: "E" },
    { memberId: "elisama", songId: "filho-do-deus-vivo", rank: 10, key: "E" },

    // EDUARDA (obs: "Teu Toque" aparece 2x no TXT; mantive os dois ranks)
    { memberId: "eduarda", songId: "teu-toque", rank: 1, key: "G" },
    { memberId: "eduarda", songId: "a-espreita-de-ti", rank: 2, key: "C" },
    { memberId: "eduarda", songId: "clamo-jesus", rank: 3, key: "C" },
    { memberId: "eduarda", songId: "oh-quao-lindo-esse-nome-e", rank: 4, key: "C" },
    { memberId: "eduarda", songId: "santo", rank: 5, key: "G" },
    { memberId: "eduarda", songId: "filho-do-deus-vivo", rank: 6, key: "E" },
    { memberId: "eduarda", songId: "so-tu-es-santo", rank: 7, key: "D" },
    { memberId: "eduarda", songId: "maravilhosa-graca", rank: 8, key: "D" },
    { memberId: "eduarda", songId: "teu-toque", rank: 9, key: "G" },
    { memberId: "eduarda", songId: "tua-igreja-canta", rank: 10, key: "E" },

    // NICOLAS
    { memberId: "nicolas", songId: "cristo", rank: 1, key: "A" },
    { memberId: "nicolas", songId: "e-ele", rank: 2, key: "A" },
    { memberId: "nicolas", songId: "sublime", rank: 3, key: "C" },
    { memberId: "nicolas", songId: "que-ele-cresca", rank: 4, key: "D" },
    { memberId: "nicolas", songId: "dependo-de-ti", rank: 5, key: "E ou F" },
    { memberId: "nicolas", songId: "glorioso-dia", rank: 6, key: "D" },
    { memberId: "nicolas", songId: "em-teu-nome", rank: 7, key: "F" },
    { memberId: "nicolas", songId: "tudo-e-teu", rank: 8, key: "A" },
    { memberId: "nicolas", songId: "tudo-e-perda", rank: 9, key: "C" },
    { memberId: "nicolas", songId: "toda-terra", rank: 10, key: "E" },

    // GABRIEL
    { memberId: "gabriel_lima", songId: "ao-que-esta-assentado", rank: 1, key: "A" },
    { memberId: "gabriel_lima", songId: "cristo", rank: 2, key: "G" },
    { memberId: "gabriel_lima", songId: "ha-poder", rank: 3, key: "A" },
    { memberId: "gabriel_lima", songId: "sublime", rank: 4, key: "D" },
    { memberId: "gabriel_lima", songId: "e-ele", rank: 5, key: "A" },
    { memberId: "gabriel_lima", songId: "sem-ti-nao-irei", rank: 6, key: "A" },
    { memberId: "gabriel_lima", songId: "tudo-e-perda", rank: 7, key: "C" },
    { memberId: "gabriel_lima", songId: "so-tu-es-santo", rank: 8, key: "A" },
    { memberId: "gabriel_lima", songId: "milagres", rank: 9, key: "A" },
    { memberId: "gabriel_lima", songId: "vem-sobre-nos", rank: 10, key: "A" },

    // KAUANE
    { memberId: "kauane", songId: "ao-que-esta-assentado", rank: 1, key: "D" },
    { memberId: "kauane", songId: "bondade-de-deus", rank: 2, key: "G" },
    { memberId: "kauane", songId: "preciso-de-ti", rank: 3, key: "G" },
    { memberId: "kauane", songId: "a-espreita-de-ti", rank: 4, key: "C" },
    { memberId: "kauane", songId: "meia-noite", rank: 5, key: "D" },
    { memberId: "kauane", songId: "que-se-abram-os-ceus", rank: 6, key: "G" },
    { memberId: "kauane", songId: "so-tu-es-santo", rank: 7, key: "D" },
    { memberId: "kauane", songId: "mais-do-que-tudo", rank: 8, key: "D" },
    { memberId: "kauane", songId: "sem-ti-nao-irei", rank: 9, key: "D" },
    { memberId: "kauane", songId: "ao-lembrarmos", rank: 10, key: "E" },

    // KAUÃ
    { memberId: "kaua", songId: "dependo-de-ti", rank: 1, key: "E" },
    { memberId: "kaua", songId: "me-ama", rank: 2, key: "C" },
    { memberId: "kaua", songId: "fogo-em-teus-olhos-eu-navegarei", rank: 3, key: "F" },
    { memberId: "kaua", songId: "milagres", rank: 4, key: "C" },
    { memberId: "kaua", songId: "glorioso-dia", rank: 5, key: "E" },
    { memberId: "kaua", songId: "alem-do-impossivel", rank: 6, key: "C" },
    { memberId: "kaua", songId: "tudo-e-perda", rank: 7, key: "C" },
    { memberId: "kaua", songId: "sem-ti-nao-irei", rank: 8, key: "A" },
    { memberId: "kaua", songId: "e-ele", rank: 9, key: "A" },
    { memberId: "kaua", songId: "que-ele-cresca", rank: 10, key: "D" },

    // KEILA
    { memberId: "keila", songId: "yeshua", rank: 1, key: "G" },
    { memberId: "keila", songId: "teu-amor-nao-falha", rank: 2, key: "C" },
    { memberId: "keila", songId: "desperta", rank: 3, key: "E" },
    { memberId: "keila", songId: "que-ele-cresca", rank: 4, key: "G" },
    { memberId: "keila", songId: "alem-do-impossivel", rank: 5, key: "C#" },
    { memberId: "keila", songId: "paz-sem-fim", rank: 6, key: "E" },
    { memberId: "keila", songId: "que-se-abram-os-ceus", rank: 7, key: "E" },
    { memberId: "keila", songId: "teu-toque", rank: 8, key: "C" },
    { memberId: "keila", songId: "altar", rank: 9, key: "C" },
    { memberId: "keila", songId: "oh-quao-lindo-esse-nome-e", rank: 10, key: "C" },

    // FILIPE
    { memberId: "filipe", songId: "em-teu-nome", rank: 1, key: "E" },
    { memberId: "filipe", songId: "poderoso-deus", rank: 2, key: "C" },
    { memberId: "filipe", songId: "veste-de-louvor", rank: 3, key: "C" },
    { memberId: "filipe", songId: "eu-me-rendo", rank: 4, key: "C" },
    { memberId: "filipe", songId: "clamo-jesus", rank: 5, key: "F" },
    { memberId: "filipe", songId: "maravilhosa-graca", rank: 6, key: "G" },
    { memberId: "filipe", songId: "bondade-de-deus", rank: 7, key: "C" },
    { memberId: "filipe", songId: "essa-casa-e-sua-casa", rank: 8, key: "C" },
    { memberId: "filipe", songId: "e-ele", rank: 9, key: "G" },
    { memberId: "filipe", songId: "que-ele-cresca", rank: 10, key: "C" },

    // GIOVANA
    { memberId: "giovana", songId: "tudo-e-perda", rank: 1, key: "E" },
    { memberId: "giovana", songId: "quem-e-esse", rank: 2, key: "F#" },
    { memberId: "giovana", songId: "tao-profundo", rank: 3, key: "E" },
    { memberId: "giovana", songId: "alem-do-impossivel", rank: 4, key: "E" },
    { memberId: "giovana", songId: "a-tua-mesa-cura", rank: 5, key: "Db" },
    { memberId: "giovana", songId: "filho-do-deus-vivo", rank: 6, key: "E" },
    { memberId: "giovana", songId: "sublime", rank: 7, key: "E" },
    { memberId: "giovana", songId: "oh-quao-lindo-esse-nome-e", rank: 8, key: "D" },
    { memberId: "giovana", songId: "mais-do-que-tudo", rank: 9, key: "D" },
    { memberId: "giovana", songId: "teu-toque", rank: 10, key: "Bb" },

    // DAVI
    { memberId: "davi", songId: "so-tu-es-santo", rank: 1, key: "E" },
    { memberId: "davi", songId: "tudo-e-teu", rank: 2, key: "E" },
    { memberId: "davi", songId: "fogo-em-teus-olhos-eu-navegarei", rank: 3, key: "E" },
    { memberId: "davi", songId: "redentor", rank: 4, key: "G" },
    { memberId: "davi", songId: "maranata", rank: 5, key: "G" },
    { memberId: "davi", songId: "sublime", rank: 6, key: "G" },
    { memberId: "davi", songId: "yeshua", rank: 7, key: "G" },
    { memberId: "davi", songId: "senhor-tu-es-bom", rank: 8, key: "E" },
    { memberId: "davi", songId: "me-ama-gratidao", rank: 9, key: "E" },
    { memberId: "davi", songId: "jesus-em-tua-presenca", rank: 10, key: "G" },
  ]
};
