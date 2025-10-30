import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/DetailsPage.css';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    // Données fictives pour test
    const fakeData = [
      {
        id: 1,
        name: "Restaurant A",
        image: "https://picsum.photos/400/250?random=1",
        description: "Un excellent restaurant local",
        category: "Restaurant",
        location: "Paris, France",
        rating: "4.5/5",
      },
      {
        id: 2,
        name: "Attraction X",
        image: "https://picsum.photos/400/250?random=4",
        description: "Une attraction populaire",
        category: "Attraction",
        location: "Barcelone, Espagne",
        rating: "4.8/5",
      },
      {
        id: 3,
        name: "Hotel GGG",
        image: "https://picsum.photos/400/250?random=52",
        description: "Un hotel populaire",
        category: "Hotel",
        location: "Lisbonne, Portugal",
        rating: "4.9/5",
      },
    ];

    const selected = fakeData.find((item) => item.id === parseInt(id));
    setItemDetails(selected);
  }, [id]);

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-page">
      <nav className="navbar">
        <h1>Détails</h1>
        <button className="home-button" onClick={() => navigate('/')}>
          Accueil
        </button>
      </nav>

      <h1>{itemDetails.name}</h1>
      <img src={itemDetails.image} alt={itemDetails.name} />
      <p>{itemDetails.description}</p>
      <ul>
        <li>Catégorie : {itemDetails.category}</li>
        <li>Localisation : {itemDetails.location}</li>
        <li>Note : {itemDetails.rating}</li>
      </ul>
    </div>
  );
};

export default DetailsPage;
