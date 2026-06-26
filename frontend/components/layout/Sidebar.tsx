"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { clsx } from "clsx";
import { LungIcon } from "@components/icons/LungIcon";

// ── Types ──────────────────────────────────────────────
type IconName =
  | "dashboard"
  | "history"
  | "profile"
  | "settings"
  | "patients"
  | "appointments"
  | "reports"
  | "billing";

type NavItem = {
  label: string;
  href: string;
  icon: IconName;
  badge?: number;
  /** true tant que la route n'existe pas encore réellement */
  disabled?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

// ── Navigation Sections ──────────────────────────────
// Les hrefs reflètent les vraies routes sous app/(dashboard)/.
// disabled: true => route pas encore implémentée, lien visuel grisé non cliquable.
const sections: NavSection[] = [
  {
    title: "",
    items: [
      { label: "Tableau de bord", href: "/accueil", icon: "dashboard" },
      { label: "Historique", href: "/history", icon: "history" },
      { label: "Mon profil", href: "/profile", icon: "profile", disabled: true },
      { label: "Paramètres", href: "/settings", icon: "settings", disabled: true },
    ],
  }
  // {
  //   title: "Patients",
  //   items: [
  //     { label: "Mes patients", href: "/patients", icon: "patients", disabled: true },
  //     { label: "Rendez-vous", href: "/appointments", icon: "appointments", badge: 3, disabled: true },
  //   ],
  // },
  // {
  //   title: "Gestion",
  //   items: [
  //     { label: "Rapports", href: "/reports", icon: "reports", disabled: true },
  //     { label: "Facturation", href: "/billing", icon: "billing", disabled: true },
  //   ],
  // },
  // {
  //   title: "Compte",
  //   items: [
  //     { label: "Mon profil", href: "/profile", icon: "profile", disabled: true },
  //     { label: "Paramètres", href: "/settings", icon: "settings", disabled: true },
  //   ],
  // },
];

// ── Icon Component ────────────────────────────────────
function SidebarIcon({ name }: { name: IconName }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "history":
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 1 0 9-9" />
          <path d="M12 3v6h6" />
          <path d="M12 21v-9" />
          <path d="M9 18l3-3" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 2.1-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-3v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-2.1-2.1.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.6-1H3v-3h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-2.1.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V4h3v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 2.1 2.1-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v3h-.2a1.7 1.7 0 0 0-1.4 1.5Z" />
        </svg>
      );
    case "patients":
      return (
        <svg {...common}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "appointments":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="12" cy="15" r="1" />
        </svg>
      );
    case "reports":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m18 9-4 5-3-3-4 5" />
        </svg>
      );
    case "billing":
      return (
        <svg {...common}>
          <rect x="2" y="6" width="20" height="14" rx="2" />
          <path d="M12 4v2" />
          <path d="M12 20v2" />
          <path d="M6 10h4" />
          <path d="M14 14h4" />
        </svg>
      );
    default:
      return null;
  }
}

// ── Props ──────────────────────────────────────────────
interface SidebarProps {
  doctorName?: string;
  specialty?: string;
  initials?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

// ── SidebarContent ─────────────────────────────────────
function SidebarContent({
  doctorName = "Dr. Julien",
  specialty = "Pneumologue",
  initials = "DJ",
}: Omit<SidebarProps, "isOpen" | "onClose">) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Logo area */}
      <div className="h-24 flex items-center px-6 shrink-0 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-[12px] bg-white/10 flex items-center justify-center shrink-0">
            <LungIcon size={22} color="white" />
          </div>
          <span className="text-white font-semibold text-xl tracking-wide">
            Zoidberg 2.0
          </span>
        </div>
      </div>

      {/* Navigation avec sections */}
      <nav className="flex-1 overflow-auto px-4 py-6 flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="px-4 text-xs uppercase tracking-[0.24em] text-white/50">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActiveItem = isActive(item.href);

                if (item.disabled) {
                  return (
                    <div
                      key={item.href}
                      title="Bientôt disponible"
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-sm font-medium text-white/30 cursor-not-allowed select-none"
                    >
                      <span className="shrink-0">
                        <SidebarIcon name={item.icon} />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white/10 px-1.5 text-xs font-bold text-white/40">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-150 text-left cursor-pointer",
                      isActiveItem
                        ? "bg-brand text-white shadow-[0px_4px_6px_rgba(45,155,122,0.3)]"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <span className={clsx("shrink-0", isActiveItem ? "text-white" : "text-white/70")}>
                      <SidebarIcon name={item.icon} />
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-xs font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="shrink-0 p-6 flex items-center justify-between border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-brand flex items-center justify-center shrink-0 border-2 border-white/20">
            <span className="text-white text-sm font-semibold">{initials}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium leading-tight">{doctorName}</span>
            <span className="text-white/50 text-xs leading-tight mt-0.5">{specialty}</span>
          </div>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="size-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Déconnexion"
        >
          <LogOut size={15} />
        </button>
      </div>
    </>
  );
}

// ── Sidebar ─────────────────────────────────────────────
export function Sidebar({
  doctorName,
  specialty,
  initials,
  isOpen = false,
  onClose,
}: SidebarProps) {
  // Empêche le scroll quand le drawer mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const contentProps = { doctorName, specialty, initials };

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => onClose?.()}
        />
      )}

      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-70 flex-col bg-sidebar lg:flex shrink-0">
        <SidebarContent {...contentProps} />
      </aside>

      {/* Sidebar drawer mobile */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-70 flex-col bg-sidebar transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => onClose?.()}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent {...contentProps} />
      </aside>
    </>
  );
}