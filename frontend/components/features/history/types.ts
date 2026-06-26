export type Prediction = "Pneumonie" | "Normal";

export interface Analysis {
  id: string;
  date: string;
  lastName: string;
  firstName: string;
  prediction: Prediction;
  confidence: number;
  model: string;
}

export type SortDir = "asc" | "desc" | null;
export type SortKey = keyof Analysis | null;
export type FilterPrediction = "all" | "Pneumonie" | "Normal";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}