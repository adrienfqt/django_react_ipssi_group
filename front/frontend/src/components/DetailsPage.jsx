import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/DetailsPage.css";
import Navbar from "./Navbar";
import NearbyCarousel from "./NearbyCarousel";

const DetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [details, setDetails] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetailsAndPhoto = async () => {
            try {
                const [detailsResponse, photoResponse] = await Promise.all([
                    axios.get("http://127.0.0.1:8000/details/", { params: { location: id } }),
                    axios.get("http://127.0.0.1:8000/photo/", { params: { location: id } }),
                ]);

                setDetails(detailsResponse.data);

                const allPhotos = photoResponse.data?.data || [];
                setPhotos(allPhotos.length > 0
                    ? allPhotos.map(p => p.images?.original?.url || p.images?.large?.url)
                    : ["https://via.placeholder.com/800x400?text=Image+indisponible"]
                );
            } catch (error) {
                console.error("Erreur lors du chargement :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailsAndPhoto();
    }, [id]);

    if (loading) return <div className="loading">Chargement des informations...</div>;
    if (!details) return <p>Aucune information trouvée pour ce lieu.</p>;

    const getPriceLevel = (priceLevel) => {
        if (!priceLevel) return "Non renseigné";
        return "€".repeat(parseInt(priceLevel));
    };

    return (
        <div className="details-page">
            <Navbar />

            <div className="details-hero">
                <img src={photos[0]} alt={details.name} className="details-image" />
            </div>

            <div className="details-container">
                <h2>{details.name}</h2>
                <p className="details-description">{details.description || "Pas de description disponible."}</p>

                <div className="details-info">
                    <p><strong>Adresse :</strong> {details.address_obj?.address_string}</p>
                    <p><strong>Téléphone :</strong> {details.phone || "Non renseigné"}</p>
                    <p><strong>Site web :</strong>{" "}
                        {details.website ? <a href={details.website} target="_blank" rel="noreferrer">{details.website}</a> : "—"}
                    </p>
                    <p><strong>Lien TripAdvisor :</strong>{" "}
                        <a href={details.web_url} target="_blank" rel="noreferrer">Voir sur TripAdvisor</a>
                    </p>

                    {details.latitude && details.longitude && (
                        <p><strong>Coordonnées :</strong> {details.latitude}, {details.longitude}</p>
                    )}

                    {details.price_level && (
                        <p><strong>Niveau de prix :</strong> {getPriceLevel(details.price_level)}</p>
                    )}
                </div>

                <div className="details-rating">
                    <img src={details.rating_image_url} alt="Note" />
                    <p><strong>{details.rating}</strong> / 5 ({details.num_reviews} avis)</p>
                    <p>{details.ranking_data?.ranking_string}</p>

                    {details.review_rating_count && (
                        <div className="rating-breakdown">
                            <h4>Répartition des avis :</h4>
                            <ul>
                                {Object.entries(details.review_rating_count).reverse().map(([stars, count]) => (
                                    <li key={stars}>
                                        {"⭐".repeat(parseInt(stars))} : {count} avis
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {details.hours && (
                    <div className="details-hours">
                        <h3>Horaires d'ouverture</h3>
                        <ul>
                            {details.hours.weekday_text?.map((line, idx) => (
                                <li key={idx}>{line}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="details-categories">
                    <h3>Catégorie</h3>
                    <p><strong>{details.category?.localized_name}</strong></p>

                    {details.subcategory?.length > 0 && (
                        <>
                            <h4>Sous-catégories :</h4>
                            <ul>
                                {details.subcategory.map((sub, i) => (
                                    <li key={i}>{sub.localized_name}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {details.cuisine?.length > 0 && (
                        <>
                            <h3>Types de cuisine</h3>
                            <ul className="cuisine-list">
                                {details.cuisine.map((c, i) => (
                                    <li key={i}>{c.localized_name}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {details.styles?.length > 0 && (
                        <>
                            <h3>Style</h3>
                            <ul>
                                {details.styles.map((style, i) => (
                                    <li key={i}>{style}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {details.hotel_class && (
                        <p><strong>Classe d'hôtel :</strong> {"⭐".repeat(parseInt(details.hotel_class))}</p>
                    )}

                    {details.groups?.length > 0 && (
                        <>
                            <h3>Groupes associés</h3>
                            <ul>
                                {details.groups.map((group, i) => (
                                    <li key={i}>
                                        <strong>{group.localized_name}</strong>
                                        {group.categories && ` — ${group.categories.map((c) => c.localized_name).join(", ")}`}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {photos.length > 1 && (
                    <div className="details-photos">
                        <h3>Galerie photos ({details.photo_count} photos disponibles)</h3>
                        <div className="photo-grid">
                            {photos.slice(0, 6).map((photo, i) => (
                                <img key={i} src={photo} alt={`${details.name} ${i + 1}`} />
                            ))}
                        </div>
                        {details.see_all_photos && (
                            <a href={details.see_all_photos} target="_blank" rel="noreferrer" className="see-all-link">
                                Voir toutes les photos →
                            </a>
                        )}
                    </div>
                )}

                {details.awards?.length > 0 && (
                    <div className="details-awards">
                        <h3>Récompenses</h3>
                        {details.awards.map((award, i) => (
                            <div key={i} className="award-card">
                                <img src={award.images?.small} alt={award.display_name} />
                                <span>{award.display_name} ({award.year})</span>
                            </div>
                        ))}
                    </div>
                )}

                {details.neighborhood_info?.length > 0 && (
                    <div className="details-neighborhood">
                        <h3>Quartiers à proximité</h3>
                        <ul>
                            {details.neighborhood_info.map((n, i) => (
                                <li key={i}>{n.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {details.trip_types?.length > 0 && (
                    <div className="details-triptypes">
                        <h3>Types de visiteurs</h3>
                        <ul>
                            {details.trip_types.map((t, i) => (
                                <li key={i}>
                                    {t.localized_name}: {t.value} avis
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <NearbyCarousel />
            </div>
        </div>
    );
};

export default DetailsPage;