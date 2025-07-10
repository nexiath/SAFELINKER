import React from 'react';
import { Chrome, Shield, Zap, Download, Star, Users } from 'lucide-react';

interface ExtensionProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    title: 'SafeLinker Chrome Extension',
    subtitle: 'Real-time protection directly in your browser',
    description: 'Get instant threat detection and URL analysis without leaving your current page',
    comingSoon: 'Coming Soon',
    notifyMe: 'Notify Me When Available',
    features: [
      {
        title: 'Real-time Scanning',
        description: 'Automatically scan links before you click them',
        icon: <Zap className="w-6 h-6" />
      },
      {
        title: 'Visual Warnings',
        description: 'Clear visual indicators for suspicious links',
        icon: <Shield className="w-6 h-6" />
      },
      {
        title: 'One-Click Analysis',
        description: 'Right-click any link for instant detailed analysis',
        icon: <Chrome className="w-6 h-6" />
      }
    ],
    stats: {
      title: 'Join the Waitlist',
      users: '10,000+',
      usersLabel: 'Users on Waitlist',
      rating: '4.9',
      ratingLabel: 'Expected Rating',
      scans: '1M+',
      scansLabel: 'URLs Protected Daily'
    }
  },
  fr: {
    title: 'Extension Chrome SafeLinker',
    subtitle: 'Protection temps réel directement dans votre navigateur',
    description: 'Obtenez une détection instantanée des menaces et une analyse d\'URL sans quitter votre page actuelle',
    comingSoon: 'Bientôt Disponible',
    notifyMe: 'Me Notifier Quand Disponible',
    features: [
      {
        title: 'Scan Temps Réel',
        description: 'Scanne automatiquement les liens avant de cliquer',
        icon: <Zap className="w-6 h-6" />
      },
      {
        title: 'Alertes Visuelles',
        description: 'Indicateurs visuels clairs pour les liens suspects',
        icon: <Shield className="w-6 h-6" />
      },
      {
        title: 'Analyse Un Clic',
        description: 'Clic droit sur n\'importe quel lien pour analyse détaillée',
        icon: <Chrome className="w-6 h-6" />
      }
    ],
    stats: {
      title: 'Rejoindre la Liste d\'Attente',
      users: '10 000+',
      usersLabel: 'Utilisateurs en Attente',
      rating: '4,9',
      ratingLabel: 'Note Attendue',
      scans: '1M+',
      scansLabel: 'URLs Protégées Quotidiennement'
    }
  }
};

export default function Extension({ language }: ExtensionProps) {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 via-emerald-400 to-teal-300 rounded-2xl flex items-center justify-center">
                <Chrome className="w-12 h-12 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {t.comingSoon}
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-gray-300 mb-4">{t.subtitle}</p>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">{t.description}</p>
          
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 transform hover:-translate-y-1">
            <Download className="w-5 h-5 inline mr-2" />
            {t.notifyMe}
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {t.features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center text-black mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
          <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">{t.stats.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-purple-400" />
                  <span className="text-4xl font-black text-purple-400">{t.stats.users}</span>
                </div>
                <div className="text-sm text-gray-400 font-mono">{t.stats.usersLabel}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="text-4xl font-black text-yellow-400">{t.stats.rating}</span>
                </div>
                <div className="text-sm text-gray-400 font-mono">{t.stats.ratingLabel}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-6 h-6 text-emerald-400" />
                  <span className="text-4xl font-black text-emerald-400">{t.stats.scans}</span>
                </div>
                <div className="text-sm text-gray-400 font-mono">{t.stats.scansLabel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Browser Mockup */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 bg-gray-700 rounded px-4 py-2 ml-4">
                    <span className="text-gray-400 font-mono text-sm">https://example.com</span>
                  </div>
                </div>
                <div className="bg-gray-700 rounded p-6 text-center">
                  <div className="text-gray-400 mb-4">Extension Preview</div>
                  <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400 text-red-400 px-4 py-2 rounded-lg">
                    <Shield className="w-4 h-4" />
                    <span className="font-mono text-sm">Suspicious Link Detected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}