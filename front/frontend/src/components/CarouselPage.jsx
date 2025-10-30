import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import './css/Carousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function PrevArrow({ onClick }) {
    return <button className="arrow prev" onClick={onClick}>&#10094;</button>;
}

function NextArrow({ onClick }) {
    return <button className="arrow next" onClick={onClick}>&#10095;</button>;
}

const CarouselPage = ({ userChoice }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const { profile, country } = userChoice || {};

    useEffect(() => {
        if (!userChoice) return;

        const fetchCarouselData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/carousel/", {
                    params: { profile, country },
                });
                setData(response.data.data || response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchCarouselData();
    }, [userChoice]);

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
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    if (!userChoice) return <p>Chargement du profil...</p>;
    if (!data.length) return <p>Chargement des données...</p>;

    return (
        <div className="carousel-page">
            {/* 🌍 NAVBAR */}
            <nav className="navbar">
                <h1>Explore Europe</h1>
                <div className="nav-buttons">
                    <button className="nav-button" onClick={() => navigate('/')}>Accueil</button>
                    <button className="nav-button">Recherche</button>
                    <button className="nav-button">Découverte</button>
                    <button className="nav-button">Ma Compilation</button>
                </div>
            </nav>

            {/* 🎠 CAROUSEL */}
            <div className="carousel-container">
                <h2>
                    {profile === 'Local'
                        ? `Restaurants en ${country}`
                        : profile === 'Touriste'
                            ? `Attractions en ${country}`
                            : `Hôtels en ${country}`}
                </h2>

                <Slider {...settings}>
                    {data.map((item, index) => (
                        /*gestion du comportement du clic sur un item du carousel */
                        <div key={index} className="carousel-card" onClick={() => navigate(`/details/${item.id}`, { state: { item } })} style={{ cursor: 'pointer' }}>
                            <img
                                src={`https://picsum.photos/400/250?random=${index + 1}`}
                                alt={item.name}
                            />
                            <h3>{item.name}</h3>
                            <p>{item.address_obj?.address_string || 'Adresse inconnue'}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CarouselPage;
