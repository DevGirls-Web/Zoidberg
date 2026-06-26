"use client";

import { useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardHeader } from "@components/ui/Card";
import { Loader } from "@components/ui/Loader";
import { UploadSection } from "@components/features/dashboard/UploadSection";
import { ResultsSection } from "@components/features/dashboard/ResultsSection";
import { RecommendationsSection } from "@components/features/dashboard/RecommendationsSection";
import { PatientDossierSection } from "@components/features/dashboard/PatientDossierSection";
import { UploadedFile } from "@components/features/dashboard/UploadZone";
import type { AnalysisState } from "@components/features/dashboard/types";

export default function AccueilPage() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("done");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>({
    name: "patient_rx_thorax_2406.png",
    size: "4.2 Mo",
    raw: {} as File,
  });

  const handleFileSelected = useCallback((file: UploadedFile) => {
    setUploadedFile(file);
    setAnalysisState("uploaded");
  }, []);

  const handleFileRemoved = useCallback(() => {
    setUploadedFile(null);
    setAnalysisState("idle");
  }, []);

  const handleAnalyze = useCallback(() => {
    setAnalysisState("analyzing");
    // TODO: remplacer par le vrai appel à l'API d'analyse
    setTimeout(() => setAnalysisState("done"), 2200);
  }, []);

  const handleReset = useCallback(() => {
    setUploadedFile(null);
    setAnalysisState("idle");
  }, []);

  return (
    <div className="app-shell mx-auto p-12">
      <div className="grid grid-cols-2 gap-8">
        {/* ── Left column ── */}
        <div className="flex flex-col gap-8">
          <UploadSection
            analysisState={analysisState}
            uploadedFile={uploadedFile}
            onFileSelected={handleFileSelected}
            onFileRemoved={handleFileRemoved}
            onAnalyze={handleAnalyze}
          />

          {analysisState === "analyzing" && (
            <Card variant="default" padding="md" className="flex items-center justify-center py-16">
              <Loader size="lg" label="Analyse IA en cours…" />
            </Card>
          )}

          {analysisState === "done" && <ResultsSection onReset={handleReset} />}
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-8">
          {analysisState === "done" ? (
            <RecommendationsSection score={94} />
          ) : (
            <Card variant="tinted" padding="md" className="flex flex-col gap-4">
              <CardHeader title="Recommandations cliniques" titleIcon={<RefreshCw size={20} />} />
              <p className="text-sm text-[var(--muted-foreground)] italic">
                Les recommandations s&apos;afficheront après l&apos;analyse.
              </p>
            </Card>
          )}

          <PatientDossierSection />
        </div>
      </div>
    </div>
  );
}