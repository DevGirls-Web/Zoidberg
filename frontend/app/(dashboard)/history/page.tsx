import { useState, useMemo } from "react";
import {
  Search, Download, ChevronUp, ChevronDown,
  ChevronsUpDown, Filter, FileText, TrendingUp,
  AlertCircle, CheckCircle2, X,
} from "lucide-react";
import { Badge } from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import { clsx } from "clsx";

/* ────────────────────────────────────────────
   Types & mock data
──────────────────────────────────────────── */
type Prediction = "Pneumonie" | "Normal";

interface Analysis {
  id: string;
  date: string;           
  lastName: string;
  firstName: string;
  prediction: Prediction;
  confidence: number;  
  model: string;
}

const MOCK_DATA: Analysis[] = [
  { id: "A001", date: "2026-06-25", lastName: "Laurent",    firstName: "Martin",    prediction: "Pneumonie", confidence: 94, model: "v2.4" },
  { id: "A002", date: "2026-06-25", lastName: "Dubois",     firstName: "Sophie",    prediction: "Normal",    confidence: 98, model: "v2.4" },
  { id: "A003", date: "2026-06-24", lastName: "Moreau",     firstName: "Pierre",    prediction: "Pneumonie", confidence: 87, model: "v2.4" },
  { id: "A004", date: "2026-06-24", lastName: "Bernard",    firstName: "Claire",    prediction: "Normal",    confidence: 96, model: "v2.4" },
  { id: "A005", date: "2026-06-23", lastName: "Petit",      firstName: "Thomas",    prediction: "Normal",    confidence: 91, model: "v2.3" },
  { id: "A006", date: "2026-06-23", lastName: "Leroy",      firstName: "Isabelle",  prediction: "Pneumonie", confidence: 79, model: "v2.3" },
  { id: "A007", date: "2026-06-22", lastName: "Roux",       firstName: "Antoine",   prediction: "Normal",    confidence: 99, model: "v2.3" },
  { id: "A008", date: "2026-06-22", lastName: "Simon",      firstName: "Nathalie",  prediction: "Pneumonie", confidence: 92, model: "v2.3" },
  { id: "A009", date: "2026-06-21", lastName: "Michel",     firstName: "François",  prediction: "Normal",    confidence: 97, model: "v2.3" },
  { id: "A010", date: "2026-06-21", lastName: "Lefebvre",   firstName: "Camille",   prediction: "Pneumonie", confidence: 83, model: "v2.3" },
  { id: "A011", date: "2026-06-20", lastName: "Martinez",   firstName: "Lucie",     prediction: "Normal",    confidence: 95, model: "v2.2" },
  { id: "A012", date: "2026-06-20", lastName: "Garcia",     firstName: "Jean",      prediction: "Normal",    confidence: 88, model: "v2.2" },
  { id: "A013", date: "2026-06-19", lastName: "Thomas",     firstName: "Amélie",    prediction: "Pneumonie", confidence: 76, model: "v2.2" },
  { id: "A014", date: "2026-06-19", lastName: "Robert",     firstName: "Marc",      prediction: "Normal",    confidence: 93, model: "v2.2" },
  { id: "A015", date: "2026-06-18", lastName: "Fontaine",   firstName: "Élise",     prediction: "Pneumonie", confidence: 89, model: "v2.2" },
];

/* ────────────────────────────────────────────
   Helpers
──────────────────────────────────────────── */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function ConfidenceBar({ value, prediction }: { value: number; prediction: Prediction }) {
  const color = prediction === "Pneumonie" ? "bg-[#F472B6]" : "bg-[#2D9B7A]";
  return (
    <div className="flex items-center gap-2.5 w-full">
      <div className="flex-1 h-1.5 bg-[#E8F5F0] rounded-full overflow-hidden">
        <div className={clsx("h-full rounded-full transition-all", color)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-sm font-semibold text-[#1A2E28] tabular-nums w-9 text-right shrink-0">
        {value}%
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────
   Stat card
──────────────────────────────────────────── */
function StatCard({
  label, value, sub, icon, accent = false,
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ReactNode; accent?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-4 px-5 py-4 rounded-[16px] border",
        accent
          ? "bg-[#FCE7F3] border-[rgba(244,114,182,0.2)]"
          : "bg-white border-[rgba(220,232,227,0.5)] shadow-[0px_2px_8px_-2px_rgba(27,110,84,0.05)]"
      )}
    >
      <div
        className={clsx(
          "size-10 rounded-[10px] flex items-center justify-center shrink-0",
          accent ? "bg-[rgba(244,114,182,0.15)]" : "bg-[#E8F5F0]"
        )}
      >
        <span className={accent ? "text-[#F472B6]" : "text-[#2D9B7A]"}>{icon}</span>
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs text-[rgba(26,46,40,0.5)] font-medium uppercase tracking-wide leading-none">
          {label}
        </span>
        <span className={clsx("text-xl font-bold leading-tight", accent ? "text-[#F472B6]" : "text-[#1A2E28]")}>
          {value}
        </span>
        {sub && <span className="text-[11px] text-[rgba(26,46,40,0.4)] leading-none">{sub}</span>}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Sort button
──────────────────────────────────────────── */
type SortDir = "asc" | "desc" | null;
type SortKey = keyof Analysis | null;

function SortIcon({ direction }: { direction: SortDir }) {
  if (direction === "asc")  return <ChevronUp size={13} className="text-[#2D9B7A]" />;
  if (direction === "desc") return <ChevronDown size={13} className="text-[#2D9B7A]" />;
  return <ChevronsUpDown size={13} className="text-[rgba(26,46,40,0.3)]" />;
}

/* ────────────────────────────────────────────
   Main component
──────────────────────────────────────────── */
type FilterPrediction = "all" | "Pneumonie" | "Normal";

export function HistoryPage() {
  const [search, setSearch]             = useState("");
  const [filterPred, setFilterPred]     = useState<FilterPrediction>("all");
  const [sortKey, setSortKey]           = useState<SortKey>("date");
  const [sortDir, setSortDir]           = useState<SortDir>("desc");

  /* ── Stats ── */
  const total      = MOCK_DATA.length;
  const pneumoCount = MOCK_DATA.filter(a => a.prediction === "Pneumonie").length;
  const normalCount = total - pneumoCount;
  const avgConf    = Math.round(MOCK_DATA.reduce((s, a) => s + a.confidence, 0) / total);

  /* ── Filter + sort ── */
  const rows = useMemo(() => {
    let list = [...MOCK_DATA];

    // search
    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter(a =>
        a.lastName.toLowerCase().includes(q) ||
        a.firstName.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        formatDate(a.date).toLowerCase().includes(q)
      );
    }

    // prediction filter
    if (filterPred !== "all") {
      list = list.filter(a => a.prediction === filterPred);
    }

    // sort
    if (sortKey) {
      list.sort((a, b) => {
        const va = a[sortKey];
        const vb = b[sortKey];
        const cmp = typeof va === "number"
          ? (va as number) - (vb as number)
          : String(va).localeCompare(String(vb), "fr");
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return list;
  }, [search, filterPred, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : d === "desc" ? null : "asc");
      if (sortDir === null) setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function handleExport() {
    const header = ["ID", "Date", "Nom", "Prénom", "Prédiction", "Confiance (%)", "Modèle"];
    const lines = rows.map(r =>
      [r.id, r.date, r.lastName, r.firstName, r.prediction, r.confidence, r.model].join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "historique_analyses.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  const COLS: { key: SortKey; label: string; width?: string }[] = [
    { key: "date",       label: "Date",                width: "w-[130px]" },
    { key: "lastName",   label: "Nom",                 width: "w-[140px]" },
    { key: "firstName",  label: "Prénom",              width: "w-[140px]" },
    { key: "prediction", label: "Prédiction",          width: "w-[160px]" },
    { key: "confidence", label: "Indice de confiance", width: "" },
  ];

  return (
    <div className="flex flex-col gap-7 max-w-[1280px] mx-auto px-12 py-10 w-full">

      {/* ── Page header ── */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] font-bold text-[#1A2E28] tracking-tight leading-tight">
            Historique des analyses
          </h1>
          <p className="text-sm text-[rgba(26,46,40,0.5)]">
            {total} analyses enregistrées · Modèle courant v2.4
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<Download size={15} />}
          onClick={handleExport}
        >
          Exporter CSV
        </Button>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Total analyses"
          value={total}
          sub="30 derniers jours"
          icon={<FileText size={18} />}
        />
        <StatCard
          label="Résultats normaux"
          value={normalCount}
          sub={`${Math.round((normalCount / total) * 100)}% du total`}
          icon={<CheckCircle2 size={18} />}
        />
        <StatCard
          label="Pneumonies détectées"
          value={pneumoCount}
          sub={`${Math.round((pneumoCount / total) * 100)}% du total`}
          icon={<AlertCircle size={18} />}
          accent
        />
        <StatCard
          label="Confiance moyenne"
          value={`${avgConf}%`}
          sub="Sur toutes les analyses"
          icon={<TrendingUp size={18} />}
        />
      </div>

      {/* ── Filters bar ── */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-[380px]">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(26,46,40,0.35)] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Rechercher un patient, une date…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={clsx(
              "w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-[#DCE8E3] rounded-[12px]",
              "text-[#1A2E28] placeholder:text-[rgba(26,46,40,0.35)]",
              "focus:outline-none focus:border-[#2D9B7A] focus:ring-2 focus:ring-[#2D9B7A]/15",
              "transition-colors"
            )}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(26,46,40,0.35)] hover:text-[#1A2E28] transition-colors cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Prediction filter pills */}
        <div className="flex items-center gap-1 bg-[#F4F8F6] rounded-[12px] p-1 border border-[rgba(220,232,227,0.6)]">
          {(["all", "Normal", "Pneumonie"] as FilterPrediction[]).map(opt => (
            <button
              key={opt}
              onClick={() => setFilterPred(opt)}
              className={clsx(
                "px-3 py-1.5 rounded-[8px] text-sm font-medium transition-all cursor-pointer",
                filterPred === opt
                  ? opt === "Pneumonie"
                    ? "bg-[#FCE7F3] text-[#F472B6] shadow-sm"
                    : opt === "Normal"
                    ? "bg-[#E8F5F0] text-[#2D9B7A] shadow-sm"
                    : "bg-white text-[#1A2E28] shadow-sm"
                  : "text-[rgba(26,46,40,0.5)] hover:text-[#1A2E28]"
              )}
            >
              {opt === "all" ? "Toutes" : opt}
            </button>
          ))}
        </div>

        {/* Row count */}
        <div className="ml-auto flex items-center gap-1.5 text-sm text-[rgba(26,46,40,0.45)]">
          <Filter size={13} />
          <span>{rows.length} résultat{rows.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ── Table ── */}
      <div
        className="bg-white rounded-[20px] border border-[rgba(220,232,227,0.5)] overflow-hidden"
        style={{ boxShadow: "0px 4px 20px -2px rgba(27,110,84,0.05)" }}
      >
        {/* Table head */}
        <div className="grid border-b border-[rgba(220,232,227,0.6)]"
          style={{ gridTemplateColumns: "130px 140px 140px 160px 1fr 48px" }}>
          {COLS.map(col => (
            <button
              key={col.key}
              onClick={() => toggleSort(col.key)}
              className="flex items-center gap-1.5 px-5 py-3.5 text-left text-xs font-semibold text-[rgba(26,46,40,0.5)] uppercase tracking-wide hover:text-[#1A2E28] transition-colors cursor-pointer group"
            >
              <span>{col.label}</span>
              <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                <SortIcon direction={sortKey === col.key ? sortDir : null} />
              </span>
            </button>
          ))}
          {/* Actions col header */}
          <div className="px-5 py-3.5" />
        </div>

        {/* Rows */}
        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-[rgba(26,46,40,0.4)]">
            <Search size={32} className="opacity-30" />
            <p className="text-sm">Aucun résultat pour cette recherche</p>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(220,232,227,0.4)]">
            {rows.map((row, i) => (
              <div
                key={row.id}
                className={clsx(
                  "grid items-center transition-colors",
                  "hover:bg-[#FAFBFA] group"
                )}
                style={{ gridTemplateColumns: "130px 140px 140px 160px 1fr 48px" }}
              >
                {/* Date */}
                <div className="px-5 py-4">
                  <span className="text-sm text-[rgba(26,46,40,0.6)] font-medium tabular-nums">
                    {formatDate(row.date)}
                  </span>
                </div>

                {/* Nom */}
                <div className="px-5 py-4">
                  <span className="text-sm font-semibold text-[#1A2E28]">{row.lastName}</span>
                </div>

                {/* Prénom */}
                <div className="px-5 py-4">
                  <span className="text-sm text-[#1A2E28]">{row.firstName}</span>
                </div>

                {/* Prédiction */}
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

                {/* Confidence */}
                <div className="px-5 py-4">
                  <ConfidenceBar value={row.confidence} prediction={row.prediction} />
                </div>

                {/* Row action */}
                <div className="px-3 py-4 flex items-center justify-center">
                  <button
                    className="size-7 rounded-lg flex items-center justify-center text-[rgba(26,46,40,0.25)] hover:text-[#2D9B7A] hover:bg-[#E8F5F0] transition-all cursor-pointer opacity-0 group-hover:opacity-100"
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
        <div className="flex items-center justify-between px-5 py-3 border-t border-[rgba(220,232,227,0.5)] bg-[#FAFBFA]">
          <span className="text-xs text-[rgba(26,46,40,0.4)]">
            Affichage de {rows.length} analyse{rows.length !== 1 ? "s" : ""} sur {total}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[rgba(26,46,40,0.4)]">Modèles :</span>
            {["v2.4", "v2.3", "v2.2"].map(m => (
              <span key={m} className="text-[10px] font-medium text-[#2D9B7A] bg-[#E8F5F0] px-2 py-0.5 rounded-full">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
