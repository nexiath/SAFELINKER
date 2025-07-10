import React, { useState, useEffect } from 'react';
import { 
  History, 
  Clock, 
  Star, 
  Trash2, 
  Eye, 
  Download,
  Filter,
  Search,
  X,
  Calendar,
  BarChart3
} from 'lucide-react';
import { historyService, ScanHistoryItem } from '../services/historyService';
import RiskScoreGauge from './RiskScoreGauge';

interface ScanHistoryProps {
  language: 'en' | 'fr';
  onScanSelect?: (scan: ScanHistoryItem) => void;
}

const translations = {
  en: {
    title: 'SCAN HISTORY',
    noHistory: 'No scans in history',
    searchPlaceholder: 'Search URLs...',
    filters: 'Filters',
    all: 'All',
    favorites: 'Favorites',
    secure: 'Secure',
    caution: 'Caution',
    danger: 'Danger',
    critical: 'Critical',
    clearHistory: 'Clear History',
    export: 'Export',
    view: 'View',
    toggleFavorite: 'Toggle Favorite',
    delete: 'Delete',
    stats: 'Statistics',
    totalScans: 'Total Scans',
    riskDistribution: 'Risk Distribution',
    confirmClear: 'Are you sure you want to clear all scan history?',
    ago: 'ago'
  },
  fr: {
    title: 'HISTORIQUE DES ANALYSES',
    noHistory: 'Aucune analyse dans l\'historique',
    searchPlaceholder: 'Rechercher des URLs...',
    filters: 'Filtres',
    all: 'Tout',
    favorites: 'Favoris',
    secure: 'Sécurisé',
    caution: 'Attention',
    danger: 'Danger',
    critical: 'Critique',
    clearHistory: 'Vider l\'historique',
    export: 'Exporter',
    view: 'Voir',
    toggleFavorite: 'Basculer favori',
    delete: 'Supprimer',
    stats: 'Statistiques',
    totalScans: 'Total analyses',
    riskDistribution: 'Distribution des risques',
    confirmClear: 'Êtes-vous sûr de vouloir vider tout l\'historique ?',
    ago: 'il y a'
  }
};

export default function ScanHistory({ language, onScanSelect }: ScanHistoryProps) {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<ScanHistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showStats, setShowStats] = useState(false);
  
  const t = translations[language];

  const loadHistory = () => {
    const hist = historyService.getHistory();
    setHistory(hist);
    setFilteredHistory(hist);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    let filtered = history;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.analysisResult.finalDestination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'favorites') {
        filtered = filtered.filter(item => item.favorite);
      } else {
        filtered = filtered.filter(item => item.analysisResult.riskLevel === selectedFilter);
      }
    }

    setFilteredHistory(filtered);
  }, [history, searchTerm, selectedFilter]);

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ${t.ago}`;
    if (hours > 0) return `${hours}h ${t.ago}`;
    if (minutes > 0) return `${minutes}m ${t.ago}`;
    return `<1m ${t.ago}`;
  };

  const handleToggleFavorite = (scanId: string) => {
    historyService.toggleFavorite(scanId);
    loadHistory();
  };

  const handleDeleteScan = (scanId: string) => {
    historyService.deleteScan(scanId);
    loadHistory();
  };

  const handleClearHistory = () => {
    if (window.confirm(t.confirmClear)) {
      historyService.clearHistory();
      loadHistory();
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(history, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `safelinker-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = historyService.getStats();

  const filters = [
    { key: 'all', label: t.all },
    { key: 'favorites', label: t.favorites },
    { key: 'secure', label: t.secure },
    { key: 'caution', label: t.caution },
    { key: 'danger', label: t.danger },
    { key: 'critical', label: t.critical }
  ];

  return (
    <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-cyan-400" />
          <h2 className="font-mono text-lg text-cyan-400 tracking-widest">{t.title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className="px-3 py-2 bg-purple-500/20 border border-purple-400 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleClearHistory}
            className="px-3 py-2 bg-red-500/20 border border-red-400 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <h3 className="font-mono text-sm text-gray-400 mb-4">{t.stats}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-cyan-400">{stats.totalScans}</div>
              <div className="text-xs text-gray-400">{t.totalScans}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-400">{stats.riskDistribution.secure}</div>
              <div className="text-xs text-gray-400">{t.secure}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-400">{stats.riskDistribution.caution}</div>
              <div className="text-xs text-gray-400">{t.caution}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-400">{stats.riskDistribution.danger + stats.riskDistribution.critical}</div>
              <div className="text-xs text-gray-400">{t.danger}+</div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-3 py-1 rounded-lg text-sm font-mono transition-colors ${
                selectedFilter === filter.key
                  ? 'bg-cyan-500 text-black'
                  : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8">
            <History className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 font-mono text-sm">{t.noHistory}</p>
          </div>
        ) : (
          filteredHistory.map(item => (
            <div key={item.id} className="group bg-gray-800/30 border border-gray-700 rounded-lg p-4 hover:border-cyan-400/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-shrink-0">
                      <RiskScoreGauge
                        score={item.analysisResult.riskScore}
                        level={item.analysisResult.riskLevel}
                        size="sm"
                        animated={false}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-sm text-white truncate">{item.url}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(item.timestamp)}</span>
                        {item.analysisResult.totalRedirects > 0 && (
                          <>
                            <span>•</span>
                            <span>{item.analysisResult.totalRedirects} redirects</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggleFavorite(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.favorite 
                        ? 'text-yellow-400 bg-yellow-500/20' 
                        : 'text-gray-400 hover:text-yellow-400'
                    }`}
                    title={t.toggleFavorite}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onScanSelect?.(item)}
                    className="p-2 rounded-lg text-gray-400 hover:text-cyan-400 transition-colors"
                    title={t.view}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteScan(item.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                    title={t.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}