// app/(dashboard)/history/page.tsx
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@components/ui/Button";
import { StatsRow } from "@components/features/history/StatsRow";
import { FiltersBar } from "@components/features/history/FiltersBar";
import { AnalysisTable } from "@components/features/history/AnalysisTable";
import { formatDate } from "@components/features/history/types";
import { analysesStorage } from "@lib/storage/analyses";
import { useSession } from "@hooks/useSession";
import type {
  FilterPrediction,
  SortDir,
  SortKey,
  Analysis,
} from "@components/features/history/types";

export default function HistoryPage() {
  const { user } = useSession();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [search, setSearch] = useState("");
  const [filterPred, setFilterPred] = useState<FilterPrediction>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Charger les analyses depuis localStorage
  useEffect(() => {
      if (user?.id) {
        const userAnalyses = analysesStorage.getByUser(user.id);
        
        // Vérifier si les données ont réellement changé
        setAnalyses((prev) => {
          // Comparaison simple pour éviter les rendus inutiles
          if (JSON.stringify(prev) === JSON.stringify(userAnalyses)) {
            return prev;
          }
          return userAnalyses;
        });
      }
    }, [user]);

  // ── Stats ──
  const total = analyses.length;
  const pneumoCount = analyses.filter((a) => a.prediction === "Pneumonie").length;
  const normalCount = total - pneumoCount;
  const avgConf = total > 0
    ? Math.round(analyses.reduce((s, a) => s + a.confidence, 0) / total)
    : 0;

  // ── Filter + sort ──
  const rows = useMemo(() => {
    let list = [...analyses];

    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (a) =>
          a.lastName.toLowerCase().includes(q) ||
          a.firstName.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          formatDate(a.date).toLowerCase().includes(q)
      );
    }

    if (filterPred !== "all") {
      list = list.filter((a) => a.prediction === filterPred);
    }

    if (sortKey) {
      list.sort((a, b) => {
        const va = a[sortKey];
        const vb = b[sortKey];
        if (typeof va === "number" && typeof vb === "number") {
          return sortDir === "asc" ? va - vb : vb - va;
        }
        const cmp = String(va).localeCompare(String(vb), "fr");
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return list;
  }, [analyses, search, filterPred, sortKey, sortDir]);

  const toggleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
        if (sortDir === null) setSortKey(null);
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
    },
    [sortKey, sortDir]
  );

  const handleExport = useCallback(() => {
    const header = ["ID", "Date", "Nom", "Prénom", "Prédiction", "Confiance (%)", "Modèle", "Feedback"];
    const lines = rows.map((r) =>
      [
        r.id,
        r.date,
        r.lastName,
        r.firstName,
        r.prediction,
        r.confidence,
        r.model,
        r.feedback?.status || "Non renseigné",
      ].join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historique_analyses.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [rows]);

  return (
    <div className="flex flex-col gap-7 max-w-7xl mx-auto px-12 py-10 w-full">
      {/* ── Page header ── */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] font-bold text-foreground tracking-tight leading-tight">
            Historique des analyses
          </h1>
          <p className="text-sm text-muted-foreground">
            {total} analyses enregistrées · Modèle courant v1.0
          </p>
        </div>
        <Button variant="secondary" size="sm" icon={<Download size={15} />} onClick={handleExport}>
          Exporter CSV
        </Button>
      </div>

      <StatsRow total={total} normalCount={normalCount} pneumoCount={pneumoCount} avgConf={avgConf} />

      <FiltersBar
        search={search}
        onSearchChange={setSearch}
        filterPred={filterPred}
        onFilterPredChange={setFilterPred}
        resultCount={rows.length}
      />

      <AnalysisTable
        rows={rows}
        total={total}
        sortKey={sortKey}
        sortDir={sortDir}
        onToggleSort={toggleSort}
        onViewReport={(analysis) => {
          // TODO: Ouvrir le rapport détaillé de l'analyse
          console.log("Voir rapport:", analysis);
        }}
      />
    </div>
  );
}