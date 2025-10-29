import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.content.tripadvisor.com/api/v1/location/"

def fetch_places_carousel(category, country, language):
    url = f"{BASE_URL}search?key={API_KEY}&searchQuery={country}&category={category}&address={country}&language={language}"
    print(url)
    headers = {"X-TripAdvisor-API-Key": API_KEY}
    params = {}


    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()