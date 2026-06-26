import joblib
import tensorflow as tf
from pathlib import Path

MODEL_DIR = Path(__file__).parent.parent / "models"

# Chargement une seule fois au démarrage de l'API
model = tf.keras.models.load_model(MODEL_DIR / "resnet50_best_optimized.keras")
threshold = joblib.load(MODEL_DIR / "resnet50_threshold.joblib")

print(f"✅ Modèle ResNet50 chargé | Seuil : {threshold:.4f}")


def predict_pneumonia(image_array):
    """
    image_array : image prétraitée, shape (1, 224, 224, 3), déjà passée par preprocess_input
    """
    prob = model.predict(image_array).ravel()[0]
    prediction = "PNEUMONIA" if prob > threshold else "NORMAL"

    return {
        "prediction": prediction,
        "confidence": float(prob),
        "threshold_used": float(threshold)
    }