import { useState } from "react";
import { RefreshCw, Download, ZoomIn, ZoomOut, Check } from "lucide-react";
import { Card, CardHeader } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { Badge } from "@components/ui/Badge";
import { ProgressBar } from "@components/ui/ProgressBar";
import { XRayPlaceholder } from "./XRayPlaceholder";
import { FeedbackSection } from "./FeedbackSection";

interface ResultsSectionProps {
  onReset: () => void;
  diagnosis?: string;
  confidence?: number;
  details?: string[];
  imageUrl?: string;      // Ajouté
  onDownload?: () => void;
   prediction?: "NORMAL" | "PNEUMONIA"; // Ajouté pour le feedback
}

export function ResultsSection({ 
  onReset, 
  diagnosis = "Pneumonie détectée",
  confidence = 94,
  details = [],
  imageUrl,               // Ajouté
  onDownload,
  prediction = "PNEUMONIA" // Valeur par défaut
}: ResultsSectionProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 2;
  const ZOOM_STEP = 0.1;

  function handleZoomIn() {
    setZoomLevel(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }

  function handleZoomOut() {
    setZoomLevel(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }

  return (
    <Card variant="default" padding="md" className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <CardHeader title="Résultat de l'analyse IA" titleIcon={<RefreshCw size={20} />} />
        <Badge variant="brand" className="text-xs">Modèle v2.4</Badge>
      </div>

      <div className="flex gap-8">
        {/* X-ray image */}
        <div className="relative rounded-[16px] overflow-hidden shrink-0 w-[220px] border border-border bg-black">
          <div 
            className="aspect-[220/260] relative transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="absolute inset-0">
              <XRayPlaceholder 
                imageUrl={imageUrl}  // Passé au composant
                showOverlay={diagnosis === "Pneumonie détectée"}
              />
            </div>
          </div>
          {/* Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="size-8 rounded-lg backdrop-blur-sm bg-white/90 shadow flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={zoomLevel >= MAX_ZOOM}
              aria-label="Zoom avant"
            >
              <ZoomIn size={15} />
            </button>
            <button
              onClick={handleZoomOut}
              className="size-8 rounded-lg backdrop-blur-sm bg-white/90 shadow flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={zoomLevel <= MIN_ZOOM}
              aria-label="Zoom arrière"
            >
              <ZoomOut size={15} />
            </button>
          </div>
        </div>

        {/* Analysis details */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Diagnosis */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-[0.7px]">
              Diagnostic principal
            </span>
            <Badge variant="pneumonia" dot>{diagnosis}</Badge>
          </div>

          {/* Confidence bar */}
          <ProgressBar value={confidence} label="Indice de confiance" color="alert" />

          {/* Detail list */}
          <div className="bg-background border border-border rounded-[12px] p-4 flex flex-col gap-3">
            <h4 className="text-sm font-medium text-foreground">Détails de l&apos;analyse</h4>
            {details.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Check size={12} className="text-brand mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Download */}
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Download size={16} />} 
            fullWidth
            onClick={onDownload}
          >
            Télécharger le rapport détaillé
          </Button>
        </div>
      </div>

      {/* Feedback Section - AJOUTÉ EN BAS */}
      <FeedbackSection 
        prediction={prediction}
        onFeedback={(isCorrect, correctPrediction) => {
          if (!isCorrect && correctPrediction) {
            console.log("Correction envoyée:", correctPrediction);
            // TODO: Appel API /feedback quand backend sera prêt
          }
        }}
      />

      {/* Reset */}
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={onReset}>
          Nouvelle analyse
        </Button>
      </div>
    </Card>
  );
}