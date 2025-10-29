import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import './css/Carousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow({ onClick }) {
  return (
    <button className="arrow prev" onClick={onClick}>
      &#10094;
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button className="arrow next" onClick={onClick}>
      &#10095;
    </button>
  );
}

const CarouselPage = ({ userChoice }) => {
  const navigate = useNavigate();

  if (!userChoice) {
    return <p>Veuillez retourner à la page d’accueil et sélectionner un profil.</p>;
  }

  const { profile, country } = userChoice;

  // Données nazes, à remplacer plus tard par un appel API réel du back
  const data = {
    Local: [
      { name: 'Restaurant A', img: 'https://picsum.photos/400/250?random=1' },
      { name: 'Restaurant B', img: 'https://picsum.photos/400/250?random=2' },
      { name: 'Restaurant C', img: 'https://picsum.photos/400/250?random=3' },
      { name: 'Restaurant D', img: 'https://picsum.photos/400/250?random=10' },
    ],
    Touriste: [
      { name: 'Attraction X', img: 'https://picsum.photos/400/250?random=4' },
      { name: 'Attraction Y', img: 'https://picsum.photos/400/250?random=5' },
      { name: 'Attraction Z', img: 'https://picsum.photos/400/250?random=6' },
      { name: 'Attraction Z', img: 'https://picsum.photos/400/250?random=88' },

    ],
    Professionnel: [
      { name: 'Hôtel Alpha', img: 'https://picsum.photos/400/250?random=7' },
      { name: 'Hôtel Beta', img: 'https://picsum.photos/400/250?random=8' },
      { name: 'Hôtel Gamma', img: 'https://picsum.photos/400/250?random=9' },
      { name: 'Attraction Z', img: 'https://picsum.photos/400/250?random=17' },
    ],
  };

  const items = data[profile] || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-page">
      {/* Barre de navigation */}
      <nav className="navbar">
        <h1>Explore Europe</h1>
        <button className="home-button" onClick={() => navigate('/')}>
          Accueil
        </button>
      </nav>

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
    </div>
  );
};

export default CarouselPage;
