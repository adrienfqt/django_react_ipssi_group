import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./css/SearchPage.css";
import { useUser } from "../context/UserContext";

const SearchPage = () => {
  const { userChoice } = useUser();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    city: "",
    radius: "",
    minReviews: "",
    minPhotos: "",
    priceLevel: "",
  });

  // --- Charger les attractions par défaut (les plus populaires dans la capitale) ---
  useEffect(() => {
    const fetchPopularAttractions = async () => {
      if (!userChoice) return;
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/search/", {
          params: {
            profile: userChoice.profile,
            country: userChoice.country,
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

  // --- Mise à jour des filtres ---
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // --- Appliquer les filtres ---
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/search/filter", {
        params: {
          profile: userChoice.profile,
          country: userChoice.country,
          category: filters.category,
          city: filters.city,
          radius: filters.radius,
          min_reviews: filters.minReviews,
          min_photos: filters.minPhotos,
          price_level: filters.priceLevel,
        },
      });
      setResults(response.data.data || response.data);
    } catch (error) {
      console.error("Erreur lors du filtrage :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <Navbar />

      <div className="search-container">
        <h2>
          Recherche d’attractions {userChoice ? `en ${userChoice.country}` : ""}
        </h2>

        <div className="filters">
          <input
            type="text"
            name="city"
            placeholder="Ville ou coordonnées"
            value={filters.city}
            onChange={handleChange}
          />
          <select name="category" value={filters.category} onChange={handleChange}>
            <option value="">Catégorie</option>
            <option value="restaurant">Restaurant</option>
            <option value="attraction">Attraction</option>
            <option value="hotel">Hôtel</option>
          </select>
          <input
            type="number"
            name="radius"
            placeholder="Rayon (km)"
            value={filters.radius}
            onChange={handleChange}
          />
          <input
            type="number"
            name="minReviews"
            placeholder="Avis minimum"
            value={filters.minReviews}
            onChange={handleChange}
          />
          <input
            type="number"
            name="minPhotos"
            placeholder="Photos minimum"
            value={filters.minPhotos}
            onChange={handleChange}
          />
          {/* <select
            name="priceLevel"
            value={filters.priceLevel}
            onChange={handleChange}
          >
            <option value="">Prix</option>
            <option value="1">€</option>
            <option value="2">€€</option>
            <option value="3">€€€</option>
            <option value="4">€€€€</option>
          </select> */}

          <button onClick={handleSearch}> Rechercher</button>
        </div>

        {loading ? (
          <p>Chargement des résultats...</p>
        ) : (
          <div className="results-grid">
            {results.length > 0 ? (
              results.map((item, index) => (
                <div key={index} className="result-card">
                  <img
                    src={`https://picsum.photos/400/250?random=${index + 1}`}
                    alt={item.name}
                  />
                  <h3>{item.name}</h3>
                  <p>{item.address_obj?.address_string}</p>
                  <p>Note : {item.rating || "Non noté"}</p>
                  <p>Avis : {item.num_reviews || "—"}</p>
                </div>
              ))
            ) : (
              <p>Aucun résultat trouvé pour cette recherche.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
