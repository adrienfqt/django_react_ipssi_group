import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CarouselPage from './components/CarouselPage';
import DetailsPage from './components/DetailsPage';
import SearchPage from './components/Search';
import {UserProvider} from "./context/UserContext";

function App() {
  const [userChoice, setUserChoice] = useState(null);

  return (
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage onSubmit={(choice) => setUserChoice(choice)} />} />
            <Route path="/carousel" element={<CarouselPage userChoice={userChoice} />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/search" element={<SearchPage userChoice={userChoice} />} />
          </Routes>
        </Router>
      </UserProvider>
  );
}

export default App;
