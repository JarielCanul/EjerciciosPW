const radiusInput = document.getElementById("radius");
const btnCalc = document.getElementById("btnCalc");
const btnClear = document.getElementById("btnClear");
const resultValue = document.getElementById("resultValue");
const resultUnit = document.getElementById("resultUnit");
const errorBox = document.getElementById("errorBox");
const badgeText = document.getElementById("badgeText");
const formula = document.getElementById("formula");
const badge = document.getElementById("badge");

function selectedType() {
  const checked = document.querySelector('input[name="calcType"]:checked');
  return checked ? checked.value : "area";
}

function setTypeUI(type) {
  if (type === "circ") {
    badgeText.textContent = "Circunferencia";
    formula.textContent = "C = 2 · π · r";
    badge.querySelector(".dot").style.background = "var(--accent)";
    badge.querySelector(".dot").style.boxShadow = "0 0 0 4px rgba(124, 58, 237, 0.18)";
  } else {
    badgeText.textContent = "Área";
    formula.textContent = "A = π · r²";
    badge.querySelector(".dot").style.background = "var(--accent-2)";
    badge.querySelector(".dot").style.boxShadow = "0 0 0 4px rgba(34, 197, 94, 0.16)";
  }
}

function showError(message) {
  errorBox.hidden = false;
  errorBox.textContent = message;
}

function clearError() {
  errorBox.hidden = true;
  errorBox.textContent = "";
}

function formatNumber(n) {
  return new Intl.NumberFormat("es-MX", { maximumFractionDigits: 6 }).format(n);
}

function calculate() {
  clearError();
  const type = selectedType();
  setTypeUI(type);

  const r = Number(radiusInput.value);
  if (!Number.isFinite(r) || radiusInput.value.trim() === "") {
    showError("Escribe un valor numérico para el radio.");
    resultValue.textContent = "—";
    resultUnit.textContent = "Ingresa un radio válido para calcular.";
    return;
  }
  if (r < 0) {
    showError("El radio no puede ser negativo.");
    resultValue.textContent = "—";
    resultUnit.textContent = "Ingresa un radio válido para calcular.";
    return;
  }

  const value = type === "circ" ? 2 * Math.PI * r : Math.PI * r * r;
  resultValue.textContent = formatNumber(value);
  resultUnit.textContent = type === "circ" ? "Unidades de longitud" : "Unidades cuadradas";
}

function clearAll() {
  radiusInput.value = "";
  clearError();
  setTypeUI(selectedType());
  resultValue.textContent = "—";
  resultUnit.textContent = "Ingresa un radio para calcular.";
  radiusInput.focus();
}

document.querySelectorAll('input[name="calcType"]').forEach((el) => {
  el.addEventListener("change", () => {
    setTypeUI(selectedType());
    clearError();
    if (radiusInput.value.trim() !== "") calculate();
  });
});

btnCalc.addEventListener("click", calculate);
btnClear.addEventListener("click", clearAll);

radiusInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") calculate();
});

setTypeUI(selectedType());
radiusInput.focus();
