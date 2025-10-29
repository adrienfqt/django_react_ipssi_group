
import React, { useState } from 'react';
import './css/LandingPage.css';

const profiles = ['Local', 'Touriste', 'Professionnel'];
const countries = ['France', 'Espagne', 'Portugal'];

const LandingPage = ({ onSubmit }) => {
    const [selectedProfile, setSelectedProfile] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const handleSubmit = () => {
        if (selectedProfile && selectedCountry) {
            onSubmit({ profile: selectedProfile, country: selectedCountry });
        }
    };

    return (
        <div className="landing-container">
            <div className="landing-header">
                <h1>Explorez l'Europe selon votre profil</h1>
                <p>Choisissez votre profil et votre destination pour découvrir les meilleures attractions</p>
            </div>

            <div className="selector-section">
                <div className="selector">
                    <h2>Je suis...</h2>
                    <div className="options">
                        {profiles.map((profile) => (
                            <button
                                key={profile}
                                className={selectedProfile === profile ? 'selected' : ''}
                                onClick={() => setSelectedProfile(profile)}
                            >
                                {profile}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="selector">
                    <h2>Je veux visiter...</h2>
                    <div className="options">
                        {countries.map((country) => (
                            <button
                                key={country}
                                className={selectedCountry === country ? 'selected' : ''}
                                onClick={() => setSelectedCountry(country)}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="submit-section">
                <button className="submit-button" onClick={handleSubmit}>
                    Découvrir les attractions
                </button>
            </div>
        </div>
    );
};

export default LandingPage;


