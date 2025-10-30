import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./css/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { endTrip, userChoice } = useUser();

    const handleEndTrip = () => {
        endTrip();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <h1>Explore {userChoice?.country || "Europe"}</h1>
            <div className="nav-buttons">
                <button onClick={() => navigate("/carousel")} className="nav-button">
                    Carrousel
                </button>
                <button onClick={() => navigate("/search")} className="nav-button">
                    Recherche
                </button>
                <button onClick={() => navigate("/playlist")} className="nav-button">
                    Ma Liste
                </button>
                <button onClick={handleEndTrip} className="nav-button end-trip">
                    Fin de voyage
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
