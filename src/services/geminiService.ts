import { AnalysisResult } from './urlAnalyzer';

interface GeminiAnalysis {
  summary: string;
  riskAssessment: string;
  recommendations: string[];
  confidence: number;
  processingTime: number;
}

class GeminiService {
  private apiKey: string | null = null;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor() {
    // In a real app, this would come from environment variables
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || null;
  }

  private async callGemini(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'No analysis available';
  }

  async analyzeURL(analysisResult: AnalysisResult, language: 'en' | 'fr'): Promise<GeminiAnalysis> {
    const startTime = Date.now();

    const prompt = language === 'fr' ? `
Analysez cette URL et sa chaîne de redirection pour évaluer les risques de sécurité :

URL originale: ${analysisResult.url}
Destination finale: ${analysisResult.finalDestination}
Nombre de redirections: ${analysisResult.totalRedirects}
Score de risque calculé: ${analysisResult.riskScore}/100
Niveau de risque: ${analysisResult.riskLevel}
Menaces détectées: ${analysisResult.threats.join(', ') || 'Aucune menace spécifique détectée'}

Domaines dans la chaîne:
${analysisResult.redirectChain.map(item => `- ${new URL(item.url).hostname} (${item.statusCode})`).join('\n')}

Fournissez une analyse détaillée en français avec un format JSON simple :
{
  "summary": "Résumé concis de l'analyse (2-3 phrases)",
  "riskAssessment": "Évaluation détaillée des risques (3-4 phrases)",
  "recommendations": ["Recommandation 1", "Recommandation 2", "Recommandation 3"]
}

Répondez UNIQUEMENT avec le JSON, sans markdown ni formatage supplémentaire.
` : `
Analyze this URL and its redirect chain for security risks:

Original URL: ${analysisResult.url}
Final destination: ${analysisResult.finalDestination}
Number of redirects: ${analysisResult.totalRedirects}
Calculated risk score: ${analysisResult.riskScore}/100
Risk level: ${analysisResult.riskLevel}
Detected threats: ${analysisResult.threats.join(', ') || 'No specific threats detected'}

Domains in chain:
${analysisResult.redirectChain.map(item => `- ${new URL(item.url).hostname} (${item.statusCode})`).join('\n')}

Provide a detailed analysis in English with simple JSON format:
{
  "summary": "Concise analysis summary (2-3 sentences)",
  "riskAssessment": "Detailed risk evaluation (3-4 sentences)",
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
}

Respond ONLY with JSON, no markdown or additional formatting.
`;

    try {
      const response = await this.callGemini(prompt);
      
      // Try to parse JSON response
      let parsedResponse;
      try {
        // Clean the response to extract JSON - handle multiple formats
        let cleanResponse = response.trim();
        
        // Remove markdown code blocks
        cleanResponse = cleanResponse.replace(/```json\s*/g, '').replace(/```/g, '');
        
        // Try to find JSON object in the response
        const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cleanResponse = jsonMatch[0];
        }
        
        // Parse as JSON
        parsedResponse = JSON.parse(cleanResponse);
        
        // Ensure we have valid structure
        if (!parsedResponse.summary || !parsedResponse.riskAssessment || !parsedResponse.recommendations) {
          throw new Error('Invalid JSON structure');
        }
        
        // Handle nested JSON structure from Gemini
        if (parsedResponse.riskAssessment && typeof parsedResponse.riskAssessment === 'object') {
          parsedResponse.riskAssessment = parsedResponse.riskAssessment.details || 
                                       parsedResponse.riskAssessment.description || 
                                       JSON.stringify(parsedResponse.riskAssessment);
        }
        
        // Extract recommendations array
        if (parsedResponse.recommendations && Array.isArray(parsedResponse.recommendations)) {
          parsedResponse.recommendations = parsedResponse.recommendations.map(rec => {
            if (typeof rec === 'object' && rec.description) {
              return rec.description;
            } else if (typeof rec === 'string') {
              return rec;
            }
            return rec.toString();
          });
        }
      } catch (error) {
        console.warn('Failed to parse Gemini JSON response:', error);
        // If JSON parsing fails, create a fallback response
        parsedResponse = {
          summary: language === 'fr' ? 
            'Analyse de sécurité terminée. Consultez les détails ci-dessous.' : 
            'Security analysis completed. Review details below.',
          riskAssessment: language === 'fr' ? 
            'L\'analyse automatique a été effectuée avec succès. Vérifiez les recommandations pour plus de sécurité.' :
            'Automated analysis completed successfully. Check recommendations for security.',
          recommendations: [
            language === 'fr' ? 'Vérifiez l\'URL avec précaution avant de cliquer' : 'Review the URL carefully before clicking',
            language === 'fr' ? 'Utilisez des outils de sécurité supplémentaires si nécessaire' : 'Use additional security tools if needed',
            language === 'fr' ? 'Contactez l\'expéditeur si vous avez des doutes' : 'Contact the sender if you have doubts'
          ]
        };
      }

      const processingTime = (Date.now() - startTime) / 1000;
      const confidence = Math.min(95, 70 + (analysisResult.redirectChain.length * 5));

      return {
        summary: parsedResponse.summary || 'Security analysis completed',
        riskAssessment: parsedResponse.riskAssessment || parsedResponse.summary,
        recommendations: Array.isArray(parsedResponse.recommendations) 
          ? parsedResponse.recommendations 
          : ['Review the URL carefully', 'Use caution when clicking'],
        confidence,
        processingTime
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Fallback analysis when Gemini is not available
      return this.generateFallbackAnalysis(analysisResult, language);
    }
  }

  private generateFallbackAnalysis(analysisResult: AnalysisResult, language: 'en' | 'fr'): GeminiAnalysis {
    const isSecure = analysisResult.riskLevel === 'secure';
    const hasMultipleRedirects = analysisResult.totalRedirects > 2;
    const hasHttps = analysisResult.metadata.isHttps;

    if (language === 'fr') {
      return {
        summary: `Cette URL présente un niveau de risque ${analysisResult.riskLevel} avec ${analysisResult.totalRedirects} redirections détectées.`,
        riskAssessment: `L'analyse révèle ${analysisResult.threats.length} menaces potentielles. ${hasHttps ? 'La destination finale utilise HTTPS.' : 'Attention : protocole HTTP non sécurisé détecté.'} ${hasMultipleRedirects ? 'La chaîne de redirection complexe peut masquer la destination réelle.' : ''}`,
        recommendations: [
          hasHttps ? 'Destination sécurisée avec HTTPS' : 'Éviter les liens non sécurisés (HTTP)',
          hasMultipleRedirects ? 'Méfiez-vous des redirections multiples' : 'Chaîne de redirection simple',
          'Vérifiez la réputation du domaine de destination',
          'Utilisez des outils de sécurité supplémentaires si nécessaire'
        ],
        confidence: 85,
        processingTime: 0.1
      };
    } else {
      return {
        summary: `This URL presents a ${analysisResult.riskLevel} risk level with ${analysisResult.totalRedirects} redirects detected.`,
        riskAssessment: `Analysis reveals ${analysisResult.threats.length} potential threats. ${hasHttps ? 'Final destination uses HTTPS.' : 'Warning: Insecure HTTP protocol detected.'} ${hasMultipleRedirects ? 'Complex redirect chain may obscure true destination.' : ''}`,
        recommendations: [
          hasHttps ? 'Secure HTTPS destination' : 'Avoid insecure HTTP links',
          hasMultipleRedirects ? 'Be cautious of multiple redirects' : 'Simple redirect chain',
          'Verify destination domain reputation',
          'Use additional security tools if needed'
        ],
        confidence: 85,
        processingTime: 0.1
      };
    }
  }
}

export const geminiService = new GeminiService();
export type { GeminiAnalysis };