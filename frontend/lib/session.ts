// lib/session.ts
export interface UserSession {
  id: string;
  name: string;
  email: string;
  specialty?: string;
  initials?: string;
}

const SESSION_KEY = "zoidberg_session";

export const session = {
  /**
   * Récupère la session utilisateur
   */
  get: (): UserSession | null => {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  /**
   * Sauvegarde la session utilisateur
   */
  set: (user: UserSession): void => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  /**
   * Supprime la session utilisateur (déconnexion)
   */
  clear: (): void => {
    localStorage.removeItem(SESSION_KEY);
  },

  /**
   * Vérifie si un utilisateur est connecté
   */
  isAuthenticated: (): boolean => {
    return session.get() !== null;
  },

  /**
   * Met à jour une partie de la session
   */
  update: (updates: Partial<UserSession>): UserSession | null => {
    const current = session.get();
    if (!current) return null;
    const updated = { ...current, ...updates };
    session.set(updated);
    return updated;
  },
};