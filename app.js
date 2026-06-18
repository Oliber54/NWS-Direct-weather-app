document.getElementById("current").innerHTML = "Getting location...";

async function loadWeather() {
    try {
        navigator.geolocation.getCurrentPosition(async (pos) => {

            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
            const data = await res.json();

            const forecast = data.forecast.properties.periods;
            const hourly = data.hourly.properties.periods;

            document.getElementById("current").innerHTML =
    `<h3>${forecast[0].name}</h3>
     <p><b>${forecast[0].temperature}°F</b></p>
     <p>
${forecast[0].shortForecast.includes("Sunny") ? "☀️" :
  forecast[0].shortForecast.includes("Cloud") ? "☁️" :
  forecast[0].shortForecast.includes("Rain") ? "🌧️" :
  forecast[0].shortForecast.includes("Snow") ? "❄️" :
  "🌤️"}
${forecast[0].shortForecast}
</p>
     <p>Wind: ${forecast[0].windSpeed} ${forecast[0].windDirection}</p>`;
            document.getElementById("hourly").innerHTML =
                hourly.slice(0, 8).map(h =>
                    `<div>${h.startTime.slice(11,16)} - ${h.temperature}°F</div>`
                ).join("");

            document.getElementById("daily").innerHTML =
                forecast.slice(0, 7).map(d =>
                    `<div><b>${d.name}</b> ${d.temperature}°F - ${d.shortForecast}</div>`
                ).join("");

        }, () => {
            document.getElementById("current").innerHTML =
                "Location blocked. Enable GPS permission.";
        });

    } catch (err) {
        document.getElementById("current").innerHTML =
            "Error loading weather data.";
        console.log(err);
