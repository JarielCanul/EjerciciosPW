const input = document.getElementById("colorInput");
const applyBtn = document.getElementById("applyBtn");
const currentLabel = document.getElementById("currentLabel");
const errorMsg = document.getElementById("errorMsg");
const root = document.documentElement;

const normalize = (value) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const colorMap = {
  azul: "#2563eb",
  rojo: "#ef4444",
  verde: "#22c55e",
  amarillo: "#f59e0b",
  naranja: "#f97316",
  morado: "#a855f7",
  violeta: "#8b5cf6",
  rosa: "#ec4899",
  negro: "#0b1020",
  blanco: "#f8fafc",
  gris: "#94a3b8",
  celeste: "#38bdf8",
  turquesa: "#14b8a6",
  cafe: "#a16207",
  marron: "#92400e",
  lila: "#c084fc"
};

const isHex = (value) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);

const isCssColor = (value) => {
  const test = new Option().style;
  test.color = value;
  return test.color !== "";
};

const applyTheme = (rawValue) => {
  const n = normalize(rawValue);
  const mapped = colorMap[n];
  const resolved = mapped ?? (isHex(rawValue.trim()) ? rawValue.trim() : null);

  const finalColor = resolved ?? (isCssColor(n) ? n : null);
  if (!finalColor) {
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";
  root.style.setProperty("--theme", finalColor);
  currentLabel.textContent = `Color actual: ${rawValue.trim() || finalColor}`;
};

applyBtn.addEventListener("click", () => applyTheme(input.value));
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") applyTheme(input.value);
});

document.querySelectorAll("[data-color]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-color");
    input.value = value;
    applyTheme(value);
  });
});
