const cards = document.getElementById("cards");

function makeId(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

champions.forEach(function (champion) {
  const cardId = makeId(champion.name);

  const card = document.createElement("article");
  card.className = "card";
  card.id = cardId;

  card.innerHTML =
    (champion.image ? '<img class="champion-image" src="' + champion.image + '" alt="' + champion.name + '">' : "") +
    '<span class="badge">' + champion.status + '</span>' +
    '<h3>' + champion.name + '</h3>' +
    '<p><strong>' + champion.category + '</strong><br>' + champion.address + '</p>' +
    '<p>' + champion.description + '</p>' +
    '<ul>' + champion.supports.map(function (support) {
      return '<li>' + support + '</li>';
    }).join("") + '</ul>';

  cards.appendChild(card);
});

const map = L.map("map").setView([53.4142, -6.8326], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

champions.forEach(function (champion) {
  const cardId = makeId(champion.name);

  L.marker([champion.lat, champion.lng])
    .addTo(map)
    .bindPopup(
      "<strong>" + champion.name + "</strong><br>" +
      champion.category + "<br>" +
      '<a href="#' + cardId + '">View champion details</a>'
    );
});
