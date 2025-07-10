import React, { useState, useEffect } from 'react';
import { 
  Hexagon, 
  Triangle, 
  Circle, 
  Square,
  ArrowUpRight,
  Dot,
  Shield,
  Chrome,
  X,
  History,
  BarChart3
} from 'lucide-react';
import AIInsightBox from '../components/AIInsightBox';
import RiskScoreGauge from '../components/RiskScoreGauge';
import ScanHistory from '../components/ScanHistory';
import { AnalysisResult } from '../services/urlAnalyzer';
import { historyService, ScanHistoryItem } from '../services/historyService';
import { GeminiAnalysis } from '../services/geminiService';


type Language = 'en' | 'fr';

const translations = {
  en: {
    title: 'SAFELINKER',
    subtitle: 'NEURAL THREAT DETECTION',
    description: 'Quantum analysis of malicious redirections • Advanced behavioral detection • Predictive artificial intelligence',
    targetUrl: 'TARGET URL',
    placeholder: 'https://suspicious-domain.example/path',
    analyzeUrl: 'ANALYZE URL',
    scanning: 'SCANNING...',
    chromeExtension: 'USE CHROME EXTENSION',
    comingSoon: 'COMING SOON',
    neuralProcessing: 'NEURAL PROCESSING',
    riskScore: 'RISK SCORE',
    scanTime: 'Scan Time',
    redirects: 'Redirects',
    chainNodes: 'Chain Nodes',
    threatsDetected: 'THREATS DETECTED',
    networkTopology: 'Network Topology',
    hideDetails: 'Hide Details',
    showDetails: 'Show Details',
    export: 'Export',
    deepAnalysisMatrix: 'Deep Analysis Matrix',
    technicalVectors: 'TECHNICAL VECTORS',
    securityFlags: 'SECURITY FLAGS',
    finalVector: 'Final Vector:',
    protocolStatus: 'Protocol Status:',
    certificate: 'Certificate:',
    encryption: 'Encryption:',
    secure: 'SECURE',
    validated: 'VALIDATED',
    httpsActive: 'HTTPS Protocol Active',
    behavioralTracking: 'Behavioral Tracking Detected',
    multipleRedirect: 'Multiple Redirect Chain',
    crossDomainLeakage: 'Cross-Domain Data Leakage',
    clearAnalysis: 'New analysis'
  },
  fr: {
    title: 'SAFELINKER',
    subtitle: 'DÉTECTION NEURALE DE MENACES',
    description: 'Analyse quantique des redirections malveillantes • Détection comportementale avancée • Intelligence artificielle prédictive',
    targetUrl: 'URL CIBLE',
    placeholder: 'https://domaine-suspect.exemple/chemin',
    analyzeUrl: 'ANALYSER URL',
    scanning: 'ANALYSE...',
    chromeExtension: 'UTILISER L\'EXTENSION CHROME',
    comingSoon: 'BIENTÔT DISPONIBLE',
    neuralProcessing: 'TRAITEMENT NEURONAL',
    riskScore: 'SCORE DE RISQUE',
    scanTime: 'Temps d\'analyse',
    redirects: 'Redirections',
    chainNodes: 'Nœuds de chaîne',
    threatsDetected: 'MENACES DÉTECTÉES',
    networkTopology: 'Topologie Réseau',
    hideDetails: 'Masquer Détails',
    showDetails: 'Afficher Détails',
    export: 'Exporter',
    deepAnalysisMatrix: 'Matrice d\'Analyse Approfondie',
    technicalVectors: 'VECTEURS TECHNIQUES',
    securityFlags: 'INDICATEURS SÉCURITÉ',
    finalVector: 'Vecteur final :',
    protocolStatus: 'Statut protocole :',
    certificate: 'Certificat :',
    encryption: 'Chiffrement :',
    secure: 'SÉCURISÉ',
    validated: 'VALIDÉ',
    httpsActive: 'Protocole HTTPS Actif',
    behavioralTracking: 'Suivi Comportemental Détecté',
    multipleRedirect: 'Chaîne de Redirections Multiples',
    crossDomainLeakage: 'Fuite de Données Inter-Domaines',
    clearAnalysis: 'Nouvelle analyse'
  }
};

interface HomePageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function HomePage({ language, setLanguage }: HomePageProps) {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<AnalysisResult | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [currentScanId, setCurrentScanId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<GeminiAnalysis | null>(null);

  const t = translations[language];

  const clearAnalysis = () => {
    setScanResult(null);
    setUrl('');
    setShowMatrix(false);
    setActiveNode(null);
    setCurrentScanId(null);
    setAiAnalysis(null);
  };

  const handleScanFromHistory = (historyItem: ScanHistoryItem) => {
    setScanResult(historyItem.analysisResult);
    setUrl(historyItem.url);
    setCurrentScanId(historyItem.id);
    setAiAnalysis(historyItem.aiAnalysis || null);
    setShowHistory(false);
    setShowMatrix(false);
    setActiveNode(null);
  };

  const handleAiAnalysisComplete = (analysis: GeminiAnalysis) => {
    setAiAnalysis(analysis);
    if (currentScanId) {
      historyService.updateAiAnalysis(currentScanId, analysis);
    }
  };

  const analyzeURL = async () => {
    if (!url) return;
    
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);

    // Simulate progress updates
    const progressSteps = [15, 32, 48, 67, 84, 95, 100];
    let stepIndex = 0;
    
    const progressInterval = setInterval(() => {
      if (stepIndex < progressSteps.length) {
        setScanProgress(progressSteps[stepIndex]);
        stepIndex++;
      } else {
        clearInterval(progressInterval);
      }
    }, 400);

    try {
      const { urlAnalyzer } = await import('../services/urlAnalyzer');
      const result = await urlAnalyzer.analyzeURL(url);
      
      clearInterval(progressInterval);
      setScanProgress(100);
      setScanResult(result);
      setIsScanning(false);
      
      // Save to history
      const scanId = historyService.saveScan(result);
      setCurrentScanId(scanId);
    } catch (error) {
      clearInterval(progressInterval);
      setIsScanning(false);
      console.error('URL analysis failed:', error);
      
      // Show error to user
      alert(language === 'fr' 
        ? `Erreur lors de l'analyse: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
        : `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const getRiskGradient = (level: string) => {
    switch (level) {
      case 'secure': return 'from-emerald-400 via-teal-300 to-cyan-400';
      case 'caution': return 'from-amber-400 via-orange-300 to-yellow-400';
      case 'danger': return 'from-red-400 via-pink-300 to-rose-400';
      case 'critical': return 'from-purple-500 via-red-500 to-pink-500';
      default: return 'from-gray-400 via-slate-300 to-gray-400';
    }
  };

  const getNodeShape = (type: string) => {
    switch (type) {
      case 'origin': return <Circle className="w-4 h-4" />;
      case 'redirect': return <Triangle className="w-4 h-4" />;
      case 'destination': return <Square className="w-4 h-4" />;
      case 'tracker': return <Hexagon className="w-4 h-4" />;
      default: return <Dot className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Floating Geometric Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
          </div>
        ))}
      </div>


      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Revolutionary Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-emerald-400 to-teal-300 rounded-none transform rotate-45 animate-spin-slow" />
              <div className="absolute inset-2 bg-black rounded-none transform -rotate-45" />
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-none" />
            </div>
            <div className="text-left">
              <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent transform -skew-x-6">
                {t.title}
              </h1>
              <div className="text-xs font-mono text-cyan-400 tracking-widest mt-1 transform skew-x-3">
                {t.subtitle}
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto font-light leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Ultra Modern Scanner Interface */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {/* Floating Input Container */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
                
                {/* Modern Input Field */}
                <div className="relative mb-6">
                  <div className="absolute -top-3 left-6 px-3 bg-gray-900 text-xs font-mono text-cyan-400 tracking-widest">
                    {t.targetUrl}
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-full px-6 py-4 bg-transparent border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all duration-300 text-lg font-mono hover:border-gray-600"
                    disabled={isScanning}
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-emerald-400/10 to-teal-400/10 rounded-xl animate-pulse" />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={analyzeURL}
                    disabled={isScanning || !url}
                    className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      <span className="font-mono tracking-wider">
                        {isScanning ? t.scanning : t.analyzeUrl}
                      </span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="group relative px-6 py-4 border-2 border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl text-purple-400 hover:text-purple-300 border-purple-400 hover:border-purple-300 font-mono transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3">
                      <History className="w-5 h-5" />
                      <div className="text-left">
                        <div className="text-sm">{language === 'fr' ? 'Historique' : 'History'}</div>
                        <div className="text-xs text-purple-300">{historyService.getStats().totalScans} analyses</div>
                      </div>
                    </div>
                  </button>
                  
                  <button 
                    disabled
                    className="group relative px-6 py-4 border-2 border-gray-600 rounded-xl text-gray-500 font-mono cursor-not-allowed transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Chrome className="w-5 h-5" />
                      <div className="text-left">
                        <div className="text-sm">{t.chromeExtension}</div>
                        <div className="text-xs text-gray-600">{t.comingSoon}</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Ultra Modern Progress */}
                {isScanning && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-mono text-cyan-400 tracking-widest">{t.neuralProcessing}</span>
                      <span className="text-xs font-mono text-gray-400">{scanProgress}%</span>
                    </div>
                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${scanProgress}%` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="max-w-4xl mx-auto mb-8">
            <ScanHistory 
              language={language} 
              onScanSelect={handleScanFromHistory}
            />
          </div>
        )}

        {/* Revolutionary Results Display */}
        {scanResult && (
          <div className="space-y-8">
            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="group flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400 hover:border-purple-300 rounded-xl text-purple-400 hover:text-purple-300 transition-all duration-300"
                title={language === 'fr' ? 'Voir l\'historique' : 'View History'}
              >
                <History className="w-4 h-4" />
                <span className="text-sm font-mono">{language === 'fr' ? 'Historique' : 'History'}</span>
              </button>
              
              <button
                onClick={clearAnalysis}
                className="group flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-gray-500 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
                title={t.clearAnalysis}
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-mono">{t.clearAnalysis}</span>
              </button>
            </div>

            {/* Threat Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Risk Score Card with Gauge */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 text-center">
                  <div className="text-xs font-mono text-gray-400 tracking-widest mb-4">{t.riskScore}</div>
                  <RiskScoreGauge
                    score={scanResult.riskScore}
                    level={scanResult.riskLevel}
                    size="md"
                    animated={true}
                  />
                </div>
              </div>

              {/* Scan Metrics Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{t.scanTime}</span>
                      <span className="font-bold text-cyan-400">{scanResult.scanTime}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{t.redirects}</span>
                      <span className="font-bold text-emerald-400">{Math.max(0, scanResult.totalRedirects)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{t.chainNodes}</span>
                      <span className="font-bold text-teal-400">{scanResult.redirectChain.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Threats Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6">
                  <div className="text-xs font-mono text-red-400 mb-4 tracking-widest">{t.threatsDetected}</div>
                  <div className="space-y-2">
                    {scanResult.threats.slice(0, 3).map((threat, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <span className="text-gray-300 truncate">{threat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insight Box */}
            <AIInsightBox 
              scanResult={scanResult} 
              language={language}
              initialAnalysis={aiAnalysis}
              onAnalysisComplete={handleAiAnalysisComplete}
            />

            {/* Network Visualization */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">{t.networkTopology}</h2>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowMatrix(!showMatrix)}
                      className="px-4 py-2 bg-purple-500/20 border border-purple-400 text-purple-400 rounded-lg font-mono text-sm hover:bg-purple-500/30 transition-colors"
                    >
                      {showMatrix ? t.hideDetails : t.showDetails}
                    </button>
                    <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-400 rounded-lg font-mono text-sm hover:bg-cyan-500/30 transition-colors">
                      {t.export}
                    </button>
                  </div>
                </div>

                {/* Interactive Network Graph */}
                <div className="relative h-64 bg-black/40 rounded-xl border border-gray-700 mb-6 overflow-hidden">
                  <svg className="w-full h-full">
                    {/* Connection Lines */}
                    {scanResult.networkNodes.map(node => 
                      node.connections.map(connectionId => {
                        const targetNode = scanResult.networkNodes.find(n => n.id === connectionId);
                        if (!targetNode) return null;
                        return (
                          <line
                            key={`${node.id}-${connectionId}`}
                            x1={`${node.position.x}%`}
                            y1={`${node.position.y}%`}
                            x2={`${targetNode.position.x}%`}
                            y2={`${targetNode.position.y}%`}
                            stroke="rgba(0,255,136,0.4)"
                            strokeWidth="2"
                            className="animate-pulse"
                          />
                        );
                      })
                    )}
                    
                    {/* Network Nodes */}
                    {scanResult.networkNodes.map(node => (
                      <g key={node.id}>
                        <circle
                          cx={`${node.position.x}%`}
                          cy={`${node.position.y}%`}
                          r="8"
                          fill={node.type === 'tracker' ? '#ef4444' : node.type === 'destination' ? '#10b981' : '#06b6d4'}
                          className="cursor-pointer hover:r-12 transition-all duration-200"
                          onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                        />
                        <text
                          x={`${node.position.x}%`}
                          y={`${node.position.y + 8}%`}
                          textAnchor="middle"
                          className="text-xs font-mono fill-white"
                        >
                          {node.type.toUpperCase()}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* URL Chain Display */}
                <div className="space-y-3">
                  {scanResult.redirectChain.map((redirectItem, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-400 text-black font-bold flex items-center justify-center rounded-lg text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg p-4 font-mono text-sm hover:border-cyan-400/50 transition-colors duration-200">
                          <div className="flex justify-between items-center">
                            <span className="truncate">{redirectItem.url}</span>
                            <span className="text-xs text-gray-400 ml-2">{redirectItem.statusCode}</span>
                          </div>
                        </div>
                        {index < scanResult.redirectChain.length - 1 && (
                          <ArrowUpRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Matrix View */}
            {showMatrix && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
                  <h2 className="text-2xl font-bold text-white mb-8">{t.deepAnalysisMatrix}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-mono text-sm text-purple-400 mb-4 tracking-widest">{t.technicalVectors}</h3>
                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                          <span className="text-gray-400">{t.finalVector}</span>
                          <span className="text-purple-400 break-all">{scanResult.finalDestination}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                          <span className="text-gray-400">{t.protocolStatus}</span>
                          <span className={scanResult.metadata.isHttps ? "text-emerald-400" : "text-red-400"}>
                            {scanResult.metadata.isHttps ? "HTTPS" : "HTTP"}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                          <span className="text-gray-400">{t.certificate}</span>
                          <span className={scanResult.metadata.hasCertificate ? "text-emerald-400" : "text-red-400"}>
                            {scanResult.metadata.hasCertificate ? t.validated : "NON VALIDÉ"}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                          <span className="text-gray-400">{t.encryption}</span>
                          <span className={scanResult.metadata.isHttps ? "text-emerald-400" : "text-red-400"}>
                            {scanResult.metadata.isHttps ? "TLS 1.3" : "AUCUN"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-mono text-sm text-red-400 mb-4 tracking-widest">{t.securityFlags}</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${scanResult.metadata.isHttps ? 'bg-emerald-400' : 'bg-red-400'}`} />
                          <span className="font-mono">{scanResult.metadata.isHttps ? t.httpsActive : "HTTP Non Sécurisé"}</span>
                        </div>
                        {scanResult.threats.includes('Tracking parameters detected') && (
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-red-400 rounded-full" />
                            <span className="font-mono">{t.behavioralTracking}</span>
                          </div>
                        )}
                        {scanResult.totalRedirects > 2 && (
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                            <span className="font-mono">{t.multipleRedirect}</span>
                          </div>
                        )}
                        {scanResult.threats.includes('Cross-domain redirections detected') && (
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-red-400 rounded-full" />
                            <span className="font-mono">{t.crossDomainLeakage}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Signature */}
      <div className="fixed bottom-4 left-4 text-xs font-mono text-gray-600 tracking-wider">
        Robin Cassard
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}