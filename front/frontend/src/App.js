import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CarouselPage from './components/CarouselPage';

function App() {
  const [userChoice, setUserChoice] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onSubmit={(choice) => setUserChoice(choice)} />} />
        <Route path="/carousel" element={<CarouselPage userChoice={userChoice} />} />
      </Routes>
    </Router>
  );
}

export default App;
