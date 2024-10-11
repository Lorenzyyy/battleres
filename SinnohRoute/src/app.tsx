import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sinnoh from './components/sinnoh';
import StarterPoke from './components/starterPoke';
import Battle from './components/battle'
import Explore from './components/explore';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sinnoh />} />
        <Route path="/starterPoke" element={<StarterPoke />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </Router>
  );
};

export default App;