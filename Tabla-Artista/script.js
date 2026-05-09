function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateArtistsData() {
  const artists = [
    "Shakira",
    "Bad Bunny",
    "Rosalía",
    "Taylor Swift",
    "The Weeknd",
    "Adele",
    "Dua Lipa",
    "Karol G",
    "Coldplay",
    "Beyoncé",
  ];

  return artists.map((name) => ({
    name,
    albums: randomInt(1, 18),
    grammys: randomInt(0, 16),
    year: randomInt(1990, new Date().getFullYear()),
  }));
}

function renderTable(rows) {
  const tbody = document.getElementById("artists-body");
  tbody.textContent = "";

  for (const row of rows) {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = row.name;
    tr.appendChild(tdName);

    const tdAlbums = document.createElement("td");
    tdAlbums.className = "num";
    tdAlbums.textContent = row.albums;
    tr.appendChild(tdAlbums);

    const tdGrammys = document.createElement("td");
    tdGrammys.className = "num";
    tdGrammys.textContent = row.grammys;
    tr.appendChild(tdGrammys);

    const tdYear = document.createElement("td");
    tdYear.className = "num";
    tdYear.textContent = row.year;
    tr.appendChild(tdYear);

    tbody.appendChild(tr);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const data = generateArtistsData();
  renderTable(data);

  const stamp = new Date().toLocaleString("es-ES", { hour12: false });
  const generatedAt = document.getElementById("generated-at");
  generatedAt.textContent = `Generado: ${stamp}`;
});
