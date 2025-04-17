const map = L.map("map").setView([22.9734, 78.6569], 5);

// Water: Blue | Land: White | Only country names shown
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 18,
  }
).addTo(map);

// Only country name labels (no other clutter)
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
  {
    subdomains: "abcd",
    pane: "overlayPane",
    maxZoom: 18,
  }
).addTo(map);

// --- Fixed Colors Like Old Political Map ---
const stateColors = {
  "Andhra Pradesh": "#f94144",
  "Arunachal Pradesh": "#f3722c",
  Assam: "#f9c74f",
  Bihar: "#90be6d",
  Chhattisgarh: "#43aa8b",
  Goa: "#577590",
  Gujarat: "#277da1",
  Haryana: "#4d908e",
  "Himachal Pradesh": "#f9844a",
  Jharkhand: "#ffca3a",
  Karnataka: "#1982c4",
  Kerala: "#8ac926",
  "Madhya Pradesh": "#6a4c93",
  Maharashtra: "#d7263d",
  Manipur: "#03cea4",
  Meghalaya: "#845ec2",
  Mizoram: "#ffc75f",
  Nagaland: "#f9f871",
  Orissa: "#ff5e78",
  Punjab: "#00c9a7",
  Rajasthan: "#bc6ff1",
  Sikkim: "#ff9671",
  "Tamil Nadu": "#c34a36",
  Telangana: "#ffb997",
  Tripura: "#c1fba4",
  "Uttar Pradesh": "#845ec2",
  Uttaranchal: "#2c73d2",
  "West Bengal": "#0081cf",
  Delhi: "#fb743e",
  "Jammu and Kashmir": "#e56b6f",
  Ladakh: "#e0aaff",
  "Andaman and Nicobar Islands": "#6fffe9",
  Chandigarh: "#ffb5a7",
  "Dadra and Nagar Haveli and Daman and Diu": "#ffd6a5",
  Lakshadweep: "#fcd5ce",
  Puducherry: "#ffcad4",
};

// --- Global Variables ---
let geojsonLayer;
const statePopulations = {};
const stateLayers = {};
let allStates = [];

// --- Load GeoJSON Data ---
fetch("data/india_states.geojson")
  .then((res) => res.json())
  .then((data) => {
    geojsonLayer = L.geoJSON(data, {
      style: function (feature) {
        const stateName = feature.properties.NAME_1;
        const color = stateColors[stateName] || "#cccccc";
        return {
          color: "#000000", // deep black border
          weight: 0.7,
          fillColor: color,
          fillOpacity: 0.7,
        };
      },
      onEachFeature: function (feature, layer) {
        const stateName = feature.properties.NAME_1;
        const dummyPopulation = Math.floor(Math.random() * 10000000) + 500000;
        statePopulations[stateName.toLowerCase()] = dummyPopulation;
        allStates.push(stateName);
        stateLayers[stateName.toLowerCase()] = layer;

        layer.bindPopup(`<strong>${stateName}</strong>`);

        layer.on("click", () => {
          updateSidebar(stateName);
        });
      },
    }).addTo(map);

    // Ensure the whole of India fits in view
    map.fitBounds(geojsonLayer.getBounds());

    displaySummary();
  });

// --- Update Sidebar with Info ---
function updateSidebar(stateName) {
  const population = statePopulations[stateName.toLowerCase()] || "Unknown";
  document.getElementById(
    "search-result"
  ).innerHTML = `Selected: <strong class="text-xl text-red-600">${stateName}</strong><br>Population: ${population.toLocaleString()}`;
}

// --- Summary Stats ---
function displaySummary() {
  document.getElementById("total-states").textContent = allStates.length;

  const randomStates = [...allStates]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
  const list = document.getElementById("random-states");
  list.innerHTML = "";
  randomStates.forEach((state) => {
    const li = document.createElement("li");
    li.textContent = `${state} (Pop: ${statePopulations[
      state.toLowerCase()
    ].toLocaleString()})`;
    list.appendChild(li);
  });
}

// --- Search State by Name ---
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();

  if (stateLayers[input]) {
    const layer = stateLayers[input];

    // Reset all styles
    geojsonLayer.eachLayer((l) => {
      const name = l.feature.properties.NAME_1;
      const color = stateColors[name] || "#cccccc";
      l.setStyle({
        fillPattern: null,
        fillColor: color,
        fillOpacity: 0.5,
        color: "#000000",
        weight: 1,
      });
    });

    // Bring to front and apply pattern
    layer.bringToFront();
    layer.setStyle({
      fillColor: "url(#diagonal-stripes)",
      fillOpacity: 1,
      color: "#000000",
      weight: 4,
    });

    // Fit bounds and show popup
    map.fitBounds(layer.getBounds());
    updateSidebar(layer.feature.properties.NAME_1);
    layer.openPopup(); // ✅ This line shows the popup
  } else {
    document.getElementById(
      "search-result"
    ).innerHTML = `<span class="text-red-600">State not found!</span>`;
  }

  document.getElementById("search-input").value = "";
});
