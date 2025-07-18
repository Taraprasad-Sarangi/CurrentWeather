import os
import re

from flask import Flask, request, jsonify, render_template
import requests
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("WEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


@app.route("/")
def index():
    return render_template("weather.html")


@app.route("/weather")
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    if not re.match(r"^[a-zA-Z\s]+$", city):
        return jsonify({"error": "Invalid city format"}), 400

    params = {"q": city, "appid": API_KEY, "units": "metric"}

    try:
        response = requests.get(BASE_URL, params=params)
        data = response.json()

        if response.status_code != 200:
            return jsonify({"error": data.get("message", "Something went wrong")}), 400

        result = {
            "city": data["name"],
            "temperature": f"{data['main']['temp']}°C",
            "feels_like": f"{data['main']['feels_like']}°C",
            "humidity": f"{data['main']['humidity']}%",
            "pressure": f"{data['main']['pressure']} hPa",
            "wind_speed": f"{data['wind']['speed']} m/s",
            "visibility": f"{data.get('visibility', 0) / 1000:.1f} km",
            "condition": data["weather"][0]["description"].capitalize(),
            "sunrise": data["sys"]["sunrise"],
            "date": data["dt"],
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/forecast")
def get_forecast():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    if not re.match(r"^[a-zA-Z\s]+$", city):
        return jsonify({"error": "Invalid city format"}), 400

    url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {"q": city, "appid": API_KEY, "units": "metric"}
    res = requests.get(url, params=params)

    if res.status_code != 200:
        return jsonify({"error": "Failed to get forecast"}), 500

    return jsonify(res.json())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
