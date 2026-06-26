import cv2
import numpy as np
from tensorflow.keras.applications.resnet50 import preprocess_input

IMG_SIZE = (224, 224)

def preprocess_image(file_bytes):
    """
    Prend les bytes bruts d'un fichier uploadé et retourne un array prêt pour le modèle.
    """
    img_array = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)  # BGR
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, IMG_SIZE).astype(np.float32)

    # img est ici en valeurs 0-255 (cv2 ne normalise jamais par défaut)
    img = preprocess_input(img)          # normalisation ResNet50
    img = np.expand_dims(img, axis=0)    # (224,224,3) → (1,224,224,3)

    return img