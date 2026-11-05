// Aba Design: cards de imagens, lightbox e vídeos (motions) em colunas.

const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.innerHTML = "<img alt=''>";
document.body.appendChild(lightbox);

function openLightbox(src) {
  lightbox.firstChild.src = src;
  lightbox.style.display = "flex";
}
function closeLightbox() {
  lightbox.style.display = "none";
}
lightbox.onclick = closeLightbox;
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

function bilingualTitle(item) {
  if (!item.titleEn) return escapeHtml(item.title);
  return `<span class="pt">${escapeHtml(item.title)}</span><span class="en">${escapeHtml(item.titleEn)}</span>`;
}

function renderImageCards(items, container) {
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "box design-card";
    card.innerHTML = `
      <h3>${bilingualTitle(item)}</h3>
      <div class="thumb"><img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy"></div>`;
    card.querySelector(".thumb").onclick = () => openLightbox(item.image);
    container.appendChild(card);
  });
}

renderImageCards(GENERAL_DESIGNS, document.getElementById("general-designs"));
renderImageCards(UNIFORMS, document.getElementById("uniforms"));

/* ---------- Motions ---------- */

const motionsEl = document.getElementById("motions");
const motionCards = MOTIONS.map(renderMotionCard);

function renderMotionCard(motion) {
  const card = document.createElement("div");
  card.className = "box design-card";
  card.innerHTML = `
    <h3>${bilingualTitle(motion)}</h3>
    <div class="thumb video-thumb" style="padding-bottom:${motion.ratio}%">
      <img src="${motion.poster}" alt="${escapeHtml(motion.title)}" loading="lazy">
      <span class="play-badge">&#9654;</span>
    </div>`;

  const thumb = card.querySelector(".thumb");
  thumb.onclick = () => {
    if (thumb.querySelector("video")) return;
    document.querySelectorAll("#motions video").forEach((v) => v.pause());

    const video = document.createElement("video");
    video.src = motion.video;
    video.poster = motion.poster;
    video.controls = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.onplay = () => audio.pause();

    thumb.innerHTML = "";
    thumb.appendChild(video);
    const promise = video.play();
    if (promise && promise.catch) promise.catch(() => {});
  };
  return card;
}

/* Distribui os cards em colunas de largura mínima 280px, equilibrando as alturas. */
const COLUMN_GAP = 12;
const COLUMN_MIN_WIDTH = 280;
let lastColumnCount = 0;

function layoutMotions() {
  const width = motionsEl.clientWidth;
  if (!width || !motionCards.length) return;

  const columnCount = Math.max(1, Math.floor((width + COLUMN_GAP) / (COLUMN_MIN_WIDTH + COLUMN_GAP)));
  if (columnCount === lastColumnCount) return;
  lastColumnCount = columnCount;

  motionsEl.innerHTML = "";
  const columns = [];
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement("div");
    column.className = "masonry-col";
    motionsEl.appendChild(column);
    columns.push(column);
  }

  // Mede as alturas com todos os cards na primeira coluna (mesma largura final).
  motionCards.forEach((card) => columns[0].appendChild(card));
  const heights = motionCards.map((card) => card.offsetHeight);

  let assignment;
  if (columnCount === 2 && heights.length <= 15) assignment = balanceTwoColumns(heights);
  else if (columnCount > 1) assignment = fillShortestColumn(heights, columnCount);
  else assignment = heights.map(() => 0);

  motionCards.forEach((card, i) => columns[assignment[i]].appendChild(card));
}

// Testa todas as divisões possíveis; prefere colunas de mesma altura sem embaralhar muito a ordem.
function balanceTwoColumns(heights) {
  const n = heights.length;
  let bestCost = Infinity;
  let bestMask = 0;

  for (let mask = 0; mask < 1 << (n - 1); mask++) {
    const totals = [0, 0];
    const items = [];
    for (let i = 0; i < n; i++) {
      const column = i ? (mask >> (i - 1)) & 1 : 0;
      items.push({ index: i, column, top: totals[column] });
      totals[column] += heights[i] + COLUMN_GAP;
    }

    const difference = Math.abs(totals[0] - totals[1]);
    if (difference >= bestCost) continue;

    items.sort((a, b) => a.top - b.top || a.column - b.column);
    let inversions = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (items[i].index > items[j].index) inversions++;
      }
    }

    const cost = difference + 10 * inversions;
    if (cost < bestCost) {
      bestCost = cost;
      bestMask = mask;
    }
  }

  return heights.map((_, i) => (i ? (bestMask >> (i - 1)) & 1 : 0));
}

function fillShortestColumn(heights, columnCount) {
  const totals = new Array(columnCount).fill(0);
  return heights.map((height) => {
    let shortest = 0;
    for (let j = 1; j < columnCount; j++) {
      if (totals[j] < totals[shortest]) shortest = j;
    }
    totals[shortest] += height + COLUMN_GAP;
    return shortest;
  });
}
