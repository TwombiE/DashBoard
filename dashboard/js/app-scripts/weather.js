const apiKey = "1df051cf5beb413f80c190048250111";

export function loadWeather() {
    const mapDiv = document.getElementById("weather-map");
    if (!mapDiv) return;

    mapDiv.innerHTML = `<p>Lade Wetterdaten...</p>`;

    // Funktion zum Anzeigen der Wetterkarte
    function showWeather(cityName) {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cityName)}&aqi=no`)
            .then(res => res.json())
            .then(data => {
                if (!data || !data.location || !data.current) {
                    mapDiv.innerHTML = `<p>Position nicht erkannt</p>`;
                    return;
                }

                const locName = data.location.name;
                const region = data.location.region;
                const temp = data.current.temp_c;
                const feels = data.current.feelslike_c;
                const condition = data.current.condition.text;
                const icon = "https:" + data.current.condition.icon;
                const humidity = data.current.humidity;
                const wind = data.current.wind_kph;
                const windDir = data.current.wind_dir;

                mapDiv.innerHTML = `
                    <div class="weather-card">
                        <h2 class="weather-location">${locName}, ${region}</h2>
                        <img src="${icon}" alt="${condition}" class="weather-icon"/>
                        <p class="weather-temp">${temp}°C</p>
                        <p class="weather-condition">${condition}</p>
                        <p class="weather-feels">Gefühlt: ${feels}°C</p>
                        <p class="weather-humidity">Luftfeuchtigkeit: ${humidity}%</p>
                        <p class="weather-wind">Wind: ${wind} km/h (${windDir})</p>
                    </div>
                `;
            })
            .catch(err => {
                console.error(err);
                mapDiv.innerHTML = `<p>Position nicht erkannt</p>`;
            });
    }

    // Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const lat = pos.coords.latitude.toFixed(4);
                const lon = pos.coords.longitude.toFixed(4);

                // Zuerst Koordinaten an WeatherAPI, um die Stadt zu bekommen
                fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.location && data.location.name) {
                            const cityName = data.location.name;
                            showWeather(cityName); // Stadtname an API übergeben
                        } else {
                            mapDiv.innerHTML = `<p>Position nicht erkannt</p>`;
                        }
                    })
                    .catch(() => {
                        mapDiv.innerHTML = `<p>Position nicht erkannt</p>`;
                    });
            },
            () => {
                mapDiv.innerHTML = `<p>Position nicht erkannt</p>`;
            }
        );
    } else {
        mapDiv.innerHTML = `<p>Position nicht erkannt</p>`;
    }
}
