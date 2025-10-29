import React from 'react';
import Slider from "react-slick";
import './css/Carousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselPage = ({ userChoice }) => {
  if (!userChoice) {
    return <p>Veuillez retourner à la page d’accueil et sélectionner un profil.</p>;
  }

  const { profile, country } = userChoice;

  // Données factices (à remplacer plus tard par ton backend)
  const data = {
    Local: [
      { name: 'Restaurant A', img: 'https://picsum.photos/400/250?random=1' },
      { name: 'Restaurant B', img: 'https://picsum.photos/400/250?random=2' },
      { name: 'Restaurant C', img: 'https://picsum.photos/400/250?random=3' }
    ],
    Touriste: [
      { name: 'Attraction X', img: 'https://picsum.photos/400/250?random=4' },
      { name: 'Attraction Y', img: 'https://picsum.photos/400/250?random=5' },
      { name: 'Attraction Z', img: 'https://picsum.photos/400/250?random=6' }
    ],
    Professionnel: [
      { name: 'Hôtel Alpha', img: 'https://picsum.photos/400/250?random=7' },
      { name: 'Hôtel Beta', img: 'https://picsum.photos/400/250?random=8' },
      { name: 'Hôtel Gamma', img: 'https://picsum.photos/400/250?random=9' }
    ],
  };

  const items = data[profile] || [];

  // Paramètres du carrousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768, // tablette/mobile
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <h2>
        {profile === 'Local'
          ? `Restaurants en ${country}`
          : profile === 'Touriste'
          ? `Attractions en ${country}`
          : `Hôtels en ${country}`}
      </h2>

      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="carousel-card">
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Description de {item.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselPage;
