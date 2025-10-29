import React from 'react';
import LandingPage from './components/landingPage/LandingPage';

function App() {
    const handleSubmit = (data) => {
        console.log('Choix utilisateur :', data);
        // Ici tu peux rediriger vers une autre page ou stocker les données
    };

    return (
        <LandingPage onSubmit={handleSubmit} />
    );
}

export default App;