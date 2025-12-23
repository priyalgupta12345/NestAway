document.addEventListener("DOMContentLoaded", () => {
    // Map init (default coordinates)
    const map = L.map('map').setView([28.6139, 77.2090], 13); // Delhi example

    // OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Example marker
    L.marker([28.6139, 77.2090]).addTo(map)
        .bindPopup('<b>Hello Delhi!</b>')
        .openPopup();
});
