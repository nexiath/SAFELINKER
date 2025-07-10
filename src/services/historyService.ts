import { AnalysisResult } from './urlAnalyzer';
import { GeminiAnalysis } from './geminiService';

export interface ScanHistoryItem {
  id: string;
  timestamp: number;
  url: string;
  analysisResult: AnalysisResult;
  aiAnalysis?: GeminiAnalysis;
  favorite?: boolean;
}

class HistoryService {
  private readonly STORAGE_KEY = 'safelinker_scan_history';
  private readonly MAX_HISTORY_ITEMS = 50;

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  saveScan(analysisResult: AnalysisResult, aiAnalysis?: GeminiAnalysis): string {
    const scanId = this.generateId();
    const historyItem: ScanHistoryItem = {
      id: scanId,
      timestamp: Date.now(),
      url: analysisResult.url,
      analysisResult,
      aiAnalysis,
      favorite: false
    };

    const history = this.getHistory();
    history.unshift(historyItem);

    // Keep only the most recent items
    if (history.length > this.MAX_HISTORY_ITEMS) {
      history.splice(this.MAX_HISTORY_ITEMS);
    }

    this.saveHistory(history);
    return scanId;
  }

  getHistory(): ScanHistoryItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load scan history:', error);
      return [];
    }
  }

  getScanById(id: string): ScanHistoryItem | null {
    const history = this.getHistory();
    return history.find(item => item.id === id) || null;
  }

  updateAiAnalysis(scanId: string, aiAnalysis: GeminiAnalysis): void {
    const history = this.getHistory();
    const index = history.findIndex(item => item.id === scanId);
    
    if (index !== -1) {
      history[index].aiAnalysis = aiAnalysis;
      this.saveHistory(history);
    }
  }

  toggleFavorite(scanId: string): void {
    const history = this.getHistory();
    const index = history.findIndex(item => item.id === scanId);
    
    if (index !== -1) {
      history[index].favorite = !history[index].favorite;
      this.saveHistory(history);
    }
  }

  deleteScan(scanId: string): void {
    const history = this.getHistory();
    const filtered = history.filter(item => item.id !== scanId);
    this.saveHistory(filtered);
  }

  clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getStats(): {
    totalScans: number;
    riskDistribution: { secure: number; caution: number; danger: number; critical: number };
    favoriteScans: number;
  } {
    const history = this.getHistory();
    const riskDistribution = { secure: 0, caution: 0, danger: 0, critical: 0 };
    
    history.forEach(item => {
      riskDistribution[item.analysisResult.riskLevel]++;
    });

    return {
      totalScans: history.length,
      riskDistribution,
      favoriteScans: history.filter(item => item.favorite).length
    };
  }

  private saveHistory(history: ScanHistoryItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save scan history:', error);
    }
  }
}

export const historyService = new HistoryService();