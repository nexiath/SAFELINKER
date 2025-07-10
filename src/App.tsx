import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LanguageToggle from './components/LanguageToggle';
import HomePage from './pages/HomePage';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import API from './pages/API';
import Extension from './pages/Extension';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

type Language = 'en' | 'fr';

function App() {
  const [language, setLanguage] = useState<Language>('fr');

  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navigation language={language} />
        <LanguageToggle language={language} setLanguage={setLanguage} />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage language={language} setLanguage={setLanguage} />} />
            <Route path="/how-it-works" element={<HowItWorks language={language} />} />
            <Route path="/pricing" element={<Pricing language={language} />} />
            <Route path="/api" element={<API language={language} />} />
            <Route path="/extension" element={<Extension language={language} />} />
            <Route path="/privacy" element={<Privacy language={language} />} />
            <Route path="/terms" element={<Terms language={language} />} />
          </Routes>
        </div>
        
        {/* Signature */}
        <div className="fixed bottom-4 left-4 text-xs font-mono text-gray-600 tracking-wider z-50">
          Robin Cassard
        </div>
      </div>
    </Router>
  );
}

export default App;