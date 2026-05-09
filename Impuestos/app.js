const form = document.getElementById("calcForm");
const principalInput = document.getElementById("principal");
const errEl = document.getElementById("err");

const out15 = document.getElementById("out15");
const out135 = document.getElementById("out135");
const out9 = document.getElementById("out9");

const gain15 = document.getElementById("gain15");
const gain135 = document.getElementById("gain135");
const gain9 = document.getElementById("gain9");

const bar15 = document.getElementById("bar15");
const bar135 = document.getElementById("bar135");
const bar9 = document.getElementById("bar9");

const numberFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function money(value) {
  return `$${numberFormat.format(value)}`;
}

function parseAmount(raw) {
  const cleaned = String(raw ?? "")
    .trim()
    .replaceAll(",", "")
    .replaceAll(" ", "");

  if (cleaned.length === 0) return null;
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return null;

  const value = Number(cleaned);
  if (!Number.isFinite(value)) return null;
  if (value <= 0) return null;

  return value;
}

function compoundMonthly(principal, annualRate) {
  const monthlyRate = annualRate / 12;
  const months = 12;
  return principal * Math.pow(1 + monthlyRate, months);
}

function setError(message) {
  errEl.textContent = message ?? "";
  principalInput.setAttribute("aria-invalid", message ? "true" : "false");
}

function render(principal) {
  const entries = [
    { rate: 0.15, out: out15, gain: gain15, bar: bar15 },
    { rate: 0.135, out: out135, gain: gain135, bar: bar135 },
    { rate: 0.09, out: out9, gain: gain9, bar: bar9 },
  ].map((entry) => {
    const total = compoundMonthly(principal, entry.rate);
    const profit = total - principal;
    entry.out.textContent = money(total);
    entry.gain.textContent = `Ganancia: ${money(profit)}`;
    return { ...entry, total };
  });

  const maxTotal = Math.max(...entries.map((e) => e.total));
  for (const { total, bar } of entries) {
    if (!bar) continue;
    const pct = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
    bar.style.width = `${Math.max(2, Math.min(100, pct))}%`;
  }

  return entries.map((e) => e.total);
}

principalInput.addEventListener("input", () => {
  if (errEl.textContent) setError("");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const principal = parseAmount(principalInput.value);
  if (principal == null) {
    setError("Ingresa una cantidad válida mayor a 0 (ej. 25000 o 25000.50).");
    return;
  }

  setError("");
  render(principal);
});
