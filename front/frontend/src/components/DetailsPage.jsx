import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./css/DetailsPage.css";

const DetailsPage = () => {
  const { id } = useParams(); // on récup l'ID dans l'URL
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item; // on récup les data envoyés depuis le carousel

  // i aucun item n’a été passé (ex rechargement de la page)
  if (!item) {
    return (
      <div className="details-page">
        <h2>Aucune donnée disponible pour cet élément (id: {id})</h2>
        <button onClick={() => navigate(-1)}>⬅ Retour</button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <nav className="navbar">
        <h1>{item.name}</h1>
        <button className="home-button" onClick={() => navigate("/")}>
          Accueil
        </button>
      </nav>

      <div className="details-content">
        <img
          src={`https://picsum.photos/800/400?random=${id}`}
          alt={item.name}
          className="details-image"
        />
        <p><strong>Adresse :</strong> {item.address_obj?.address_string || "Non renseignée"}</p>
        <p><strong>Note :</strong> {item.rating || "Aucune note"}</p>
        <p><strong>Description :</strong> {item.description || "Pas de description disponible"}</p>
      </div>
    </div>
  );
};

export default DetailsPage;
