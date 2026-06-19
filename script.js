const cards = document.getElementById("cards");

champions.forEach((champion) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    ${champion.image ? `<img class="champion-image" src="${champion.image}" alt="${champion.name}">` : ""}
    <span class="badge">${champion.status}</span>
    <h3>${champion.name}</h3>
    <p><strong>${champion.category}</strong><br>${champion.address}</p>
    <p>${champion.description}</p>
    <ul>${champion.supports.map((support) => `<li>${support}</li>`).join("")}</ul>
  `;
  cards.appendChild(card);
});

const validChampions = champions.filter((champion) =>
  typeof champion.lat === "number" &&
  typeof champion.lng === "number"
);

const map = L.map("map").setView([53.4142, -6.8326], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

validChampions.forEach((champion) => {
  L.marker([champion.lat, champion.lng])
    .addTo(map)
    .bindPopup(`<strong>${champion.name}</strong><br>${champion.status}`);
});

setTimeout(() => {
  map.invalidateSize();
}, 500);
