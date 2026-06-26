# Zoidberg 2.0 — Descriptions de Maquettes
## Design System : Médical / Vert Santé / Épuré

---

## 🎨 Palette de couleurs

```
Couleur principale   : #2D9B7A (vert sauge médical, apaisant)
Couleur secondaire   : #E8F5F0 (vert très pâle, fond de sections)
Couleur accent       : #1B6E54 (vert foncé, boutons primaires, hover)
Alerte / Pneumonie   : #E07856 (orange corail doux, jamais rouge agressif)
Succès / Normal      : #4CAF8C (vert validé)
Fond principal       : #FAFBFA (blanc cassé, presque blanc)
Texte principal      : #1A2E28 (gris-vert très foncé, pas de noir pur)
Texte secondaire     : #6B7D75 (gris-vert moyen)
Bordures / Séparateurs : #DCE8E3 (gris-vert très clair)
```

**Typographie** : police sans-serif moderne et lisible (type Inter, Poppins ou DM Sans). Titres en medium/semibold, jamais en gras épais. Beaucoup d'espace blanc, coins arrondis doux (8-12px), ombres très légères et diffuses (pas de drop shadow dur).

**Style général** : clinique mais chaleureux — éviter le bleu hôpital froid, viser un sentiment de soin et de sérénité. Icônes en outline fin (style Lucide ou Feather), jamais de pictogrammes médicaux criards (pas de croix rouge, pas de stéthoscope clipart).

---

## 1️⃣ Page d'Inscription (Sign Up)

**Layout** : écran centré, carte unique sur fond uni `#FAFBFA`, pas de sidebar.

**Structure de la carte** (largeur ~420px, centrée verticalement et horizontalement) :
- En haut : petit logo/icône (silhouette de poumon stylisée en ligne fine, couleur `#2D9B7A`) + nom du produit "Zoidberg" en typographie medium
- Sous-titre discret en gris : "Assistant IA de diagnostic par radiographie"
- Formulaire vertical avec champs espacés de 16px :
  - Nom complet
  - Email professionnel
  - Mot de passe (avec icône œil pour afficher/masquer)
  - Confirmation mot de passe
- Champs avec bordure fine `#DCE8E3`, fond blanc, coins arrondis 8px, label flottant au-dessus du champ
- Bouton principal "Créer mon compte" — pleine largeur, fond `#2D9B7A`, texte blanc, coins arrondis 10px, légère ombre verte au survol
- Lien discret en dessous : "Déjà un compte ? Se connecter" en couleur accent
- Petit texte légal en bas, gris clair : mentions de confidentialité des données médicales

**Ambiance visuelle** : très aéré, aucune image de fond chargée. Éventuellement un dégradé très subtil vert pâle → blanc en arrière-plan de l'écran complet.

---

## 2️⃣ Page de Connexion (Login)

**Layout** : identique à l'inscription pour la cohérence — carte centrée, même largeur.

**Structure de la carte** :
- Même logo/header que l'inscription
- Sous-titre : "Connectez-vous à votre espace clinique"
- Formulaire :
  - Email
  - Mot de passe (avec icône œil)
  - Lien aligné à droite : "Mot de passe oublié ?" en couleur accent, petite taille
- Bouton principal "Se connecter" — même style que le bouton d'inscription
- Séparateur discret "ou" (ligne fine + texte centré)
- Lien en bas : "Pas encore de compte ? Créer un compte"

**Détail différenciant** : sur cette page, on peut ajouter une illustration très minimaliste à droite de la carte (sur grand écran) — une forme organique abstraite en vert pâle représentant des poumons stylisés en line-art, sans texte ni détail clinique choquant.

---

## 3️⃣ Dashboard — Page principale

### Structure générale
Layout en 2 zones : **sidebar fixe à gauche** + **contenu principal scrollable à droite**.

---

### 🟩 Sidebar (fixe, largeur ~240px, fond `#1B6E54` ou blanc avec bordure)

- En haut : logo "Zoidberg" + icône poumon (même identité que login/signup)
- Navigation verticale avec icônes outline + libellés :
  - 🏠 Tableau de bord (actif, surligné en fond vert clair)
  - 📁 Historique des analyses
  - 👤 Mon profil
  - ⚙️ Paramètres
- En bas de la sidebar : avatar utilisateur + nom + bouton déconnexion discret

**Style** : si fond sombre `#1B6E54`, le texte est blanc/blanc cassé et l'item actif a un fond légèrement plus clair avec une barre verticale d'accent à gauche. Si fond blanc, l'item actif a un fond `#E8F5F0` avec texte `#1B6E54`.

---

### Contenu principal — 3 sections en cartes empilées ou en grille

**En-tête de page** : "Bonjour [Prénom]" + date du jour, ton chaleureux mais sobre.

---

#### 🟦 Section 1 — Upload de l'image (carte du haut, pleine largeur)

- Titre de section : "Analyser une radiographie"
- Zone de drag & drop avec bordure pointillée arrondie `#DCE8E3`, fond `#E8F5F0` très léger
- Icône upload (flèche vers le haut, outline fin) centrée
- Texte : "Glissez votre image ici ou cliquez pour parcourir"
- Sous-texte petit gris : "Formats acceptés : JPEG, PNG — Max 10 Mo"
- Une fois l'image chargée : aperçu miniature de la radio (coins arrondis, petite ombre) + bouton "Lancer l'analyse" en vert plein

---

#### 🟩 Section 2 — Résultat de la prédiction (carte centrale)

- Titre : "Résultat de l'analyse"
- Affichage en 2 colonnes :
  - **Gauche** : l'image radiographique uploadée, avec éventuellement une overlay Grad-CAM (zone chaude semi-transparente en orange doux sur la zone détectée)
  - **Droite** : 
    - Badge de résultat — pilule arrondie : soit "✅ Normal" (fond vert `#4CAF8C`, texte blanc) soit "⚠️ Pneumonie détectée" (fond orange corail `#E07856`, texte blanc) — jamais de rouge alarmant
    - Score de confiance affiché comme une barre de progression circulaire ou linéaire, ex : "Confiance : 94%"
    - Petite ligne discrète : "Modèle utilisé : SVM" ou "MobileNetV2"
    - Bouton secondaire "Télécharger le rapport" (outline, pas plein)

---

#### 🟨 Section 3 — Conseils, recommandations & prévention (carte du bas)

- Titre : "Conseils et prévention"
- Affichage en grille de 3 mini-cartes côte à côte (ou empilées sur mobile), chacune avec :
  - Petite icône outline en haut (ex : masque, goutte d'eau, calendrier médical — rester sobre, pas d'icônes choc)
  - Titre court : "Consulter un médecin", "Hydratation & repos", "Suivi recommandé"
  - Texte court de 1-2 lignes
- Le contenu de cette section change dynamiquement selon le résultat (ex : si pneumonie détectée, le ton est orienté "consultez rapidement un professionnel" ; si normal, ton orienté "continuez les bons gestes de prévention")
- Fond de carte légèrement différent (`#E8F5F0`) pour distinguer visuellement cette section informative des sections d'action

---

## 📐 Notes générales pour l'IA de génération

- Respecter une **hiérarchie visuelle claire** : titres > sous-titres > corps de texte, avec des tailles bien distinctes
- **Espacement généreux** entre les sections (32-48px), padding interne des cartes 24-32px
- Pas d'éléments 3D, pas de skeuomorphisme — design plat avec ombres légères uniquement
- Aucune image de personnes (médecins, patients) — rester abstrait et professionnel
- Le ton général doit inspirer **confiance et calme**, jamais l'urgence ou la peur, même quand le résultat indique une pneumonie
