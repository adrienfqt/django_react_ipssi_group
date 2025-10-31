# Projet TripAdvisor-like - IPSI TP

**Réalisé par :** Adrien Fouquet & Satya Minguez
**Contexte :** Travail pratique pour l'école IPSI
**Technologies :** Django (Back-end), React (Front-end), API TripAdvisor

---

## 📌 Présentation du projet

Ce projet est une application web inspirée de TripAdvisor, permettant aux utilisateurs de découvrir des lieux (restaurants, attractions, hôtels) selon leur profil (Local, Touriste, Professionnel) et leur pays de destination. L'application utilise l'API TripAdvisor pour récupérer des données dynamiques et propose une interface interactive pour explorer, filtrer et sauvegarder des lieux.

---

## Lien présentation vidéo 

https://www.youtube.com/watch?v=lO3NDd91HHY

## 🔧 Architecture Technique

### Back-end (Django)
- **Framework :** Django 5.2
- **Fonctionnalités :**
  - Gestion des requêtes HTTP via des endpoints REST.
  - Intégration avec l'API TripAdvisor pour récupérer des données en temps réel.
  - Validation des paramètres et gestion des erreurs.
  - Configuration des routes et des vues pour servir les données au front-end.

### Front-end (React)
- **Framework :** React (avec hooks et context API)
- **Fonctionnalités :**
  - Interface utilisateur dynamique avec un carousel de lieux.
  - Pages de détails pour chaque lieu.
  - Système de liste personnalisée (ajout/suppression de lieux).
  - Gestion de l'état global via un `UserContext`.
  - Filtres de recherche avancés (par ville, catégorie, etc.).

---

## 🚀 Fonctionnalités Clés

### 1. Carousel de lieux
- Affichage dynamique de lieux en fonction du **profil utilisateur** (Local, Touriste, Professionnel) et du **pays** sélectionné.
- Intégration des images et informations minimales pour chaque lieu.

### 2. Détails d'un lieu
- Accès à une page dédiée pour chaque lieu (photos, description, avis, etc.).
- Possibilité d'ajouter un lieu à une liste personnelle.

### 3. Recherche et filtres
- Recherche par mot-clé, ville ou catégorie.
- Affichage des résultats sous forme de cartes ou de liste.

### 4. Liste personnalisée
- Sauvegarde des lieux préférés dans une playlist via le `UserContext`.
- Possibilité de supprimer un lieu de la liste.

### 5. Lieux à proximité
- Affichage des lieux proches des capitales des pays sélectionnés (France, Espagne, Portugal).

---

## 📡 Endpoints Back-end

| Endpoint                     | Méthode | Paramètres obligatoires       | Description                                                                 |
|------------------------------|---------|-------------------------------|-----------------------------------------------------------------------------|
| `/api/carousel/`             | GET     | `profile`, `country`          | Récupère une liste de 10 destinations filtre par profile et pays                 |
| `/api/photo/`                | GET     | `location` (ID du lieu)       | Récupère les photos d'un lieu spécifique.                                   |
| `/api/details/`              | GET     | `location` (ID du lieu)       | Récupère les détails complets d'un lieu.                                   |
| `/api/nearby_capitale/`      | GET     | `country`                     | Récupère les lieux à proximité de la capitale du pays sélectionné.         |
| `/api/search/filter/`        | GET     | `searchQuery`                 | Filtre les lieux selon une recherche utilisateur (ville, catégorie, etc.). |

