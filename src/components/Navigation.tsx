import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, HelpCircle, DollarSign, Shield, Code, Chrome, FileText, Lock } from 'lucide-react';

interface NavigationProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    home: 'Scanner',
    howItWorks: 'How it Works',
    pricing: 'Pricing',
    api: 'API',
    extension: 'Extension',
    privacy: 'Privacy',
    terms: 'Terms'
  },
  fr: {
    home: 'Scanner',
    howItWorks: 'Fonctionnement',
    pricing: 'Tarifs',
    api: 'API',
    extension: 'Extension',
    privacy: 'Confidentialité',
    terms: 'Conditions'
  }
};

export default function Navigation({ language }: NavigationProps) {
  const location = useLocation();
  const t = translations[language];

  const navItems = [
    { path: '/', label: t.home, icon: <Home className="w-4 h-4" /> },
    { path: '/how-it-works', label: t.howItWorks, icon: <HelpCircle className="w-4 h-4" /> },
    { path: '/pricing', label: t.pricing, icon: <DollarSign className="w-4 h-4" /> },
    { path: '/api', label: t.api, icon: <Code className="w-4 h-4" /> },
    { path: '/extension', label: t.extension, icon: <Chrome className="w-4 h-4" /> },
    { path: '/privacy', label: t.privacy, icon: <Lock className="w-4 h-4" /> },
    { path: '/terms', label: t.terms, icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30">
      <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-2">
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}