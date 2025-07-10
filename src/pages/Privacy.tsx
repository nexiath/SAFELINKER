import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, Globe } from 'lucide-react';

interface PrivacyProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'Your privacy is our priority',
    lastUpdated: 'Last updated: January 15, 2024',
    sections: [
      {
        title: 'Information We Collect',
        icon: <Database className="w-6 h-6" />,
        content: 'We collect only the minimum information necessary to provide our URL scanning service. This includes URLs you submit for analysis, basic usage analytics, and account information if you create an account.'
      },
      {
        title: 'How We Use Your Information',
        icon: <Eye className="w-6 h-6" />,
        content: 'Your information is used solely to provide and improve our threat detection services. We analyze URLs to identify security threats and provide you with safety reports. We do not sell or share your personal data with third parties.'
      },
      {
        title: 'Data Security',
        icon: <Lock className="w-6 h-6" />,
        content: 'We implement industry-standard security measures including encryption in transit and at rest, regular security audits, and strict access controls. All data is processed in secure, SOC 2 compliant facilities.'
      },
      {
        title: 'Data Retention',
        icon: <Shield className="w-6 h-6" />,
        content: 'Scan results are retained for 30 days for performance optimization and threat intelligence. Account data is retained until you delete your account. You can request data deletion at any time.'
      },
      {
        title: 'Your Rights',
        icon: <UserCheck className="w-6 h-6" />,
        content: 'You have the right to access, modify, or delete your personal data. You can export your data, opt out of analytics, and control how your information is used through your account settings.'
      },
      {
        title: 'International Transfers',
        icon: <Globe className="w-6 h-6" />,
        content: 'Data may be processed in multiple regions to ensure optimal performance. All international transfers comply with GDPR and other applicable privacy regulations through appropriate safeguards.'
      }
    ]
  },
  fr: {
    title: 'Politique de Confidentialité',
    subtitle: 'Votre confidentialité est notre priorité',
    lastUpdated: 'Dernière mise à jour : 15 janvier 2024',
    sections: [
      {
        title: 'Informations que Nous Collectons',
        icon: <Database className="w-6 h-6" />,
        content: 'Nous collectons uniquement les informations minimales nécessaires pour fournir notre service de scan d\'URL. Cela inclut les URLs que vous soumettez pour analyse, des analyses d\'usage basiques, et les informations de compte si vous créez un compte.'
      },
      {
        title: 'Comment Nous Utilisons Vos Informations',
        icon: <Eye className="w-6 h-6" />,
        content: 'Vos informations sont utilisées uniquement pour fournir et améliorer nos services de détection de menaces. Nous analysons les URLs pour identifier les menaces de sécurité et vous fournir des rapports de sécurité. Nous ne vendons ni ne partageons vos données personnelles avec des tiers.'
      },
      {
        title: 'Sécurité des Données',
        icon: <Lock className="w-6 h-6" />,
        content: 'Nous implémentons des mesures de sécurité standard de l\'industrie incluant le chiffrement en transit et au repos, des audits de sécurité réguliers, et des contrôles d\'accès stricts. Toutes les données sont traitées dans des installations sécurisées conformes SOC 2.'
      },
      {
        title: 'Rétention des Données',
        icon: <Shield className="w-6 h-6" />,
        content: 'Les résultats de scan sont conservés 30 jours pour l\'optimisation des performances et l\'intelligence des menaces. Les données de compte sont conservées jusqu\'à ce que vous supprimiez votre compte. Vous pouvez demander la suppression des données à tout moment.'
      },
      {
        title: 'Vos Droits',
        icon: <UserCheck className="w-6 h-6" />,
        content: 'Vous avez le droit d\'accéder, modifier ou supprimer vos données personnelles. Vous pouvez exporter vos données, vous désinscrire des analyses, et contrôler comment vos informations sont utilisées via les paramètres de votre compte.'
      },
      {
        title: 'Transferts Internationaux',
        icon: <Globe className="w-6 h-6" />,
        content: 'Les données peuvent être traitées dans plusieurs régions pour assurer des performances optimales. Tous les transferts internationaux respectent le RGPD et autres réglementations de confidentialité applicables via des garanties appropriées.'
      }
    ]
  }
};

export default function Privacy({ language }: PrivacyProps) {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 mb-4">{t.subtitle}</p>
            <p className="text-gray-500 font-mono text-sm">{t.lastUpdated}</p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center text-black">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">{section.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-16 text-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Questions about Privacy?</h3>
                <p className="text-gray-300 mb-6">
                  If you have any questions about this privacy policy or how we handle your data, please contact us.
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/25 transform hover:-translate-y-1">
                  Contact Privacy Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}