"use client";
import { Bell } from "lucide-react";
import { useSession } from "@hooks/useSession";

export function Header() {
  const { user } = useSession();
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
        className="sticky top-6 z-10 flex items-center justify-between px-8 py-3 border-b border-border/40 mx-6 rounded-[16px]"
        style={{ 
          backdropFilter: "blur(6px)", 
          background: "rgba(255,255,255,0.35)" 
        }}
      >
      {/* Gauche : Bonjour + sous-titre */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-[22px] font-bold text-foreground tracking-tight leading-tight">
          Bonjour Dr {user?.name || "Docteur"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Modèle de consultation : Pneumologue
        </p>
      </div>

      {/* Droite : Date + Notification */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {dateCapitalized}
        </span>
        <div className="relative">
          <button className="size-9 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Bell size={15} />
          </button>
          <span className="absolute top-2 right-2 size-2 rounded-full bg-alert border-2 border-white" />
        </div>
      </div>
    </header>
  );
}