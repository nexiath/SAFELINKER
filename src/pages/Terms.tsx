import React from 'react';
import { FileText, Scale, AlertTriangle, Users, Gavel, Clock } from 'lucide-react';

interface TermsProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    title: 'Terms of Service',
    subtitle: 'Terms and conditions for using SafeLinker',
    lastUpdated: 'Last updated: January 15, 2024',
    sections: [
      {
        title: 'Acceptance of Terms',
        icon: <Scale className="w-6 h-6" />,
        content: 'By accessing and using SafeLinker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
      },
      {
        title: 'Use License',
        icon: <FileText className="w-6 h-6" />,
        content: 'Permission is granted to temporarily use SafeLinker for personal and commercial URL scanning purposes. This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.'
      },
      {
        title: 'Disclaimer',
        icon: <AlertTriangle className="w-6 h-6" />,
        content: 'The information on SafeLinker is provided on an "as is" basis. To the fullest extent permitted by law, we exclude all representations, warranties, and conditions relating to our service and the use of this website.'
      },
      {
        title: 'User Responsibilities',
        icon: <Users className="w-6 h-6" />,
        content: 'Users are responsible for ensuring their use of SafeLinker complies with applicable laws and regulations. You must not use our service for illegal activities or to scan URLs without proper authorization.'
      },
      {
        title: 'Limitation of Liability',
        icon: <Gavel className="w-6 h-6" />,
        content: 'In no event shall SafeLinker or its suppliers be liable for any damages arising out of the use or inability to use the service, even if we have been notified orally or in writing of the possibility of such damage.'
      },
      {
        title: 'Service Availability',
        icon: <Clock className="w-6 h-6" />,
        content: 'We strive to maintain high service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue the service at any time without prior notice.'
      }
    ]
  },
  fr: {
    title: 'Conditions d\'Utilisation',
    subtitle: 'Termes et conditions pour utiliser SafeLinker',
    lastUpdated: 'Dernière mise à jour : 15 janvier 2024',
    sections: [
      {
        title: 'Acceptation des Conditions',
        icon: <Scale className="w-6 h-6" />,
        content: 'En accédant et utilisant SafeLinker, vous acceptez et convenez d\'être lié par les termes et dispositions de cet accord. Si vous n\'acceptez pas de respecter ce qui précède, veuillez ne pas utiliser ce service.'
      },
      {
        title: 'Licence d\'Utilisation',
        icon: <FileText className="w-6 h-6" />,
        content: 'La permission est accordée d\'utiliser temporairement SafeLinker à des fins personnelles et commerciales de scan d\'URL. Cette licence se terminera automatiquement si vous violez ces restrictions et peut être résiliée par nous à tout moment.'
      },
      {
        title: 'Clause de Non-Responsabilité',
        icon: <AlertTriangle className="w-6 h-6" />,
        content: 'Les informations sur SafeLinker sont fournies "en l\'état". Dans toute la mesure permise par la loi, nous excluons toutes représentations, garanties et conditions relatives à notre service et à l\'utilisation de ce site web.'
      },
      {
        title: 'Responsabilités Utilisateur',
        icon: <Users className="w-6 h-6" />,
        content: 'Les utilisateurs sont responsables de s\'assurer que leur utilisation de SafeLinker respecte les lois et réglementations applicables. Vous ne devez pas utiliser notre service pour des activités illégales ou scanner des URLs sans autorisation appropriée.'
      },
      {
        title: 'Limitation de Responsabilité',
        icon: <Gavel className="w-6 h-6" />,
        content: 'En aucun cas SafeLinker ou ses fournisseurs ne seront responsables de dommages découlant de l\'utilisation ou de l\'incapacité d\'utiliser le service, même si nous avons été notifiés oralement ou par écrit de la possibilité de tels dommages.'
      },
      {
        title: 'Disponibilité du Service',
        icon: <Clock className="w-6 h-6" />,
        content: 'Nous nous efforçons de maintenir une haute disponibilité du service mais ne garantissons pas un accès ininterrompu. Nous nous réservons le droit de modifier, suspendre ou interrompre le service à tout moment sans préavis.'
      }
    ]
  }
};

export default function Terms({ language }: TermsProps) {
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
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white">
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
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Questions about Terms?</h3>
                <p className="text-gray-300 mb-6">
                  If you have any questions about these terms of service, please contact our legal team.
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 transform hover:-translate-y-1">
                  Contact Legal Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}