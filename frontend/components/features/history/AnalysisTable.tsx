// components/features/history/AnalysisTable.tsx
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, FileText, Check, X, RefreshCw } from "lucide-react";
import { clsx } from "clsx";
import { Badge } from "@components/ui/Badge";
import type { Analysis, Prediction, SortDir, SortKey } from "./types";
import { formatDate } from "./types";

const COLS: { key: SortKey; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "lastName", label: "Nom" },
  { key: "firstName", label: "Prénom" },
  { key: "prediction", label: "Prédiction" },
  { key: "confidence", label: "Indice de confiance" },
];

const GRID_COLS = "130px 140px 140px 160px 1fr 100px 48px";

function ConfidenceBar({ value, prediction }: { value: number; prediction: Prediction }) {
  return (
    <div className="flex items-center gap-2.5 w-full">
      <div className="progress-track flex-1 h-1.5">
        <div
          className={clsx(
            "progress-fill",
            prediction === "Pneumonie" ? "progress-fill-alert" : ""
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-foreground tabular-nums w-9 text-right shrink-0">
        {value}%
      </span>
    </div>
  );
}

function SortIcon({ direction }: { direction: SortDir }) {
  if (direction === "asc") return <ChevronUp size={13} className="text-brand" />;
  if (direction === "desc") return <ChevronDown size={13} className="text-brand" />;
  return <ChevronsUpDown size={13} className="text-muted-foreground" />;
}

interface AnalysisTableProps {
  rows: Analysis[];
  total: number;
  sortKey: SortKey;
  sortDir: SortDir;
  onToggleSort: (key: SortKey) => void;
  onViewReport?: (analysis: Analysis) => void;
}

export function AnalysisTable({
  rows,
  total,
  sortKey,
  sortDir,
  onToggleSort,
  onViewReport,
}: AnalysisTableProps) {
  return (
    <div className="surface-card overflow-hidden">
      {/* Table head */}
      <div
        className="grid border-b border-border"
        style={{ gridTemplateColumns: GRID_COLS }}
      >
        {COLS.map((col) => (
          <button
            key={col.key}
            onClick={() => onToggleSort(col.key)}
            className="flex items-center gap-1.5 px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hover:text-foreground transition-colors cursor-pointer group"
          >
            <span>{col.label}</span>
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">
              <SortIcon direction={sortKey === col.key ? sortDir : null} />
            </span>
          </button>
        ))}
        <div className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Feedback
        </div>
        <div className="px-5 py-3.5" />
      </div>

      {/* Rows */}
      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
          <Search size={32} className="opacity-30" />
          <p className="text-sm">Aucun résultat pour cette recherche</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid items-center transition-colors hover:bg-background group"
              style={{ gridTemplateColumns: GRID_COLS }}
            >
              <div className="px-5 py-4">
                <span className="text-sm text-muted-foreground font-medium tabular-nums">
                  {formatDate(row.date)}
                </span>
              </div>
              <div className="px-5 py-4">
                <span className="text-sm font-semibold text-foreground">{row.lastName}</span>
              </div>
              <div className="px-5 py-4">
                <span className="text-sm text-foreground">{row.firstName}</span>
              </div>
              <div className="px-5 py-4">
                {row.prediction === "Pneumonie" ? (
                  <Badge variant="pneumonia" dot className="text-xs px-2.5 py-0.5">
                    Pneumonie
                  </Badge>
                ) : (
                  <Badge variant="normal" dot className="text-xs px-2.5 py-0.5">
                    Normal
                  </Badge>
                )}
              </div>
              <div className="px-5 py-4">
                <ConfidenceBar value={row.confidence} prediction={row.prediction} />
              </div>
              <div className="px-5 py-4">
                {row.feedback?.status === "satisfied" && (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <Check size={12} />
                    Satisfait
                  </span>
                )}
                {row.feedback?.status === "correcting" && (
                  <span className="flex items-center gap-1 text-xs text-brand">
                    <RefreshCw size={12} />
                    Corrigé ({row.feedback.correctPrediction})
                  </span>
                )}
                {(!row.feedback || row.feedback.status === "idle") && (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </div>
              <div className="px-3 py-4 flex items-center justify-center">
                <button
                  onClick={() => onViewReport?.(row)}
                  className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-brand hover:bg-brand-light transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Voir le rapport"
                >
                  <FileText size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-background">
        <span className="text-xs text-muted-foreground">
          Affichage de {rows.length} analyse{rows.length !== 1 ? "s" : ""} sur {total}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Modèles :</span>
          {["v1.0"].map((m) => (
            <span
              key={m}
              className="text-[10px] font-medium text-brand bg-brand-light px-2 py-0.5 rounded-full"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}