const apiKey = "1df051cf5beb413f80c190048250111";

export function loadWeather(cityName = "Krefeld") {
    const mapDiv = document.getElementById("weather-map");
    if (!mapDiv) return;

    mapDiv.innerHTML = `<p>Lade Wetterdaten...</p>`;

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
                    <p class="weather-condition">${condition}</p>
                    <div class="weather-stats">
                        <div class="weather-item">
                            <ion-icon name="thermometer-outline"></ion-icon>
                            <p>${temp}°C</p>
                        </div>
                        <div class="weather-item">
                            <ion-icon name="umbrella-outline"></ion-icon>
                            <p>${humidity}%</p>
                        </div>
                        <div class="weather-item">
                            <ion-icon name="paper-plane-outline"></ion-icon>
                            <p>${wind} km/h ${windDir}</p>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.error(err);
            mapDiv.innerHTML = `<p>Position nicht erkannt</p>`;
        });
}
