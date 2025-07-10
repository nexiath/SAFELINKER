import React from 'react';
import { ArrowRight, Shield, Zap, Brain, Network, Eye, Lock } from 'lucide-react';

interface HowItWorksProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    title: 'How SafeLinker Works',
    subtitle: 'Advanced Neural Detection Technology',
    description: 'Discover the cutting-edge technology behind SafeLinker\'s threat detection system',
    steps: [
      {
        title: 'URL Ingestion',
        description: 'Our system captures and analyzes the target URL, preparing it for deep inspection through our neural pipeline.',
        icon: <Network className="w-8 h-8" />
      },
      {
        title: 'Redirection Mapping',
        description: 'We follow all redirect chains (301, 302, JavaScript, Meta Refresh) to map the complete journey path.',
        icon: <ArrowRight className="w-8 h-8" />
      },
      {
        title: 'Behavioral Analysis',
        description: 'Advanced AI algorithms analyze behavioral patterns, tracking mechanisms, and fingerprinting attempts.',
        icon: <Brain className="w-8 h-8" />
      },
      {
        title: 'Threat Scoring',
        description: 'Our neural network assigns risk scores based on 200+ security vectors and threat intelligence.',
        icon: <Shield className="w-8 h-8" />
      },
      {
        title: 'Real-time Detection',
        description: 'Lightning-fast analysis delivers results in under 3 seconds with 99.7% accuracy rate.',
        icon: <Zap className="w-8 h-8" />
      },
      {
        title: 'Security Report',
        description: 'Comprehensive reports with actionable insights and detailed threat breakdown for security teams.',
        icon: <Eye className="w-8 h-8" />
      }
    ],
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Detection Accuracy', value: '99.7%' },
        { label: 'Analysis Speed', value: '< 3s' },
        { label: 'Threat Vectors', value: '200+' },
        { label: 'Daily Scans', value: '10M+' },
        { label: 'False Positives', value: '< 0.1%' },
        { label: 'API Uptime', value: '99.99%' }
      ]
    },
    security: {
      title: 'Enterprise Security',
      description: 'Built with enterprise-grade security and compliance standards',
      features: [
        'SOC 2 Type II Certified',
        'GDPR Compliant',
        'Zero-log Policy',
        'End-to-end Encryption',
        'ISO 27001 Certified'
      ]
    }
  },
  fr: {
    title: 'Comment Fonctionne SafeLinker',
    subtitle: 'Technologie de Détection Neurale Avancée',
    description: 'Découvrez la technologie de pointe derrière le système de détection de menaces de SafeLinker',
    steps: [
      {
        title: 'Ingestion URL',
        description: 'Notre système capture et analyse l\'URL cible, la préparant pour une inspection approfondie via notre pipeline neuronal.',
        icon: <Network className="w-8 h-8" />
      },
      {
        title: 'Cartographie des Redirections',
        description: 'Nous suivons toutes les chaînes de redirection (301, 302, JavaScript, Meta Refresh) pour cartographier le parcours complet.',
        icon: <ArrowRight className="w-8 h-8" />
      },
      {
        title: 'Analyse Comportementale',
        description: 'Des algorithmes IA avancés analysent les modèles comportementaux, mécanismes de suivi et tentatives d\'empreinte.',
        icon: <Brain className="w-8 h-8" />
      },
      {
        title: 'Scoring des Menaces',
        description: 'Notre réseau neuronal attribue des scores de risque basés sur 200+ vecteurs de sécurité et intelligence des menaces.',
        icon: <Shield className="w-8 h-8" />
      },
      {
        title: 'Détection Temps Réel',
        description: 'Analyse ultra-rapide avec résultats en moins de 3 secondes et taux de précision de 99,7%.',
        icon: <Zap className="w-8 h-8" />
      },
      {
        title: 'Rapport Sécurité',
        description: 'Rapports complets avec insights actionnables et analyse détaillée des menaces pour les équipes sécurité.',
        icon: <Eye className="w-8 h-8" />
      }
    ],
    techSpecs: {
      title: 'Spécifications Techniques',
      items: [
        { label: 'Précision Détection', value: '99,7%' },
        { label: 'Vitesse Analyse', value: '< 3s' },
        { label: 'Vecteurs Menaces', value: '200+' },
        { label: 'Scans Quotidiens', value: '10M+' },
        { label: 'Faux Positifs', value: '< 0,1%' },
        { label: 'Disponibilité API', value: '99,99%' }
      ]
    },
    security: {
      title: 'Sécurité Entreprise',
      description: 'Conçu avec des standards de sécurité et conformité de niveau entreprise',
      features: [
        'Certifié SOC 2 Type II',
        'Conforme RGPD',
        'Politique Zéro-log',
        'Chiffrement Bout-en-bout',
        'Certifié ISO 27001'
      ]
    }
  }
};

export default function HowItWorks({ language }: HowItWorksProps) {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 mb-4">{t.subtitle}</p>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.description}</p>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center text-black">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="container mx-auto px-6 py-16">
        <div className="relative group mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
          <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">{t.techSpecs.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {t.techSpecs.items.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-black text-purple-400 mb-2">{item.value}</div>
                  <div className="text-sm text-gray-400 font-mono">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
          <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
            <div className="flex items-center gap-4 mb-6">
              <Lock className="w-8 h-8 text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">{t.security.title}</h2>
            </div>
            <p className="text-gray-300 mb-8">{t.security.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.security.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-emerald-500/10 rounded-lg p-4">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span className="text-gray-300 font-mono text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}