// Navegação por abas, idioma e efeitos visuais.

const SITE_URL = "https://zeusfontes.github.io/portfolio/";
const DEFAULT_PANEL = "programacao";

/* ---------- Abas (#hash) ---------- */

function showPanelFromHash() {
  let id = (location.hash || "#" + DEFAULT_PANEL).slice(1);
  if (!document.getElementById(id)) id = DEFAULT_PANEL;

  document.getElementById("address-url").textContent = SITE_URL + "#" + id;
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("on", panel.id === id);
  });
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("on", tab.getAttribute("href") === "#" + id);
  });
}

function onRouteChange() {
  showPanelFromHash();
  layoutMotions();
}

window.addEventListener("hashchange", onRouteChange);
window.addEventListener("load", layoutMotions);
window.addEventListener("resize", layoutMotions);
onRouteChange();

/* ---------- Idioma (PT / EN) ---------- */

document.getElementById("lang-toggle").onclick = () => {
  document.body.classList.toggle("en");
  try {
    localStorage.setItem("lang", document.body.classList.contains("en") ? "en" : "pt");
  } catch (e) {}
};

try {
  const saved = localStorage.getItem("lang");
  const useEnglish = saved ? saved === "en" : !/^pt/i.test(navigator.language);
  if (useEnglish) document.body.classList.add("en");
} catch (e) {}

/* ---------- Chuva de código (fundo) ---------- */

function startCodeRain(canvas, color, fontSize) {
  const ctx = canvas.getContext("2d");
  const glyphs = "ｱｲｳｴｵｶｷｸｹｺ0123456789ﾊﾐﾋﾓ";
  let drops = [];

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    drops = [];
    for (let i = 0; i < Math.ceil(canvas.width / fontSize); i++) drops.push(Math.random() * -40);
  }
  resize();
  addEventListener("resize", resize);

  setInterval(() => {
    ctx.fillStyle = "rgba(0,0,0,.09)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.font = fontSize + "px monospace";
    drops.forEach((row, column) => {
      ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], column * fontSize, row * fontSize);
      const offScreen = row * fontSize > canvas.height;
      drops[column] = offScreen && Math.random() > 0.97 ? 0 : row + 1;
    });
  }, 70);
}

startCodeRain(document.getElementById("rain"), "#2fbf48", 16);

/* ---------- Rastro do mouse ---------- */

let lastSparkle = 0;
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastSparkle < 70) return;
  lastSparkle = now;

  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = ["0", "1", "ｱ", "ﾊ"][Math.floor(Math.random() * 4)];
  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});
