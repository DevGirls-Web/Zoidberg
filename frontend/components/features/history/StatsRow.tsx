import { FileText, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import { clsx } from "clsx";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent?: boolean;
}

function StatCard({ label, value, sub, icon, accent = false }: StatCardProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-4 px-5 py-4 rounded-2xl border",
        accent ? "bg-(--alert-light) border-[rgba(244,114,182,0.2)]" : "surface-card"
      )}
    >
      <div
        className={clsx(
          "size-10 rounded-[10px] flex items-center justify-center shrink-0",
          accent ? "bg-[rgba(244,114,182,0.15)]" : "bg-brand-light"
        )}
      >
        <span className={accent ? "text-alert" : "text-brand"}>{icon}</span>
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none">
          {label}
        </span>
        <span className={clsx("text-xl font-bold leading-tight", accent ? "text-alert" : "text-foreground")}>
          {value}
        </span>
        {sub && <span className="text-[11px] text-muted-foreground leading-none">{sub}</span>}
      </div>
    </div>
  );
}

interface StatsRowProps {
  total: number;
  normalCount: number;
  pneumoCount: number;
  avgConf: number;
}

export function StatsRow({ total, normalCount, pneumoCount, avgConf }: StatsRowProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard label="Total analyses" value={total} sub="30 derniers jours" icon={<FileText size={18} />} />
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
      <StatCard label="Confiance moyenne" value={`${avgConf}%`} sub="Sur toutes les analyses" icon={<TrendingUp size={18} />} />
    </div>
  );
}