"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { LungIcon } from "@components/icons/LungIcon";
import { useSession } from "@hooks/useSession";

export function LoginForm() {
  const router = useRouter();
  const { login } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

     login({
      id: `user-${Date.now()}`, // Générer un ID unique
      name: email.split("@")[0], // Utiliser la partie avant @ comme nom
      email: email,
      specialty: "Pneumologue", // À remplacer par la vraie donnée de l'API
      initials: email.substring(0, 2).toUpperCase(), // Utiliser les 2 premières lettres de l'email
    });

    router.push("/accueil");
  }

  return (
    <div className="flex flex-col justify-between px-6 py-7 flex-1">
      <div className="flex items-center gap-3">
        <div className="size-11 rounded-[12px] bg-brand flex items-center justify-center shrink-0 shadow-soft">
          <LungIcon size={24} color="white" />
        </div>
        <div className="flex items-baseline gap-1 font-bold text-[22px] tracking-tight">
          <span className="text-foreground">Zoidberg</span>
          <span className="text-brand">2.0</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] font-semibold text-foreground leading-tight tracking-tight">Bon retour</h1>
          <p className="text-[15px] text-muted-foreground">Connectez-vous à votre espace clinique</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email professionnel"
            type="email"
            placeholder="nom@clinique.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={15} />}
            autoComplete="email"
            className="py-[14px]"
          />

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <label className="field-label">Mot de passe</label>
              <button
                type="button"
                className="text-xs font-semibold text-brand hover:text-brand-dark transition-colors cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <Input
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={15} />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              autoComplete="current-password"
              className="py-[14px]"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none w-fit">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 rounded-sm border border-border accent-brand cursor-pointer"
            />
            <span className="text-sm text-muted-foreground">Rester connecté</span>
          </label>

          <Button type="submit" variant="primary" size="md" fullWidth className="mt-1">
            Se connecter
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1 text-sm">
        <span className="text-muted-foreground">Pas encore de compte ?</span>
        <button
          onClick={() => router.push("/signup")}
          className="font-bold text-brand hover:text-brand-dark transition-colors cursor-pointer"
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
}