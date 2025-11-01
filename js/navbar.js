import { sections } from './apps.js';
import { loadWeather } from './app-scripts/weather.js'; // Weather-Funktion importieren

const list = document.querySelectorAll('.list');
const app = document.getElementById('app');

// Standardinhalt
app.innerHTML = sections.weather;
loadWeather(); // direkt beim Laden die Weather-Sektion initialisieren

function activeLink(e) {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    // Aktiven Link setzen
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');

    // Index des geklickten Items
    const index = Array.from(list).indexOf(this);

    // Content wechseln
    switch(index) {
        case 0: 
            app.innerHTML = sections.weather; 
            loadWeather(); // Weather laden, nachdem HTML gesetzt wurde
            break;
        case 1: app.innerHTML = sections.calendar; break;
        case 2: app.innerHTML = sections.focusfabric; break;
        case 3: app.innerHTML = sections.qr; break;
        case 4: app.innerHTML = sections.settings; break;
    }
}

// EventListener
list.forEach((item) => item.addEventListener('click', activeLink));
