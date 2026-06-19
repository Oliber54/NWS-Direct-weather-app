from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

HEADERS = {
    "User-Agent": "NWS-Direct-Weather-App ("sunshineisacoolguy@outlook.com")
}

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/weather")
def weather():
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    point_url = f"https://api.weather.gov/points/{lat},{lon}"
    point = requests.get(point_url, headers=HEADERS).json()

    forecast_url = point["properties"]["forecast"]
    hourly_url = point["properties"]["forecastHourly"]

    forecast = requests.get(forecast_url, headers=HEADERS).json()
    hourly = requests.get(hourly_url, headers=HEADERS).json()

    return jsonify({
        "forecast": forecast,
        "hourly": hourly
    })


if __name__ == "__main__":
    app.run(
    host="0.0.0.0",
    port=5000,
    ssl_context=("cert.pem", "key.pem")
    )
