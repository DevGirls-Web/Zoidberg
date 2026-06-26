import { RefreshCw, Stethoscope, Droplets, Calendar } from "lucide-react";
import { Card, CardHeader } from "@components/ui/Card";

const RECOMMENDATIONS = [
  {
    icon: <Stethoscope size={18} className="text-[var(--brand)]" />,
    title: "Consulter un médecin",
    text: "Une évaluation clinique est nécessaire pour confirmer le diagnostic et prescrire une antibiothérapie adaptée.",
  },
  {
    icon: <Droplets size={18} className="text-[var(--brand)]" />,
    title: "Hydratation & Repos",
    text: "Maintenir une bonne hydratation pour fluidifier les sécrétions. Repos strict recommandé pendant la phase aiguë.",
  },
  {
    icon: <Calendar size={18} className="text-[var(--brand)]" />,
    title: "Suivi recommandé",
    text: "Radiographie de contrôle suggérée dans 4 à 6 semaines après le début du traitement pour vérifier la clairance.",
  },
];

interface RecommendationsSectionProps {
  score?: number;
}

export function RecommendationsSection({ score = 94 }: RecommendationsSectionProps) {
  return (
    <Card variant="tinted" padding="md" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <CardHeader title="Recommandations cliniques" titleIcon={<RefreshCw size={20} />} />
        <p className="text-sm text-[var(--muted-foreground)] pl-7">
          Basées sur la détection de pneumonie (Score: {score}%)
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {RECOMMENDATIONS.map((rec) => (
          <div
            key={rec.title}
            className="bg-card border border-border rounded-[16px] p-5 flex gap-4 items-start shadow-sm"
          >
            <div className="size-10 rounded-[12px] bg-brand-light flex items-center justify-center shrink-0">
              {rec.icon}
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-base font-medium text-foreground">{rec.title}</span>
              <span className="text-sm text-muted-foreground leading-snug">{rec.text}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}