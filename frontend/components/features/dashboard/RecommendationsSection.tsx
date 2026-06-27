import { RefreshCw, Stethoscope, Droplets, Calendar, AlertCircle, ClipboardCheck, Activity, Pill, Shield } from "lucide-react";
import { Card, CardHeader } from "@components/ui/Card";

// Types de recommandations
interface Recommendation {
  icon: React.ReactNode;
  title: string;
  text: string;
}

// 3 ensembles de recommandations selon le score
const RECOMMENDATIONS_BY_SCORE: Record<string, Recommendation[]> = {
  // Score ≥ 70% : Risque élevé - Pneumonie probable
  high: [
    {
      icon: <Stethoscope size={18} className="text-[var(--brand)]" />,
      title: "Consultation médicale urgente",
      text: "Une évaluation clinique immédiate est nécessaire. Consultez un pneumologue dans les 24 à 48 heures pour confirmer le diagnostic et débuter un traitement adapté.",
    },
    {
      icon: <AlertCircle size={18} className="text-[var(--brand)]" />,
      title: "Examens complémentaires",
      text: "Une radiographie de contrôle et des analyses sanguines (NFS, CRP) sont recommandées pour évaluer la sévérité de l'infection.",
    },
    {
      icon: <Pill size={18} className="text-[var(--brand)]" />,
      title: "Traitement antibiotique",
      text: "En cas de confirmation, une antibiothérapie probabiliste doit être débutée rapidement. L'antibiogramme permettra d'adapter le traitement.",
    },
  ],
  // Score 40% - 69% : Risque modéré - À surveiller
  medium: [
    {
      icon: <ClipboardCheck size={18} className="text-[var(--brand)]" />,
      title: "Suivi rapproché",
      text: "Une consultation de contrôle dans les 7 jours est recommandée pour réévaluer l'évolution clinique et confirmer ou infirmer le diagnostic.",
    },
    {
      icon: <Activity size={18} className="text-[var(--brand)]" />,
      title: "Surveillance des symptômes",
      text: "Surveillez votre température, votre fréquence respiratoire et votre saturation en oxygène. En cas d'aggravation, consultez rapidement.",
    },
    {
      icon: <Droplets size={18} className="text-[var(--brand)]" />,
      title: "Hygiène de vie renforcée",
      text: "Maintenez une hydratation abondante, reposez-vous et évitez les efforts physiques intenses jusqu'à amélioration des symptômes.",
    },
  ],
  // Score < 40% : Risque faible - Normal
  low: [
    {
      icon: <Shield size={18} className="text-[var(--brand)]" />,
      title: "Pas de signes d'infection",
      text: "L'analyse ne montre pas de signes évocateurs de pneumonie. Continuez à surveiller votre état de santé et adoptez les bons gestes préventifs.",
    },
    {
      icon: <Droplets size={18} className="text-[var(--brand)]" />,
      title: "Prévention recommandée",
      text: "Lavez-vous régulièrement les mains, aérez les pièces et maintenez une bonne hygiène respiratoire pour prévenir les infections hivernales.",
    },
    {
      icon: <Calendar size={18} className="text-[var(--brand)]" />,
      title: "Suivi standard",
      text: "Un contrôle annuel chez votre médecin traitant est recommandé pour un suivi global de votre santé pulmonaire.",
    },
  ],
};

// Niveau de risque
type RiskLevel = "high" | "medium" | "low";

function getRiskLevel(score: number): RiskLevel {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

// Couleurs du badge selon le niveau
const RISK_COLORS: Record<RiskLevel, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-red-100", text: "text-red-700", label: "Risque élevé" },
  medium: { bg: "bg-orange-100", text: "text-orange-700", label: "Risque modéré" },
  low: { bg: "bg-green-100", text: "text-green-700", label: "Risque faible" },
};

interface RecommendationsSectionProps {
  score?: number;
}

export function RecommendationsSection({ score = 94 }: RecommendationsSectionProps) {
  const riskLevel = getRiskLevel(score);
  const recommendations = RECOMMENDATIONS_BY_SCORE[riskLevel];
  const riskColor = RISK_COLORS[riskLevel];

  return (
    <Card variant="tinted" padding="md" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <CardHeader title="Recommandations cliniques" titleIcon={<RefreshCw size={20} />} />
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${riskColor.bg} ${riskColor.text}`}>
            {riskColor.label} ({score}%)
          </div>
        </div>
        <p className="text-sm text-[var(--muted-foreground)] pl-7">
          Basées sur la détection de pneumonie
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {recommendations.map((rec) => (
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