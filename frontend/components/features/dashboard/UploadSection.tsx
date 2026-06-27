import { RefreshCw } from "lucide-react";
import { Card, CardHeader } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { Loader } from "@components/ui/Loader";
import { UploadZone, UploadedFile } from "./UploadZone";
import type { AnalysisState } from "./types";

interface UploadSectionProps {
  analysisState: AnalysisState;
  uploadedFile: UploadedFile | null;
  onFileSelected: (f: UploadedFile) => void;
  onFileRemoved: () => void;
  onAnalyze: () => void;
}

export function UploadSection({
  analysisState,
  uploadedFile,
  onFileSelected,
  onFileRemoved,
  onAnalyze,
}: UploadSectionProps) {
  return (
    <Card variant="default" padding="md" className="flex flex-col gap-6">
      <CardHeader title="Analyser une radiographie" titleIcon={<RefreshCw size={20} />} />
      <UploadZone
        onFileSelected={onFileSelected}
        onFileRemoved={onFileRemoved}
        uploadedFile={uploadedFile}
      />
      {analysisState === "uploaded" && uploadedFile && (
        <div className="flex justify-end">
          <Button variant="secondary" size="md" icon={<RefreshCw size={16} />} onClick={onAnalyze}>
            Lancer l&apos;analyse
          </Button>
        </div>
      )}
      {analysisState === "analyzing" && (
        <div className="flex justify-end">
          <Loader size="sm" label="Analyse en cours…" />
        </div>
      )}
    </Card>
  );
}