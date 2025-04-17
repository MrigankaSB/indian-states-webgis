# 🌍 Indian States WebGIS Dashboard

An interactive WebGIS dashboard built using **Leaflet.js** that visualizes Indian states on a responsive map. This project was developed as part of the Technical Assignment for the **WebGIS Developer Internship** at **TerrAqua UAV Solutions Pvt Ltd**.

---

## 🚀 Overview

This application allows users to:

- View Indian state boundaries on an interactive map.
- Click on a state to view its name.
- Search for a state by name and highlight it.
- Display sidebar statistics: total states, list of random 5 states and dummy populations of every state.
- Access a clean and responsive interface across all devices.

---

## 🛠️ Tools & Libraries Used

| Tool / Library                                                                       | Purpose                          |
| ------------------------------------------------------------------------------------ | -------------------------------- |
| [Leaflet.js](https://leafletjs.com/)                                                 | Interactive web map rendering    |
| [OpenStreetMap](https://www.openstreetmap.org/)                                      | Basemap tiles                    |
| [Tailwind CSS](https://tailwindcss.com/)                                             | Responsive design and styling    |
| HTML, CSS, JavaScript                                                                | Web development foundation       |
| [India States GeoJSON](https://github.com/Subhash9325/GeoJson-Data-of-Indian-States) | Vector data of Indian boundaries |

---

## ✨ Features

- 🗺️ **Leaflet Map:** Displays Indian states with OpenStreetMap basemap.
- 🔍 **Search Functionality:** Enter a state name → Zoom to it → Highlight in red.
- 💬 **Popup on Click:** Shows state name when clicked.
- 📊 **Sidebar:**
  - Total number of states
  - 5 random states with population
  - Selected state info on search the state by name or on clicking on the state on the map
- 📱 **Responsive UI:** Designed to work well across phones, tablets, and desktops.

---

## 🚀 Steps to Run the Project

1. **Download or Clone this Repository:**

   ```bash
   git clone https://github.com/MrigankaSB/indian-states-webgis
   cd indian-states-webgis
   ```

2. Run a local server (You can use VS Code Live Server or Python SimpleHTTPServer). Or, just open `index.html` in your browser.

---

## 🧠 A Short Summary of My Approach

The primary goal of this project was to build a lightweight WebGIS application using only frontend tools like Leaflet.js, Tailwind CSS, and vanilla JavaScript — without any backend or complex server-side infrastructure. Here's how I approached it:

### 1. **Setting Up the Map**

- I initialized a Leaflet.js map, centered over the Indian subcontinent using the `setView()` method.
- OpenStreetMap tiles were used to provide a clean, open-source basemap.
- The zoom level was adjusted to properly display the entire country with good detail.

### 2. **Loading GeoJSON Data**

- I downloaded a GeoJSON file that contains the boundaries of all Indian states.
- This data was added to the Leaflet map using `L.geoJSON()`, which renders the polygons on top of the base map.
- Each state was styled dynamically by assigning:
  - A **Deep Black Border** (`color: '#000000'`) to clearly separate them
  - A **Unique Colors for States** as the fill for visual differentiation

### 3. **Custom Popups for States**

- On clicking any state polygon, a popup shows up with just the **Name of the State**.
- No extra data was shown in the popup to keep the map clean and focused.

### 4. **Dummy Population Generation**

- Since real population data wasn't required, I generated **dummy population values** randomly for each state.
- This was done in JavaScript after parsing the GeoJSON, and then linked to each state by its name.

### 5. **Sidebar Development**

- A responsive sidebar was created using **Tailwind CSS** for layout and styling.
- It includes:
  - Total number of states
  - A list of 5 randomly selected state names
  - Their corresponding dummy population values
- The layout was designed using Flexbox (`flex`, `flex-col`) and responsive utility classes (`md:`, `lg:`) for proper behavior across devices.

### 6. **Search Functionality with Pattern Highlighting**

- A search bar was created to let users type a state name.
- On clicking the "Search" button:
  - The corresponding state polygon is searched from the GeoJSON layer.
  - A custom **SVG pattern** is applied as the fill to visually highlight the state.
  - The map zooms into the selected state using `fitBounds()`.
  - The sidebar updates to show the name and population of the found state.

### 7. **SVG Pattern for Highlighting**

- I defined a unique `<pattern>` inside an inline `<svg>` tag within the HTML.
- This pattern consists of red stripes and is used as a `fill` for the selected state's polygon.
- It enhances the visibility of the searched state on the map while blending naturally with the UI.

### 8. **Responsiveness & Clean Layout**

- Tailwind CSS was used throughout the project to ensure:
  - Consistent spacing and typography
  - Mobile-first responsiveness
  - A visually clean and modern UI layout
- The map and sidebar work seamlessly on desktops, tablets, and mobile phones.

---

## 📚 What I Learned

- Setting up and styling a basic **WebGIS dashboard** using **Leaflet.js**
- Parsing and visualizing **GeoJSON** data
- Creating **responsive layouts** with **Tailwind CSS**
- Designing and using **SVG patterns** for map layer highlighting
- Using **DOM Manipulation** to update sidebar content dynamically
- Structuring a small **JavaScript project** for clean separation of logic and UI
