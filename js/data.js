// Para adicionar um álbum, copie um objeto de ALBUMS e ajuste os campos.
// "commissioned: true" troca o rótulo para "Composições Originais sob Encomenda".
const ALBUMS = [
  {
    title: "Feixes & Brilhos",
    year: "2021-2024",
    artist: "Zeus Fontes",
    link: "https://onerpm.link/129207027521",
    cover: "assets/img/covers/feixes-e-brilhos.jpg",
    tracks: [
      { name: "do not wait", file: "assets/audio/feixes-e-brilhos/01-do-not-wait.mp3" },
      { name: "fridayNight", file: "assets/audio/feixes-e-brilhos/02-fridaynight.mp3" },
      { name: "super duper nova", file: "assets/audio/feixes-e-brilhos/03-super-duper-nova.mp3" },
      { name: "maisQueImperfeito", file: "assets/audio/feixes-e-brilhos/04-maisqueimperfeito.mp3" },
      { name: "await", file: "assets/audio/feixes-e-brilhos/05-await.mp3" },
      { name: "Peixes e Delírios", file: "assets/audio/feixes-e-brilhos/06-peixes-e-delirios.mp3" },
      { name: "21-24", file: "assets/audio/feixes-e-brilhos/07-21-24.mp3" },
    ],
  },
  {
    title: "Broken",
    year: "2021",
    artist: "Zeus Fontes",
    link: "https://onerpm.link/8182470712",
    cover: "assets/img/covers/broken.jpg",
    tracks: [
      { name: "Eyes", file: "assets/audio/broken/01-eyes.mp3" },
      { name: "Burn", file: "assets/audio/broken/02-burn.mp3" },
      { name: "Red", file: "assets/audio/broken/03-red.mp3" },
      { name: "002", file: "assets/audio/broken/04-002.mp3" },
      { name: "Moonlight", file: "assets/audio/broken/05-moonlight.mp3" },
      { name: "Drowning", file: "assets/audio/broken/06-drowning.mp3" },
      { name: "Now Whatever", file: "assets/audio/broken/07-now-whatever.mp3" },
      { name: "Broken", file: "assets/audio/broken/08-broken.mp3" },
    ],
  },
  {
    title: "Vendetta Veil Studios — Coletânea",
    year: "2022",
    artist: "Zeus Fontes",
    commissioned: true,
    cover: "assets/img/covers/vendetta-veil-studios.jpg",
    tracks: [
      { name: "Salvador Theme 1", file: "assets/audio/vendetta-veil-studios/01-salvador-theme-1.mp3" },
      { name: "Salvador Theme 2", file: "assets/audio/vendetta-veil-studios/02-salvador-theme-2.mp3" },
      { name: "Skarlax Theme", file: "assets/audio/vendetta-veil-studios/03-skarlax-theme.mp3" },
      { name: "Maraton Theme", file: "assets/audio/vendetta-veil-studios/04-maraton-theme.mp3" },
      { name: "Intocavel Theme", file: "assets/audio/vendetta-veil-studios/05-intocavel-theme.mp3" },
      { name: "Trailer OST", file: "assets/audio/vendetta-veil-studios/06-trailer-ost.mp3" },
    ],
  },
  {
    title: "Morto Chapter 2 — Bastos Studios",
    year: "2022",
    artist: "Zeus Fontes",
    commissioned: true,
    cover: "assets/img/covers/morto-chapter-2.jpg",
    tracks: [
      { name: "Nosso bebê", file: "assets/audio/morto-chapter-2/01-nosso-bebe.mp3" },
    ],
  },
];

// Designs gerais (logos, identidades). Inglês é opcional.
const GENERAL_DESIGNS = [
  { title: "Tatiana Nóbrega · Advogada Criminal", titleEn: "Tatiana Nóbrega · Criminal Lawyer", image: "assets/img/designs/general/tatiana-nobrega-advogada-criminal.webp" },
  { title: "Bella Persona · Ateliê / Brechó", titleEn: "Bella Persona · Atelier / Thrift store", image: "assets/img/designs/general/bella-persona-atelie-brecho.webp" },
  { title: "Dani Boy · Logo antiga (antes)", titleEn: "Dani Boy · Old logo (before)", image: "assets/img/designs/general/dani-boy-logo-antiga-antes.webp" },
  { title: "Dani Boy Streams · Logo nova (depois)", titleEn: "Dani Boy Streams · New logo (after)", image: "assets/img/designs/general/dani-boy-streams-logo-nova-depois.webp" },
  { title: "Penance Studios · Logo", titleEn: "Penance Studios · Logo", image: "assets/img/designs/general/penance-studios-logo.webp" },
  { title: "Vanguard Security", titleEn: "Vanguard Security", image: "assets/img/designs/general/vanguard-security.webp" },
];

// Fardamentos.
const UNIFORMS = [
  { title: "Maria Xique Xique · Avental", titleEn: "Maria Xique Xique · Apron", image: "assets/img/designs/uniforms/maria-xique-xique-avental.webp" },
  { title: "Maria Xique Xique · Limpeza", titleEn: "Maria Xique Xique · Cleaning", image: "assets/img/designs/uniforms/maria-xique-xique-limpeza.webp" },
  { title: "Maria Xique Xique · Cozinha", titleEn: "Maria Xique Xique · Kitchen", image: "assets/img/designs/uniforms/maria-xique-xique-cozinha.webp" },
  { title: "Maria Xique Xique · Touca", titleEn: "Maria Xique Xique · Cap", image: "assets/img/designs/uniforms/maria-xique-xique-touca.webp" },
  { title: "Maria Xique Xique · Polo", image: "assets/img/designs/uniforms/maria-xique-xique-polo.webp" },
  { title: "Açaiteria Jampa · Atendimento", titleEn: "Açaiteria Jampa · Service", image: "assets/img/designs/uniforms/acaiteria-jampa-atendimento.webp" },
  { title: "Açaiteria Jampa · Polo clara", titleEn: "Açaiteria Jampa · Light polo", image: "assets/img/designs/uniforms/acaiteria-jampa-polo-clara.webp" },
  { title: "Açaiteria Jampa · Polo preta", titleEn: "Açaiteria Jampa · Black polo", image: "assets/img/designs/uniforms/acaiteria-jampa-polo-preta.webp" },
  { title: "Escola Degraus · Camiseta", titleEn: "Escola Degraus · T-shirt", image: "assets/img/designs/uniforms/escola-degraus-camiseta.webp" },
  { title: "Escola Degraus · Moletom", titleEn: "Escola Degraus · Hoodie", image: "assets/img/designs/uniforms/escola-degraus-moletom.webp" },
  { title: "Escola Degraus · Saia", titleEn: "Escola Degraus · Skirt", image: "assets/img/designs/uniforms/escola-degraus-saia.webp" },
  { title: "Escola Degraus · Short", titleEn: "Escola Degraus · Shorts", image: "assets/img/designs/uniforms/escola-degraus-short.webp" },
  { title: "Colégio Intensivo · Preta", titleEn: "Colégio Intensivo · Black", image: "assets/img/designs/uniforms/colegio-intensivo-preta.webp" },
  { title: "Colégio Intensivo · Caprichoso", image: "assets/img/designs/uniforms/colegio-intensivo-caprichoso.webp" },
  { title: "Colégio Intensivo · Garantido", image: "assets/img/designs/uniforms/colegio-intensivo-garantido.webp" },
  { title: "Colégio Intensivo · Maratona", titleEn: "Colégio Intensivo · Marathon", image: "assets/img/designs/uniforms/colegio-intensivo-maratona.webp" },
  { title: "Seminário de Residências · Organização", titleEn: "Residency Seminar · Staff", image: "assets/img/designs/uniforms/seminario-de-residencias-organizacao.webp" },
  { title: "Escola Sempre Viva · Maiô", titleEn: "Escola Sempre Viva · Swimsuit", image: "assets/img/designs/uniforms/escola-sempre-viva-maio.webp" },
  { title: "E.M Pescados · Manga longa", titleEn: "E.M Pescados · Long sleeve", image: "assets/img/designs/uniforms/e-m-pescados-manga-longa.webp" },
  { title: "Escola Crescer", image: "assets/img/designs/uniforms/escola-crescer.webp" },
  { title: "Camisa da Seleção", titleEn: "National team shirt", image: "assets/img/designs/uniforms/camisa-da-selecao.webp" },
  { title: "Escola Cecília Meireles · Educador", titleEn: "Escola Cecília Meireles · Educator", image: "assets/img/designs/uniforms/escola-cecilia-meireles-educador.webp" },
  { title: "Nova Geração", image: "assets/img/designs/uniforms/nova-geracao.webp" },
  { title: "PharmaHelp · Polo", image: "assets/img/designs/uniforms/pharmahelp-polo.webp" },
  { title: "Jampa Paddle · Manga longa", titleEn: "Jampa Paddle · Long sleeve", image: "assets/img/designs/uniforms/jampa-paddle-manga-longa.webp" },
  { title: "Colégio Top · Terceirão", image: "assets/img/designs/uniforms/colegio-top-terceirao.webp" },
  { title: "Condomínio Cabo Branco · Camisa social", titleEn: "Condomínio Cabo Branco · Dress shirt", image: "assets/img/designs/uniforms/condominio-cabo-branco-camisa-social.webp" },
  { title: "Condomínio Cabo Branco · Polo", titleEn: "Condomínio Cabo Branco · Polo", image: "assets/img/designs/uniforms/condominio-cabo-branco-polo.webp" },
  { title: "Condomínio Cabo Branco · Polo manga longa", titleEn: "Condomínio Cabo Branco · Long sleeve polo", image: "assets/img/designs/uniforms/condominio-cabo-branco-polo-manga-longa.webp" },
  { title: "Condomínio Cabo Branco · Camisa social preta", titleEn: "Condomínio Cabo Branco · Black dress shirt", image: "assets/img/designs/uniforms/condominio-cabo-branco-camisa-social-preta.webp" },
  { title: "Condomínio Cabo Branco · Camiseta manga longa", titleEn: "Condomínio Cabo Branco · Long sleeve tee", image: "assets/img/designs/uniforms/condominio-cabo-branco-camiseta-manga-longa.webp" },
  { title: "Condomínio Cabo Branco · Camiseta", titleEn: "Condomínio Cabo Branco · T-shirt", image: "assets/img/designs/uniforms/condominio-cabo-branco-camiseta.webp" },
  { title: "CA+ · Moletom", titleEn: "CA+ · Hoodie", image: "assets/img/designs/uniforms/camais-moletom.webp" },
];

// ratio = altura / largura do vídeo, em % (define a proporção da miniatura)
const MOTIONS = [
  { title: "Morangorila · Liquidificador", titleEn: "Morangorila · Blender", ratio: 177.78, poster: "assets/img/motions/morangorila-liquidificador.jpg", video: "assets/video/morangorila-liquidificador.mp4" },
  { title: "Morangorila · Vaca", titleEn: "Morangorila · Cow", ratio: 177.78, poster: "assets/img/motions/morangorila-vaca.jpg", video: "assets/video/morangorila-vaca.mp4" },
  { title: "Morangorila · WALL-E", titleEn: "Morangorila · WALL-E", ratio: 100, poster: "assets/img/motions/morangorila-wall-e.jpg", video: "assets/video/morangorila-wall-e.mp4" },
  { title: "Dani Boy · Intro", titleEn: "Dani Boy · Intro", ratio: 56.25, poster: "assets/img/motions/dani-boy-intro.jpg", video: "assets/video/dani-boy-intro.mp4" },
  { title: "Awards", titleEn: "Awards", ratio: 56.25, poster: "assets/img/motions/awards.jpg", video: "assets/video/awards.mp4" },
  { title: "Godzilla · Cena 3D", titleEn: "Godzilla · 3D scene", ratio: 56.25, poster: "assets/img/motions/godzilla-cena-3d.jpg", video: "assets/video/godzilla-cena-3d.mp4" },
  { title: "Jet Jaguar · Edit", titleEn: "Jet Jaguar · Edit", ratio: 56.25, poster: "assets/img/motions/jet-jaguar-edit.jpg", video: "assets/video/jet-jaguar-edit.mp4" },
];
