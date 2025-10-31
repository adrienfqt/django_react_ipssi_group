import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "./Navbar";
import "./css/PlaylistPage.css";

const PlaylistPage = () => {
    const { playlist, removeFromList } = useUser();
    const navigate = useNavigate();

    return (
        <div className="playlist-page">
            <Navbar />

            <div className="playlist-container">
                <h2>Ma Liste de lieux favoris</h2>

                {playlist.length === 0 ? (
                    <p>Aucun lieu enregistré pour le moment.</p>
                ) : (
                    <div className="playlist-grid">
                        {playlist.map((place) => (
                            <div
                                key={place.location_id}
                                className="playlist-card"
                                onClick={() => navigate(`/details/${place.location_id}`)}
                            >
                                <img src={place.image} alt={place.name} />
                                <h3>{place.name}</h3>
                                <p>{place.address}</p>
                                <p>⭐ {place.rating}</p>
                                <button
                                    className="remove-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromList(place.location_id);
                                    }}
                                >
                                    Retirer
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistPage;
