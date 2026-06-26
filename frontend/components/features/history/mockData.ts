import type { Analysis } from "./types";

// TODO: remplacer par un appel RTK Query (GET /analyses) plus tard
export const MOCK_DATA: Analysis[] = [
  { id: "A001", date: "2026-06-25", lastName: "Laurent", firstName: "Martin", prediction: "Pneumonie", confidence: 94, model: "v2.4" },
  { id: "A002", date: "2026-06-25", lastName: "Dubois", firstName: "Sophie", prediction: "Normal", confidence: 98, model: "v2.4" },
  { id: "A003", date: "2026-06-24", lastName: "Moreau", firstName: "Pierre", prediction: "Pneumonie", confidence: 87, model: "v2.4" },
];