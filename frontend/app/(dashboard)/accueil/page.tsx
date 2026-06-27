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
import { api, type PredictionResult } from "@lib/api";

export default function AccueilPage() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [results, setResults] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = useCallback((file: UploadedFile) => {
    setUploadedFile(file);
    setAnalysisState("uploaded");
    setError(null);
  }, []);

  const handleFileRemoved = useCallback(() => {
    setUploadedFile(null);
    setAnalysisState("idle");
    setResults(null);
    setError(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!uploadedFile) return;

    setAnalysisState("analyzing");
    setError(null);

    try {
      const result = await api.predict(uploadedFile.raw);
      setResults(result);
      setAnalysisState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'analyse");
      setAnalysisState("uploaded");
    }
  }, [uploadedFile]);

  const handleReset = useCallback(() => {
    setResults(null);
    setUploadedFile(null);
    setAnalysisState("idle");
    setError(null);
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

          {error && (
            <Card variant="default" padding="md" className="border-red-200 bg-red-50">
              <p className="text-sm text-red-600">⚠️ {error}</p>
            </Card>
          )}

          {analysisState === "analyzing" && (
            <Card variant="default" padding="md" className="flex items-center justify-center py-16">
              <Loader size="lg" label="Analyse IA en cours…" />
            </Card>
          )}

          {analysisState === "done" && results && (
            <ResultsSection
              onReset={handleReset}
              diagnosis={results.prediction === "PNEUMONIA" ? "Pneumonie détectée" : "Normal"}
              confidence={Math.round(results.confidence * 100)}
              details={[
                `Prédiction: ${results.prediction}`,
                `Confiance: ${Math.round(results.confidence * 100)}%`,
                `Seuil utilisé: ${results.threshold_used}`,
              ]}
              imageUrl={results.gradcam_image}
              onDownload={() => {
                const link = document.createElement("a");
                link.href = results.gradcam_image;
                link.download = "gradcam-result.jpg";
                link.click();
              }}
            />
          )}
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-8">
          {analysisState === "done" && results ? (
            <RecommendationsSection score={Math.round(results.confidence * 100)} />
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