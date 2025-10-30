import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/NearbyCarousel.css";
import { useUser } from "../context/UserContext";

const NearbyCarousel = () => {
    const { userChoice } = useUser();
    const navigate = useNavigate();
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNearbyPlaces = async () => {
            if (!userChoice?.country) {
                setLoading(false);
                return;
            }

            try {
                // 1. Récupérer les lieux à proximité
                const response = await axios.get("http://127.0.0.1:8000/nearby_capitale/", {
                    params: { country: userChoice.country }
                });

                const baseData = response.data?.data || [];

                if (baseData.length === 0) {
                    setNearbyPlaces([]);
                    setLoading(false);
                    return;
                }

                // 2. Enrichir chaque lieu avec sa photo
                const enhancedData = await Promise.all(
                    baseData.slice(0, 10).map(async (place) => {
                        try {
                            const photoRes = await axios.get("http://127.0.0.1:8000/photo/", {
                                params: { location: place.location_id },
                            });

                            const imageUrl =
                                photoRes.data?.data?.[0]?.images?.medium?.url ||
                                photoRes.data?.data?.[0]?.images?.large?.url ||
                                `https://via.placeholder.com/300x200?text=${encodeURIComponent(place.name)}`;

                            return {
                                ...place,
                                image_url: imageUrl,
                            };
                        } catch (err) {
                            console.warn("Erreur photo pour", place.name, err);
                            return {
                                ...place,
                                image_url: `https://via.placeholder.com/300x200?text=${encodeURIComponent(place.name)}`,
                            };
                        }
                    })
                );

                setNearbyPlaces(enhancedData);
            } catch (error) {
                console.error("Erreur lors du chargement des lieux à proximité:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNearbyPlaces();
    }, [userChoice]);

    const scroll = (direction) => {
        const container = document.querySelector(".nearby-carousel-container");
        const scrollAmount = 320;

        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleCardClick = (locationId) => {
        // Recharger la page de détails avec le nouveau lieu
        navigate(`/details/${locationId}`);
        window.scrollTo(0, 0); // Scroll vers le haut
    };

    // Formater la distance (de km à mètres si < 1km)
    const formatDistance = (distanceKm) => {
        const distance = parseFloat(distanceKm);
        if (distance < 1) {
            return `${Math.round(distance * 1000)} m`;
        }
        return `${distance.toFixed(1)} km`;
    };

    if (loading) {
        return (
            <div className="nearby-carousel">
                <h3>Autres activités à proximité</h3>
                <div className="loading-nearby">
                    <div className="spinner"></div>
                    <p>Chargement des lieux à proximité...</p>
                </div>
            </div>
        );
    }

    if (nearbyPlaces.length === 0) {
        return (
            <div className="nearby-carousel">
                <h3>Autres activités à proximité</h3>
                <p className="no-results">Aucune activité trouvée à proximité.</p>
            </div>
        );
    }

    return (
        <div className="nearby-carousel">
            <div className="nearby-header">
                <h3>Autres activités à proximité</h3>
                <p className="nearby-subtitle">{nearbyPlaces.length} lieux trouvés</p>
            </div>

            <div className="carousel-wrapper">
                <button
                    className="carousel-nav-btn left"
                    onClick={() => scroll("left")}
                    aria-label="Précédent"
                >
                    ❮
                </button>

                <div className="nearby-carousel-container">
                    {nearbyPlaces.map((place) => (
                        <div
                            key={place.location_id}
                            className="nearby-card"
                            onClick={() => handleCardClick(place.location_id)}
                        >
                            <div className="nearby-card-image">
                                <img
                                    src={place.image_url}
                                    alt={place.name}
                                    onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(place.name)}`;
                                    }}
                                />
                                {place.distance && (
                                    <div className="distance-badge">
                                        📍 {formatDistance(place.distance)}
                                    </div>
                                )}
                            </div>

                            <div className="nearby-card-content">
                                <h4 title={place.name}>{place.name}</h4>

                                {place.address_obj?.city && (
                                    <p className="location">
                                        📌 {place.address_obj.city}
                                    </p>
                                )}

                                {place.address_obj?.address_string && (
                                    <p className="address" title={place.address_obj.address_string}>
                                        {place.address_obj.address_string}
                                    </p>
                                )}

                                {place.bearing && (
                                    <p className="bearing">
                                        🧭 Direction: {place.bearing}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-nav-btn right"
                    onClick={() => scroll("right")}
                    aria-label="Suivant"
                >
                    ❯
                </button>
            </div>
        </div>
    );
};

export default NearbyCarousel;