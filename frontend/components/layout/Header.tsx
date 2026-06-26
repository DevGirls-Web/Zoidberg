import { Bell } from "lucide-react";

export function Header() {
  const now = new Date();
  const date = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dateCapitalized = date.charAt(0).toUpperCase() + date.slice(1);

  return (
    <header
      className="sticky top-0 z-10 flex items-end justify-between px-12 py-6 border-b border-border/80"
      style={{ backdropFilter: "blur(6px)", background: "rgba(255,255,255,0.72)" }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-muted-foreground">{dateCapitalized}</span>
        <h1 className="text-[30px] font-bold text-foreground tracking-tight leading-tight">Bonjour Julien</h1>
      </div>

      <div className="relative">
        <button className="size-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <Bell size={16} />
        </button>
        <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-alert border-2 border-white" />
      </div>
    </header>
  );
}