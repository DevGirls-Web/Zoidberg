// hooks/useSession.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { session, UserSession } from "@lib/session";

export function useSession() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Charger la session au montage
  useEffect(() => {
    const loadSession = () => {
      const currentUser = session.get();
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
      setIsLoading(false);
    };
    loadSession();
  }, []);

  // Connexion
  const login = useCallback((userData: UserSession) => {
    session.set(userData);
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  // Déconnexion
  const logout = useCallback(() => {
    session.clear();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Mise à jour
  const updateUser = useCallback((updates: Partial<UserSession>) => {
    const updated = session.update(updates);
    if (updated) {
      setUser(updated);
    }
    return updated;
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };
}