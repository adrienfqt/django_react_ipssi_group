import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.content.tripadvisor.com/api/v1/location/"

def fetch_places_minimal_carousel(category, country, language):
    url = f"{BASE_URL}search?key={API_KEY}&searchQuery={country}&category={category}&address={country}&language={language}"
    print(url)
    headers = {"X-TripAdvisor-API-Key": API_KEY}
    params = {}


    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

def fetch_places_details(location_id):
    url = f"{BASE_URL}{location_id}/details?key={API_KEY}"
    print(url)
    headers = {"X-TripAdvisor-API-Key": API_KEY}
    params = {}


    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

def fetch_places_photos(location_id):
    url = f"{BASE_URL}{location_id}/photos?key={API_KEY}&limit=1&source=Expert"
    print(url)
    headers = {"X-TripAdvisor-API-Key": API_KEY}
    params = {}


    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

def fetch_places_nearby(lat,long):
    url = f"{BASE_URL}nearby_search?latLong={lat},{long}&key={API_KEY}"
    print(url)
    headers = {"X-TripAdvisor-API-Key": API_KEY}
    params = {}


    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()


def fetch_places_search_filter(searchQuery, city=None, category=None):
    """
    Recherche des lieux via l'API TripAdvisor selon les filtres donnés.
    Tous les paramètres sont optionnels sauf searchQuery.
    """
    searchQuery = (searchQuery or "").strip()
    city = (city or "").strip()
    category = (category or "").strip()

    url = f"{BASE_URL}search?key={API_KEY}&searchQuery={searchQuery}"

    if city:
        url += f"%{city}"

    if category:
        url += f"&category={category}"

    print(f"🔍 URL TripAdvisor générée : {url}")

    headers = {"X-TripAdvisor-API-Key": API_KEY}
    params = {}

    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()
