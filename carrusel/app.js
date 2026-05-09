const images = [
  "https://picsum.photos/id/1025/1600/900",
  "https://picsum.photos/id/1015/1600/900",
  "https://picsum.photos/id/1003/1600/900",
  "https://picsum.photos/id/1040/1600/900",
  "https://picsum.photos/id/1069/1600/900",
];

let index = 0;

const slide = document.getElementById("slide");
const counter = document.getElementById("counter");
const dots = document.getElementById("dots");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

function clampIndex(nextIndex) {
  const total = images.length;
  return ((nextIndex % total) + total) % total;
}

function render() {
  const total = images.length;
  slide.src = images[index];
  slide.alt = `Imagen ${index + 1} de ${total}`;
  counter.textContent = `Imagen ${index + 1} / ${total}`;

  for (const dot of dots.querySelectorAll("button")) {
    dot.setAttribute("aria-current", dot.dataset.index === String(index));
  }
}

function go(step) {
  index = clampIndex(index + step);
  render();
}

function buildDots() {
  dots.innerHTML = "";
  for (let i = 0; i < images.length; i += 1) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dot";
    btn.dataset.index = String(i);
    btn.setAttribute("aria-label", `Ir a la imagen ${i + 1}`);
    btn.addEventListener("click", () => {
      index = i;
      render();
    });
    dots.appendChild(btn);
  }
}

prev.addEventListener("click", () => go(-1));
next.addEventListener("click", () => go(1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") go(-1);
  if (e.key === "ArrowRight") go(1);
});

buildDots();
render();
