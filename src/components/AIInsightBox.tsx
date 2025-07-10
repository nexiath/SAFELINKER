import React, { useState } from 'react';
import { Brain, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import { geminiService, GeminiAnalysis } from '../services/geminiService';
import { AnalysisResult } from '../services/urlAnalyzer';

interface AIInsightBoxProps {
  scanResult: AnalysisResult;
  language: 'en' | 'fr';
  initialAnalysis?: GeminiAnalysis | null;
  onAnalysisComplete?: (analysis: GeminiAnalysis) => void;
}

const translations = {
  en: {
    title: 'AI SECURITY ANALYSIS',
    analyzing: 'AI analyzing...',
    analyze: 'Analyze with AI',
    summary: 'Summary',
    riskAssessment: 'Risk Assessment',
    recommendations: 'Recommendations',
    confidence: 'CONFIDENCE',
    aiTime: 'AI TIME',
    depth: 'DEPTH',
    error: 'Analysis failed',
    clickToAnalyze: 'Click "Analyze with AI" to get detailed security insights'
  },
  fr: {
    title: 'ANALYSE SÉCURITÉ IA',
    analyzing: 'IA en cours d\'analyse...',
    analyze: 'Analyser avec IA',
    summary: 'Résumé',
    riskAssessment: 'Évaluation des Risques',
    recommendations: 'Recommandations',
    confidence: 'CONFIANCE',
    aiTime: 'TEMPS IA',
    depth: 'PROFONDEUR',
    error: 'Échec de l\'analyse',
    clickToAnalyze: 'Cliquez sur "Analyser avec IA" pour obtenir des informations détaillées'
  }
};

export default function AIInsightBox({ scanResult, language, initialAnalysis, onAnalysisComplete }: AIInsightBoxProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(initialAnalysis || null);
  const [error, setError] = useState<string | null>(null);
  const t = translations[language];
  
  // Update analysis when initialAnalysis changes
  React.useEffect(() => {
    if (initialAnalysis && !analysis) {
      setAnalysis(initialAnalysis);
    }
  }, [initialAnalysis, analysis]);

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await geminiService.analyzeURL(scanResult, language);
      setAnalysis(result);
      onAnalysisComplete?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      console.error('AI Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="w-6 h-6 text-purple-400" />
              {isAnalyzing && (
                <div className="absolute -inset-1 bg-purple-400/20 rounded-full animate-ping" />
              )}
            </div>
            <h3 className="font-mono text-sm text-purple-400 tracking-widest">{t.title}</h3>
          </div>
          <button
            onClick={runAIAnalysis}
            disabled={isAnalyzing}
            className="group flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-400 text-purple-400 rounded-lg font-mono text-sm hover:bg-purple-500/30 transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isAnalyzing ? t.analyzing : t.analyze}
          </button>
        </div>

        {isAnalyzing && (
          <div className="flex items-center gap-3 text-purple-400">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <span className="font-mono text-sm">{t.analyzing}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-mono text-sm mb-2">{t.error}</p>
                <p className="text-gray-400 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {analysis && !isAnalyzing && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-400/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-mono text-sm text-purple-400 mb-2 tracking-widest">{t.summary}</h4>
                  <p className="text-gray-300 leading-relaxed">{analysis.summary}</p>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-mono text-sm text-orange-400 mb-2 tracking-widest">{t.riskAssessment}</h4>
                  <p className="text-gray-300 leading-relaxed">{analysis.riskAssessment}</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-400/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-mono text-sm text-cyan-400 mb-3 tracking-widest">{t.recommendations}</h4>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-purple-500/10 rounded-lg p-3">
                <div className="text-lg font-bold text-purple-400">{analysis.confidence}%</div>
                <div className="text-xs text-gray-400 font-mono">{t.confidence}</div>
              </div>
              <div className="bg-indigo-500/10 rounded-lg p-3">
                <div className="text-lg font-bold text-indigo-400">{analysis.processingTime.toFixed(1)}s</div>
                <div className="text-xs text-gray-400 font-mono">{t.aiTime}</div>
              </div>
              <div className="bg-violet-500/10 rounded-lg p-3">
                <div className="text-lg font-bold text-violet-400">{scanResult.redirectChain.length}</div>
                <div className="text-xs text-gray-400 font-mono">{t.depth}</div>
              </div>
            </div>

          </div>
        )}

        {!analysis && !isAnalyzing && !error && (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 font-mono text-sm">
              {t.clickToAnalyze}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}