import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/DetailsPage.css";
import Navbar from "./Navbar";

const DetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [details, setDetails] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetailsAndPhoto = async () => {
            try {
                const [detailsResponse, photoResponse] = await Promise.all([
                    axios.get("http://127.0.0.1:8000/details/", { params: { location: id } }),
                    axios.get("http://127.0.0.1:8000/photo/", { params: { location: id } }),
                ]);

                setDetails(detailsResponse.data);
                const imageUrl =
                    photoResponse.data?.data?.[0]?.images?.original?.url ||
                    "https://via.placeholder.com/800x400?text=Image+indisponible";
                setPhoto(imageUrl);
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

    return (
        <div className="details-page">
            <Navbar />

            <div className="details-hero">
                <img src={photo} alt={details.name} className="details-image" />
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
                </div>

                <div className="details-rating">
                    <img src={details.rating_image_url} alt="Note" />
                    <p><strong>{details.rating}</strong> / 5 ({details.num_reviews} avis)</p>
                    <p>{details.ranking_data?.ranking_string}</p>
                </div>

                {details.hours && (
                    <div className="details-hours">
                        <h3>Horaires d’ouverture</h3>
                        <ul>
                            {details.hours.weekday_text?.map((line, idx) => (
                                <li key={idx}>{line}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="details-categories">
                    <h3>Catégorie</h3>
                    <p>{details.category?.localized_name}</p>

                    {details.groups?.length > 0 && (
                        <>
                            <h3>Groupes associés</h3>
                            <ul>
                                {details.groups.map((group, i) => (
                                    <li key={i}>
                                        <strong>{group.localized_name}</strong> —{" "}
                                        {group.categories?.map((c) => c.localized_name).join(", ")}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

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
                        <h3>Quartiers</h3>
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
            </div>
        </div>
    );
};

export default DetailsPage;
