// Configuration de base
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Format de la réponse renvoyée par le backend (voir main.py /predict)
export interface PredictionResult {
  prediction: "NORMAL" | "PNEUMONIA";
  confidence: number;        // ex: 0.87
  threshold_used: number;    // ex: 0.62
  gradcam_image: string;     // data:image/jpeg;base64,...
}

export const api = {
  /**
   * Envoie la radiographie au backend et reçoit directement
   * la prédiction + l'image Grad-CAM (appel synchrone, une seule requête).
   */
  predict: async (file: File): Promise<PredictionResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.detail || `Erreur: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Vérifie que l'API est bien démarrée (route GET / de ton backend).
   */
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/`);

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    return response.json();
  },
};