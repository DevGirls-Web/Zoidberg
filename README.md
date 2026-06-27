# 🩺 Zoidberg 2.0 — Computer Aided Diagnosis

Système d'aide au diagnostic de la **pneumonie** à partir de radiographies pulmonaires, utilisant le Machine Learning et le Deep Learning.

Projet réalisé dans le cadre du cursus **Epitech** (module T-DEV-810).

---

## 🎯 Objectif

À partir d'une image de radiographie thoracique, le système :
1. Analyse l'image via un modèle de Deep Learning (**ResNet50** — Transfer Learning)
2. Prédit si le patient est **NORMAL** ou présente une **PNEUMONIA**
3. Génère une carte de chaleur (**Grad-CAM**) localisant les zones suspectes sur l'image
4. Retourne le résultat avec un score de confiance

---

## 🏗️ Architecture du projet

```
Zoidberg/
├── backend/          → API FastAPI (prédiction + Grad-CAM)
├── frontend/         → Interface web Next.js
└── notebooks/        → Notebooks Jupyter (prétraitement, entraînement des modèles)
```

**Modèles explorés et comparés** : Random Forest, SVM, CNN (from scratch), MobileNetV2, **ResNet50** (modèle retenu en production).

---

## 🛠️ Stack technique

| Couche | Technologies |
|---|---|
| Machine Learning | Python, TensorFlow/Keras, scikit-learn, OpenCV |
| Backend | FastAPI, Uvicorn |
| Frontend | Next.js, TypeScript, React |

---

## 🚀 Lancer le projet

### Backend

```bash
cd backend

# Créer et activer l'environnement virtuel
python3 -m venv env_backend
source env_backend/bin/activate        # Linux / WSL / macOS
# env_backend\Scripts\activate         # Windows

# Installer les dépendances
pip install -r requirements.txt

# Lancer le serveur
uvicorn app.main:app --reload
```

L'API est accessible sur **http://localhost:8000**

> ⚠️ Le modèle entraîné (`resnet50_best_optimized.keras`) et le seuil (`resnet50_threshold.joblib`) doivent être placés dans `backend/app/models/`.

---

### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application est accessible sur **http://localhost:3000**

> Vérifie que la variable d'environnement `NEXT_PUBLIC_API_URL` pointe bien vers `http://localhost:8000` (fichier `.env.local`).

---

## 📡 API — Endpoints

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/` | Vérifie que l'API est opérationnelle |
| `POST` | `/predict` | Envoie une image (form-data, champ `file`) → retourne la prédiction, le score de confiance et l'image Grad-CAM |

**Exemple de réponse `/predict` :**
```json
{
  "prediction": "PNEUMONIA",
  "confidence": 0.87,
  "threshold_used": 0.62,
  "gradcam_image": "data:image/jpeg;base64,..."
}
```

---

## 📊 Méthodologie (Data Science)

- Prétraitement : redimensionnement, normalisation, analyse des dimensions du dataset
- Validation : split train/validation/test stratifié, cross-validation (5 folds), comparaison avec un simple train/test split
- Tuning des hyperparamètres sur le jeu de validation
- Gestion du déséquilibre des classes (class weighting)
- Comparaison de 5 modèles avec ajustement du seuil de décision pour chacun
- Explicabilité du modèle final via Grad-CAM

Le détail complet de la méthodologie, des métriques et des résultats est disponible dans le dossier `notebooks/` et le document de synthèse PDF.

---

## 👥 Équipe

- Mériadeck AMOUSSOU
- Ruth KOKOU
- Aristofane LOKO

---

## ⚠️ Avertissement

Cet outil est un projet académique à but pédagogique. Il ne constitue **en aucun cas un outil de diagnostic médical certifié** et ne doit pas remplacer l'avis d'un professionnel de santé.
