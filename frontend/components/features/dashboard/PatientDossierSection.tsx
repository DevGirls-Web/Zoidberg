import { Card, CardHeader } from "@components/ui/Card";
import { MiniCard } from "@components/ui/MiniCard";

// TODO: remplacer par les données du vrai patient sélectionné (à brancher avec l'API)
const PATIENT = {
  name: "Martin Laurent",
  id: "#PT-2026-8492",
  initials: "ML",
  age: "42 ans",
  sex: "Masculin",
  weight: "78 kg",
  height: "180 cm",
};

export function PatientDossierSection() {
  return (
    <Card variant="default" padding="sm" className="flex flex-col gap-4">
      <CardHeader title="Dossier Patient Actif" />

      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full bg-brand-light border border-border flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-brand tracking-wide">
            {PATIENT.initials}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-foreground">{PATIENT.name}</span>
          <span className="text-sm text-muted-foreground">ID: {PATIENT.id}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <MiniCard label="Âge" value={PATIENT.age} />
        <MiniCard label="Sexe" value={PATIENT.sex} />
        <MiniCard label="Poids" value={PATIENT.weight} />
        <MiniCard label="Taille" value={PATIENT.height} />
      </div>
    </Card>
  );
}