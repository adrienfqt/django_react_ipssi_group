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

                const baseData = response.data.data || response.data;

                const enhancedData = await Promise.all(
                    baseData.map(async (item) => {
                        try {
                            /*const photoRes = await axios.get("http://127.0.0.1:8000/photo/", {
                                params: { location: item.location_id },
                            });

                            const originalUrl =
                                photoRes.data?.data?.[0]?.images?.original?.url ||
                                `https://picsum.photos/400/250?random=${Math.random()}`;
                            **/
                            return {
                                ...item,
                                image_url: null,
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

                setData(enhancedData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchCarouselData();
    }, [userChoice]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        cssEase: "ease-in-out",
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
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
                    <button className="nav-button" onClick={() => navigate('/')}>
                        Accueil
                    </button>
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
                        <div
                            key={index}
                            className="carousel-card"
                            onClick={() => navigate(`/details/${item.location_id}`)}
                            style={{ cursor: 'pointer' }}>
                            <img
                                src={item.image_url ? item.image_url : `https://picsum.photos/400/250?random=${Math.random()}`}
                                alt={item.name}
                                className="carousel-image"
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
