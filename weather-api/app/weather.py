from flask import Flask, request, jsonify, render_template
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')

API_KEY = os.getenv("WEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.route('/')
def index():
    return render_template('weather.html')

@app.route('/weather')
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City parameter is required'}), 400

    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric'
    }

    try:
        response = requests.get(BASE_URL, params=params)
        data = response.json()

        if response.status_code != 200:
            return jsonify({'error': data.get('message', 'Something went wrong')}), 400

        result = {
            'city': data['name'],
            'temperature': f"{data['main']['temp']}°C",
            'humidity': f"{data['main']['humidity']}%",
            'condition': data['weather'][0]['description'].capitalize()
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
