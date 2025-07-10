import React from 'react';
import { Check, Zap, Shield, Crown, ArrowRight } from 'lucide-react';

interface PricingProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    title: 'Simple, Transparent Pricing',
    subtitle: 'Choose the perfect plan for your security needs',
    monthly: 'Monthly',
    annually: 'Annually',
    save: 'Save 20%',
    getStarted: 'Get Started',
    contactSales: 'Contact Sales',
    mostPopular: 'Most Popular',
    plans: [
      {
        name: 'Starter',
        price: { monthly: 29, annually: 23 },
        description: 'Perfect for individuals and small teams',
        icon: <Zap className="w-6 h-6" />,
        features: [
          '1,000 URL scans/month',
          'Basic threat detection',
          'Email support',
          'Standard reports',
          'API access (100 calls/day)'
        ]
      },
      {
        name: 'Professional',
        price: { monthly: 99, annually: 79 },
        description: 'Advanced security for growing businesses',
        icon: <Shield className="w-6 h-6" />,
        popular: true,
        features: [
          '10,000 URL scans/month',
          'Advanced AI analysis',
          'Priority support',
          'Custom reports',
          'API access (1,000 calls/day)',
          'Team collaboration',
          'Webhook integrations'
        ]
      },
      {
        name: 'Enterprise',
        price: { monthly: 299, annually: 239 },
        description: 'Complete security solution for large organizations',
        icon: <Crown className="w-6 h-6" />,
        features: [
          'Unlimited URL scans',
          'Real-time threat intelligence',
          '24/7 dedicated support',
          'White-label reports',
          'Unlimited API access',
          'SSO integration',
          'Custom integrations',
          'SLA guarantee'
        ]
      }
    ],
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What happens if I exceed my scan limit?',
          answer: 'You can upgrade your plan anytime or purchase additional scans. We\'ll notify you before you reach your limit.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees.'
        },
        {
          question: 'Do you offer custom enterprise solutions?',
          answer: 'Yes, we offer custom solutions for large enterprises with specific requirements. Contact our sales team.'
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes, all plans come with a 14-day free trial. No credit card required to start.'
        }
      ]
    }
  },
  fr: {
    title: 'Tarification Simple et Transparente',
    subtitle: 'Choisissez le plan parfait pour vos besoins de sécurité',
    monthly: 'Mensuel',
    annually: 'Annuel',
    save: 'Économisez 20%',
    getStarted: 'Commencer',
    contactSales: 'Contacter les Ventes',
    mostPopular: 'Plus Populaire',
    plans: [
      {
        name: 'Starter',
        price: { monthly: 29, annually: 23 },
        description: 'Parfait pour les particuliers et petites équipes',
        icon: <Zap className="w-6 h-6" />,
        features: [
          '1 000 scans URL/mois',
          'Détection de menaces basique',
          'Support par email',
          'Rapports standards',
          'Accès API (100 appels/jour)'
        ]
      },
      {
        name: 'Professionnel',
        price: { monthly: 99, annually: 79 },
        description: 'Sécurité avancée pour entreprises en croissance',
        icon: <Shield className="w-6 h-6" />,
        popular: true,
        features: [
          '10 000 scans URL/mois',
          'Analyse IA avancée',
          'Support prioritaire',
          'Rapports personnalisés',
          'Accès API (1 000 appels/jour)',
          'Collaboration équipe',
          'Intégrations webhook'
        ]
      },
      {
        name: 'Entreprise',
        price: { monthly: 299, annually: 239 },
        description: 'Solution sécurité complète pour grandes organisations',
        icon: <Crown className="w-6 h-6" />,
        features: [
          'Scans URL illimités',
          'Intelligence menaces temps réel',
          'Support dédié 24/7',
          'Rapports marque blanche',
          'Accès API illimité',
          'Intégration SSO',
          'Intégrations personnalisées',
          'Garantie SLA'
        ]
      }
    ],
    faq: {
      title: 'Questions Fréquemment Posées',
      items: [
        {
          question: 'Que se passe-t-il si je dépasse ma limite de scans ?',
          answer: 'Vous pouvez mettre à niveau votre plan à tout moment ou acheter des scans supplémentaires. Nous vous préviendrons avant d\'atteindre votre limite.'
        },
        {
          question: 'Puis-je annuler mon abonnement à tout moment ?',
          answer: 'Oui, vous pouvez annuler votre abonnement à tout moment. Aucun contrat à long terme ou frais d\'annulation.'
        },
        {
          question: 'Proposez-vous des solutions entreprise personnalisées ?',
          answer: 'Oui, nous proposons des solutions personnalisées pour les grandes entreprises avec des exigences spécifiques. Contactez notre équipe commerciale.'
        },
        {
          question: 'Y a-t-il un essai gratuit disponible ?',
          answer: 'Oui, tous les plans incluent un essai gratuit de 14 jours. Aucune carte de crédit requise pour commencer.'
        }
      ]
    }
  }
};

export default function Pricing({ language }: PricingProps) {
  const [isAnnual, setIsAnnual] = React.useState(false);
  const t = translations[language];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-gray-300">{t.subtitle}</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`font-mono ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
            {t.monthly}
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-16 h-8 bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none"
          >
            <div className={`absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-8' : ''}`} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`font-mono ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              {t.annually}
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs font-mono">
              {t.save}
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.plans.map((plan, index) => (
            <div key={index} className="relative group">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black px-4 py-1 rounded-full text-xs font-bold">
                  {t.mostPopular}
                </div>
              )}
              <div className={`absolute -inset-1 bg-gradient-to-r ${plan.popular ? 'from-cyan-400 to-emerald-400' : 'from-gray-600 to-gray-700'} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300`} />
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 ${plan.popular ? 'bg-gradient-to-br from-cyan-400 to-emerald-400' : 'bg-gray-700'} rounded-xl flex items-center justify-center text-black`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">
                      ${isAnnual ? plan.price.annually : plan.price.monthly}
                    </span>
                    <span className="text-gray-400 font-mono">/month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-emerald-400 font-mono mt-1">
                      ${plan.price.monthly * 12 - plan.price.annually * 12} saved annually
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-black hover:shadow-lg hover:shadow-cyan-400/25 transform hover:-translate-y-1'
                    : 'border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
                }`}>
                  {index === 2 ? t.contactSales : t.getStarted}
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">{t.faq.title}</h2>
          <div className="space-y-6">
            {t.faq.items.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
                  <h3 className="text-xl font-bold text-white mb-4">{item.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}