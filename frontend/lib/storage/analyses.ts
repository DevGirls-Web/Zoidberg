// lib/storage/analyses.ts
import { Analysis } from "@components/features/history/types";

const ANALYSES_KEY = "zoidberg_analyses";

export const analysesStorage = {
  /**
   * Récupère toutes les analyses
   */
  getAll: (): Analysis[] => {
    try {
      const data = localStorage.getItem(ANALYSES_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  /**
   * Récupère les analyses d'un utilisateur spécifique
   */
  getByUser: (userId: string): Analysis[] => {
    const all = analysesStorage.getAll();
    return all.filter((a) => a.id.startsWith(userId));
  },

  /**
   * Ajoute une nouvelle analyse
   */
  add: (analysis: Analysis): void => {
    const all = analysesStorage.getAll();
    all.push(analysis);
    localStorage.setItem(ANALYSES_KEY, JSON.stringify(all));
  },

  /**
   * Met à jour le feedback d'une analyse
   */
  updateFeedback: (
    analysisId: string,
    feedback: Analysis["feedback"]
  ): Analysis | null => {
    const all = analysesStorage.getAll();
    const index = all.findIndex((a) => a.id === analysisId);
    if (index === -1) return null;

    all[index] = { ...all[index], feedback };
    localStorage.setItem(ANALYSES_KEY, JSON.stringify(all));
    return all[index];
  },

  /**
   * Supprime une analyse
   */
  remove: (analysisId: string): void => {
    const all = analysesStorage.getAll();
    const filtered = all.filter((a) => a.id !== analysisId);
    localStorage.setItem(ANALYSES_KEY, JSON.stringify(filtered));
  },

  /**
   * Supprime toutes les analyses (pour tests)
   */
  clear: (): void => {
    localStorage.removeItem(ANALYSES_KEY);
  },
};