import React from 'react';
import './css/Carousel.css';

const CarouselPage = ({ userChoice }) => {
  if (!userChoice) {
    return <p>Veuillez retourner à la page d’accueil et sélectionner un profil.</p>;
  }

  const { profile, country } = userChoice;

  // Simulation de données selon le profil
  const data = {
    Local: ['Restaurant A', 'Restaurant B', 'Restaurant C'],
    Touriste: ['Attraction X', 'Attraction Y', 'Attraction Z'],
    Professionnel: ['Hôtel Alpha', 'Hôtel Beta', 'Hôtel Gamma'],
  };

  // Récupère la bonne liste
  const items = data[profile] || [];

  return (
    <div className="carousel-container">
      <h2>
        {profile === 'Local'
          ? `Restaurants en ${country}`
          : profile === 'Touriste'
          ? `Attractions en ${country}`
          : `Hôtels en ${country}`}
      </h2>

      <div className="carousel">
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <h3>{item}</h3>
            <p>Description de {item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselPage;
