import { RefreshCw, Download, ZoomIn, ZoomOut, Check } from "lucide-react";
import { Card, CardHeader } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { Badge } from "@components/ui/Badge";
import { ProgressBar } from "@components/ui/ProgressBar";
import { XRayPlaceholder } from "./XRayPlaceholder";

const ANALYSIS_DETAILS = [
  "Opacités alvéolaires lobe inférieur droit",
  "Absence d'épanchement pleural",
  "Silhouette cardiaque normale",
];

interface ResultsSectionProps {
  onReset: () => void;
}

export function ResultsSection({ onReset }: ResultsSectionProps) {
  return (
    <Card variant="default" padding="md" className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <CardHeader title="Résultat de l'analyse IA" titleIcon={<RefreshCw size={20} />} />
        <Badge variant="brand" className="text-xs">Modèle v2.4</Badge>
      </div>

      <div className="flex gap-8">
        {/* X-ray image */}
        <div className="relative rounded-[16px] overflow-hidden shrink-0 w-[220px] border border-border bg-black">
          <div className="aspect-[220/260] relative">
            <div className="absolute inset-0">
              <XRayPlaceholder showOverlay />
            </div>
            <div
              className="absolute inset-0 mix-blend-multiply rounded-[16px]"
              style={{ background: "linear-gradient(44deg, rgba(244,114,182,0) 0%, rgba(244,114,182,0.15) 60%, rgba(244,114,182,0) 100%)" }}
            />
          </div>
          {/* Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {[<ZoomIn key="zi" size={15} />, <ZoomOut key="zo" size={15} />].map((icon, i) => (
              <button
                key={i}
                className="size-8 rounded-lg backdrop-blur-sm bg-white/90 shadow flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Analysis details */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Diagnosis */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-[0.7px]">
              Diagnostic principal
            </span>
            <Badge variant="pneumonia" dot>Pneumonie détectée</Badge>
          </div>

          {/* Confidence bar */}
          <ProgressBar value={94} label="Indice de confiance" color="alert" />

          {/* Detail list */}
          <div className="bg-background border border-border rounded-[12px] p-4 flex flex-col gap-3">
            <h4 className="text-sm font-medium text-foreground">Détails de l&apos;analyse</h4>
            {ANALYSIS_DETAILS.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Check size={12} className="text-brand mt-1 shrink-0" />
                <span className="text-sm text-muted-foreground leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Download */}
          <Button variant="outline" size="sm" icon={<Download size={16} />} fullWidth>
            Télécharger le rapport détaillé
          </Button>
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={onReset}>
          Nouvelle analyse
        </Button>
      </div>
    </Card>
  );
}