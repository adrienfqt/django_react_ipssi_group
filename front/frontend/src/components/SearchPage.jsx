import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useUser } from "../context/UserContext";
import "./css/SearchPage.css";
import {useNavigate} from "react-router-dom";

const SearchPage = () => {
    const { userChoice } = useUser();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        searchQuery: "",
        city: "",
        category: "",
    });

    useEffect(() => {
        const fetchPopularAttractions = async () => {
            if (!userChoice) return;
            try {
                setLoading(true);
                const response = await axios.get("http://127.0.0.1:8000/search/", {
                    params: {
                        country: userChoice.country,
                        profile: userChoice.profile,
                    },
                });
                setResults(response.data.data || response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des attractions :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPopularAttractions();
    }, [userChoice]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        if (!filters.searchQuery.trim()) {
            alert("Veuillez entrer un terme de recherche.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:8000/search/filter/", {
                params: {
                    searchQuery: filters.searchQuery,
                    city: filters.city || "",
                    category: filters.category || "",
                },
            });

            const baseData = response.data.data || response.data;

            // Charger les photos pour les résultats de recherche
            const enhancedData = await Promise.all(
                baseData.map(async (item) => {
                    try {
                        const photoRes = await axios.get("http://127.0.0.1:8000/photo/", {
                            params: { location: item.location_id },
                        });

                        const imageUrl =
                            photoRes.data?.data?.[0]?.images?.original?.url ||
                            `https://picsum.photos/400/250?random=${Math.random()}`;

                        return {
                            ...item,
                            image_url: imageUrl,
                        };
                    } catch (err) {
                        console.warn("Erreur image pour", item.name, err);
                        return {
                            ...item,
                            image_url: `https://picsum.photos/400/250?random=${Math.random()}`,
                        };
                    }
                })
            );

            setResults(enhancedData);
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (locationId) => {
        navigate(`/details/${locationId}`);
        window.scrollTo(0, 0);
    };


    return (
        <div className="search-page">
            <Navbar />

            <div className="search-container">
                <h2 className="page-title">
                    Trouvez des lieux à découvrir {userChoice ? `en ${userChoice.country}` : ""}
                </h2>

                <div className="search-bar">
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Que recherchez-vous ?"
                        value={filters.searchQuery}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="Ville ou région"
                        value={filters.city}
                        onChange={handleChange}
                    />
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                    >
                        <option value="">Catégorie</option>
                        <option value="attraction">Attractions</option>
                        <option value="restaurant">Restaurants</option>
                        <option value="hotel">Hôtels</option>
                    </select>
                    <button onClick={handleSearch}>Rechercher</button>
                </div>

                {loading ? (
                    <p className="loading">Chargement des résultats...</p>
                ) : (
                    <div className="results-grid">
                        {results.length > 0 ? (
                            results.map((item, index) => (
                                <div
                                    key={item.location_id || index}
                                    className="result-card"
                                    onClick={() => handleCardClick(item.location_id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={item.image_url || `https://picsum.photos/400/250?random=${Math.random()}`}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.src = `https://picsum.photos/400/250?random=${Math.random()}`;
                                        }}
                                    />
                                    <div className="card-content">
                                        <h3>{item.name}</h3>
                                        <p className="address">{item.address_obj?.address_string || 'Adresse non disponible'}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">Aucun résultat trouvé.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
