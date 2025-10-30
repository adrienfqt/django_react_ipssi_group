from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .services.tripadvisor import (
    fetch_places_minimal_carousel,
    fetch_places_photos,
    fetch_places_details
)
import json

COUNTRY_LANGUAGE_MAP = {
    'France': 'fr',
    'Espagne': 'es',
    'Portugal': 'pt'
}

# Mapping des profils vers les catégories
PROFILE_CATEGORY_MAP = {
    'Local': 'restaurants',
    'Touriste': 'attractions',
    'Professionnel': 'hotels'
}

@require_http_methods(["GET"])
def get_carousel(request):
    """
    Endpoint pour obtenir le carousel d'attractions selon le profil et le pays
    GET /api/carousel/?profile=Local&country=France
    """
    try:
        # Récupération des paramètres GET
        profile = request.GET.get('profile')
        country = request.GET.get('country')

        # Validation
        if not profile or not country:
            return JsonResponse({
                'error': 'Les paramètres profile et country sont requis'
            }, status=400)

        if profile not in PROFILE_CATEGORY_MAP:
            return JsonResponse({
                'error': f'Profil invalide. Choisissez parmi: {", ".join(PROFILE_CATEGORY_MAP.keys())}'
            }, status=400)

        if country not in COUNTRY_LANGUAGE_MAP:
            return JsonResponse({
                'error': f'Pays invalide. Choisissez parmi: {", ".join(COUNTRY_LANGUAGE_MAP.keys())}'
            }, status=400)

        # Déterminer la catégorie et la langue
        category = PROFILE_CATEGORY_MAP[profile]
        language = COUNTRY_LANGUAGE_MAP[country]

        results = fetch_places_minimal_carousel(
            category=category,
            country=country,
            language=language
        )

        if results is None:
            return JsonResponse({
                'error': 'Erreur lors de la récupération des données de TripAdvisor'
            }, status=500)

        print(results)

        return JsonResponse(results, safe=False)

    except Exception as e:
        print(f" Erreur serveur: {str(e)}")
        return (JsonResponse({
            'error': f'Erreur serveur: {str(e)}'
        }, status=500))

def get_location_photo(request):
    """
    Endpoint pour obtenir les photos d'un lieu
    GET /api/photo/?location=188709
    """
    try:
        # Récupération des paramètres GET
        location_id = request.GET.get('location')

        # Validation
        if not location_id :
            return JsonResponse({
                'error': 'Le paramètre location_id est requis'
            }, status=400)

        results = fetch_places_photos(
            location_id=location_id
        )

        if results is None:
            return JsonResponse({
                'error': 'Erreur lors de la récupération des données de TripAdvisor'
            }, status=500)

        print(results)

        return JsonResponse(results, safe=False)

    except Exception as e:
        print(f" Erreur serveur: {str(e)}")
        return JsonResponse({
            'error': f'Erreur serveur: {str(e)}'
        }, status=500)


def get_location_details(request):
    """
    Endpoint pour obtenir les détails d'un lieu
    GET /api/details/?location=188709
    """
    try:
        # Récupération des paramètres GET
        location_id = request.GET.get('location')

        # Validation
        if not location_id:
            return JsonResponse({
                'error': 'Le paramètre location_id est requis'
            }, status=400)

        results = fetch_places_details(
            location_id=location_id
        )

        if results is None:
            return JsonResponse({
                'error': 'Erreur lors de la récupération des données de TripAdvisor'
            }, status=500)

        print(results)

        return JsonResponse(results, safe=False)

    except Exception as e:
        print(f" Erreur serveur: {str(e)}")
        return JsonResponse({
            'error': f'Erreur serveur: {str(e)}'
        }, status=500)
