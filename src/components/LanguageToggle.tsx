import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;
}

export default function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-2 bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-800/50 p-2">
        <Globe className="w-4 h-4 text-gray-400" />
        <button
          onClick={() => setLanguage('fr')}
          className={`px-3 py-1 rounded-lg text-sm font-mono transition-all ${
            language === 'fr' 
              ? 'bg-cyan-500 text-black' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-lg text-sm font-mono transition-all ${
            language === 'en' 
              ? 'bg-cyan-500 text-black' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}