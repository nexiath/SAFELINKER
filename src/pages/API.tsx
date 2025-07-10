import React from 'react';
import { Code, Key, Zap, Shield, Copy } from 'lucide-react';

interface APIProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    title: 'SafeLinker API',
    subtitle: 'Integrate advanced URL threat detection into your applications',
    description: 'RESTful API with comprehensive documentation and SDKs for popular programming languages',
    getStarted: 'Get API Key',
    documentation: 'View Documentation',
    features: [
      'Real-time URL scanning',
      'Batch processing support',
      'Webhook notifications',
      'Rate limiting protection',
      'Comprehensive error handling',
      'Multiple response formats'
    ],
    endpoints: {
      title: 'API Endpoints',
      scan: {
        title: 'Scan URL',
        description: 'Analyze a single URL for threats and redirections'
      },
      batch: {
        title: 'Batch Scan',
        description: 'Process multiple URLs in a single request'
      },
      status: {
        title: 'Scan Status',
        description: 'Check the status of an ongoing scan operation'
      }
    },
    example: {
      title: 'Quick Start Example',
      description: 'Get started with the SafeLinker API in minutes'
    }
  },
  fr: {
    title: 'API SafeLinker',
    subtitle: 'Intégrez la détection avancée de menaces URL dans vos applications',
    description: 'API RESTful avec documentation complète et SDKs pour les langages de programmation populaires',
    getStarted: 'Obtenir Clé API',
    documentation: 'Voir Documentation',
    features: [
      'Scan URL temps réel',
      'Support traitement par lots',
      'Notifications webhook',
      'Protection limitation débit',
      'Gestion erreurs complète',
      'Formats réponse multiples'
    ],
    endpoints: {
      title: 'Points de Terminaison API',
      scan: {
        title: 'Scanner URL',
        description: 'Analyser une URL unique pour menaces et redirections'
      },
      batch: {
        title: 'Scan par Lots',
        description: 'Traiter plusieurs URLs en une seule requête'
      },
      status: {
        title: 'Statut Scan',
        description: 'Vérifier le statut d\'une opération de scan en cours'
      }
    },
    example: {
      title: 'Exemple Démarrage Rapide',
      description: 'Commencez avec l\'API SafeLinker en quelques minutes'
    }
  }
};

export default function API({ language }: APIProps) {
  const t = translations[language];

  const codeExample = `curl -X POST https://api.safelinker.com/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://suspicious-domain.example/path",
    "options": {
      "follow_redirects": true,
      "max_depth": 10,
      "timeout": 30
    }
  }'`;

  const responseExample = `{
  "scan_id": "scan_abc123",
  "status": "completed",
  "url": "https://suspicious-domain.example/path",
  "risk_score": 75,
  "risk_level": "caution",
  "redirect_chain": [
    "https://suspicious-domain.example/path",
    "https://tracker.ads.com/click?id=xyz",
    "https://final-destination.com"
  ],
  "threats": [
    "behavioral_tracking",
    "cross_domain_leakage"
  ],
  "scan_time": 2.3,
  "timestamp": "2024-01-15T10:30:00Z"
}`;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-gray-300 mb-4">{t.subtitle}</p>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">{t.description}</p>
          
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 transform hover:-translate-y-1">
              <Key className="w-5 h-5 inline mr-2" />
              {t.getStarted}
            </button>
            <button className="px-8 py-4 border-2 border-gray-600 rounded-xl text-gray-300 font-bold hover:border-gray-500 hover:text-white transition-all duration-300">
              <Code className="w-5 h-5 inline mr-2" />
              {t.documentation}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {t.features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-mono">{feature}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* API Endpoints */}
        <div className="relative group mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
          <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
            <h2 className="text-3xl font-bold mb-8 text-white">{t.endpoints.title}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-cyan-400 pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-mono">POST</span>
                  <code className="text-white font-mono">/v1/scan</code>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.endpoints.scan.title}</h3>
                <p className="text-gray-300">{t.endpoints.scan.description}</p>
              </div>
              
              <div className="border-l-4 border-emerald-400 pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-mono">POST</span>
                  <code className="text-white font-mono">/v1/batch</code>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.endpoints.batch.title}</h3>
                <p className="text-gray-300">{t.endpoints.batch.description}</p>
              </div>
              
              <div className="border-l-4 border-purple-400 pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-mono">GET</span>
                  <code className="text-white font-mono">/v1/scan/{'{id}'}</code>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.endpoints.status.title}</h3>
                <p className="text-gray-300">{t.endpoints.status.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">{t.example.title}</h3>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-gray-300" />
                </button>
              </div>
              <p className="text-gray-300 mb-6">{t.example.description}</p>
              <div className="bg-black/60 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Response</h3>
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-gray-300" />
                </button>
              </div>
              <div className="bg-black/60 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{responseExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}