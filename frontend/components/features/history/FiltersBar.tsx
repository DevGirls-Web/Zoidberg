import { Search, Filter, X } from "lucide-react";
import { clsx } from "clsx";
import type { FilterPrediction } from "./types";

interface FiltersBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  filterPred: FilterPrediction;
  onFilterPredChange: (v: FilterPrediction) => void;
  resultCount: number;
}

export function FiltersBar({
  search,
  onSearchChange,
  filterPred,
  onFilterPredChange,
  resultCount,
}: FiltersBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-55 max-w-95">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <input
          type="text"
          placeholder="Rechercher un patient, une date…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="field-input pl-9 pr-9 py-2.5 text-sm"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Prediction filter pills */}
      <div className="flex items-center gap-1 bg-muted rounded-[12px] p-1 border border-[rgba(220,232,227,0.6)]">
        {(["all", "Normal", "Pneumonie"] as FilterPrediction[]).map((opt) => (
          <button
            key={opt}
            onClick={() => onFilterPredChange(opt)}
            className={clsx(
              "px-3 py-1.5 rounded-xl text-sm font-medium transition-all cursor-pointer",
              filterPred === opt
                ? opt === "Pneumonie"
                  ? "bg-(--alert-light) text-alert shadow-sm"
                  : opt === "Normal"
                  ? "bg-brand-light text-brand shadow-sm"
                  : "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt === "all" ? "Toutes" : opt}
          </button>
        ))}
      </div>

      {/* Row count */}
      <div className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground">
        <Filter size={13} />
        <span>
          {resultCount} résultat{resultCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}