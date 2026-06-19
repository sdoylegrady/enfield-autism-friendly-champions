const map = L.map("map").setView([53.4142, -6.8326], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let markers = [];

function render(filter = "all") {
  const visible = champions.filter((c) => filter === "all" || c.status === filter);

  markers.forEach((m) => map.removeLayer(m));
  markers = [];

  visible.forEach((champion) => {
    const marker = L.marker([champion.lat, champion.lng]).addTo(map);
    marker.bindPopup(`
      <strong>${champion.name}</strong><br>
      ${champion.category}<br>
      <em>${champion.status}</em>
    `);
    markers.push(marker);
  });

  const cards = document.getElementById("cards");
  cards.innerHTML = "";

  visible.forEach((champion) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <span class="badge">${champion.status}</span>
      <h3>${champion.name}</h3>
      <p><strong>${champion.category}</strong><br>${champion.address}</p>
      <p>${champion.description}</p>
      <ul>${champion.supports.map((support) => `<li>${support}</li>`).join("")}</ul>
      ${champion.website ? `<a href="${champion.website}">Visit website</a>` : ""}
    `;
    cards.appendChild(card);
  });
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    render(button.dataset.filter);
  });
});

render();
