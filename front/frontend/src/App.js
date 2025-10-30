import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CarouselPage from './components/CarouselPage';
import DetailsPage from './components/DetailsPage';

function App() {
  const [userChoice, setUserChoice] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onSubmit={(choice) => setUserChoice(choice)} />} />
        <Route path="/carousel" element={<CarouselPage userChoice={userChoice} />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
