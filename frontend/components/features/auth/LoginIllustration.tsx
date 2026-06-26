import Image from "next/image";
import { Shield } from "lucide-react";

export function LoginIllustration() {
  return (
    <div className="w-[550px] shrink-0 bg-brand-light relative flex flex-col items-center justify-center gap-7 overflow-hidden">
      <div className="absolute top-[-40px] right-[-40px] size-52 rounded-full bg-brand/8 blur-[48px] pointer-events-none" />
      <div className="absolute bottom-[-30px] left-[-30px] size-64 rounded-full bg-brand/10 blur-[48px] pointer-events-none" />

      <div className="relative flex items-center justify-center">
        {/* Conteneur en verre dépoli (grand) */}
        <div className="size-[340px] rounded-full bg-white/10 backdrop-blur-[20px] border border-white/20 shadow-xl flex items-center justify-center relative">
          
          {/* Cercle flou intérieur (décoratif) */}
          <div className="absolute inset-[-18px] rounded-full bg-brand/8 blur-[20px] pointer-events-none" />
                    
          {/* Image à l'intérieur du conteneur */}
          <div className="size-[330px] overflow-hidden relative rounded-full">
            <Image
              src="/Container.jpg"
              alt="Illustration médicale poumons"
              fill
              className="object-cover"
              draggable={false}
              priority
            />
          </div>
        </div>
      </div>

      {/* Text block */}
      <div className="flex flex-col items-center gap-3 max-w-[300px] z-10">
        <h2 className="text-[22px] font-bold text-brand-dark text-center leading-snug">Technologie Pulmonaire</h2>
        <p className="text-[14px] font-medium text-brand text-center leading-relaxed">
          Une approche sereine et précise pour la gestion de vos données cliniques respiratoires.
        </p>
      </div>

      {/* Frosted-glass security badge (inline, pas réutilisé ailleurs) */}
      <div
        className="absolute top-6 right-5 flex items-center gap-3 px-4 py-3.5 rounded-[16px] border border-white/80"
        style={{
          backdropFilter: "blur(8px)",
          background: "rgba(255,255,255,0.82)",
          boxShadow: "0px 12px 24px -4px rgba(0,0,0,0.08)",
        }}
      >
        <div className="size-9 rounded-full bg-brand-light flex items-center justify-center shrink-0">
          <Shield size={15} className="text-brand" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-foreground uppercase tracking-[1.2px]">Sécurisé</span>
          <span className="text-[10px] text-muted-foreground leading-tight whitespace-nowrap">
            Conforme aux normes de santé HDS
          </span>
        </div>
      </div>
    </div>
  );
}