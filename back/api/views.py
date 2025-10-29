from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .services.tripadvisor import (
    fetch_places_carousel
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

        results = fetch_places_carousel(
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
        return JsonResponse({
            'error': f'Erreur serveur: {str(e)}'
        }, status=500)