import sys
import os
import unittest
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from weather import app


class WeatherAppTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_valid_city_weather(self):
        res = self.client.get('/weather?city=London')
        self.assertEqual(res.status_code, 200)
        self.assertIn('temperature', res.get_json())

    def test_invalid_city_weather(self):
        res = self.client.get('/weather?city=aslkdjalskdj')
        self.assertNotEqual(res.status_code, 200)

    def test_numeric_input_weather(self):
        res = self.client.get('/weather?city=12345')
        self.assertEqual(res.status_code, 400)
        self.assertIn('error', res.get_json())

    def test_special_char_input_weather(self):
        res = self.client.get('/weather?city=@!$%')
        self.assertEqual(res.status_code, 400)
        self.assertIn('error', res.get_json())

    def test_empty_city_weather(self):
        res = self.client.get('/weather?city=')
        self.assertEqual(res.status_code, 400)
        self.assertIn('error', res.get_json())

    def test_missing_city_param_weather(self):
        res = self.client.get('/weather')
        self.assertEqual(res.status_code, 400)

    def test_valid_city_forecast(self):
        res = self.client.get('/forecast?city=London')
        self.assertEqual(res.status_code, 200)
        self.assertIn('list', res.get_json())

    def test_invalid_city_forecast(self):
        res = self.client.get('/forecast?city=invalidcity')
        self.assertNotEqual(res.status_code, 200)

    def test_missing_param_forecast(self):
        res = self.client.get('/forecast')
        self.assertEqual(res.status_code, 400)

    def test_numeric_input_forecast(self):
        res = self.client.get('/forecast?city=12345')
        self.assertEqual(res.status_code, 400)
        self.assertIn('error', res.get_json())

    def test_special_char_input_forecast(self):
        res = self.client.get('/forecast?city=@!$%')
        self.assertEqual(res.status_code, 400)
        self.assertIn('error', res.get_json())

    def test_empty_city_forecast(self):
        res = self.client.get('/forecast?city=')
        self.assertEqual(res.status_code, 400)
        self.assertIn('error', res.get_json())
