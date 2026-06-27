// components/features/dashboard/FeedbackSection.tsx
"use client";

import { useState } from "react";
import { Check, X, Send, ThumbsUp, ThumbsDown } from "lucide-react";
import { clsx } from "clsx";

interface FeedbackSectionProps {
  prediction: string; // "NORMAL" | "PNEUMONIA"
  onFeedback?: (isCorrect: boolean, correctPrediction?: string) => void;
}

export function FeedbackSection({ prediction, onFeedback }: FeedbackSectionProps) {
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "satisfied" | "correcting">("idle");
  const [selectedCorrection, setSelectedCorrection] = useState<"NORMAL" | "PNEUMONIA">(
    prediction === "NORMAL" ? "PNEUMONIA" : "NORMAL"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSatisfied() {
    setFeedbackStatus("satisfied");
    onFeedback?.(true);
  }

  function handleNotSatisfied() {
    setIsModalOpen(true);
  }

  function handleSubmitCorrection() {
    setIsSubmitting(true);
    // Simuler l'envoi au backend
    setTimeout(() => {
      setFeedbackStatus("correcting");
      setIsModalOpen(false);
      setIsSubmitting(false);
      onFeedback?.(false, selectedCorrection);
    }, 800);
  }

  function handleCancel() {
    setIsModalOpen(false);
    // Retour à idle si l'utilisateur annule sans choisir
    if (feedbackStatus === "idle") {
      // on reste en idle
    }
  }

  // Si déjà satisfait ou corrigé, on affiche un petit message
  if (feedbackStatus === "satisfied") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
        <Check size={16} className="shrink-0" />
        <span>Merci pour votre retour !</span>
      </div>
    );
  }

  if (feedbackStatus === "correcting") {
    return (
      <div className="flex items-center gap-2 text-sm text-brand bg-brand-light/30 border border-brand/20 rounded-lg px-4 py-2.5">
        <Send size={16} className="shrink-0" />
        <span>Correction envoyée ! Merci d&apos;aider à améliorer le modèle. 🙏</span>
      </div>
    );
  }

  return (
    <>
      {/* Feedback barre */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/60 mt-2">
        <span className="text-sm text-muted-foreground">
          Êtes-vous satisfait du résultat prédit ?
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSatisfied}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
          >
            <ThumbsUp size={14} />
            Oui
          </button>
          <button
            onClick={handleNotSatisfied}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
          >
            <ThumbsDown size={14} />
            Non
          </button>
        </div>
      </div>

      {/* Modal de correction */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleCancel}
        >
          <div
            className="bg-card rounded-[24px] shadow-2xl max-w-md w-full p-8 border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    ✏️ Aidez-nous à améliorer le modèle
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Quelle est la bonne prédiction selon vous ?
                  </p>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 p-3 border border-border rounded-[12px] cursor-pointer hover:bg-background transition-colors">
                  <input
                    type="radio"
                    name="correction"
                    value="NORMAL"
                    checked={selectedCorrection === "NORMAL"}
                    onChange={() => setSelectedCorrection("NORMAL")}
                    className="size-4 accent-brand cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">Normal</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-[12px] cursor-pointer hover:bg-background transition-colors">
                  <input
                    type="radio"
                    name="correction"
                    value="PNEUMONIA"
                    checked={selectedCorrection === "PNEUMONIA"}
                    onChange={() => setSelectedCorrection("PNEUMONIA")}
                    className="size-4 accent-brand cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground">Pneumonie</span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSubmitCorrection}
                  disabled={isSubmitting}
                  className={clsx(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-medium text-white transition-colors",
                    isSubmitting
                      ? "bg-brand/60 cursor-not-allowed"
                      : "bg-brand hover:bg-brand-dark cursor-pointer"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2.5 rounded-[12px] text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}