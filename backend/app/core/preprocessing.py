import cv2
import numpy as np
from tensorflow.keras.applications.resnet50 import preprocess_input, ResNet50

IMG_SIZE = (224, 224)

def preprocess_image(file_bytes):
    img_array = np.frombuffer(file_bytes, np.uint8)
    img_bgr = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    img_bgr_resized = cv2.resize(img_bgr, IMG_SIZE)  # ← garder cette version pour Grad-CAM

    img_rgb = cv2.cvtColor(img_bgr_resized, cv2.COLOR_BGR2RGB).astype(np.float32)
    img_model = preprocess_input(img_rgb)
    img_model = np.expand_dims(img_model, axis=0)

    return img_model, img_bgr_resized  # ← on retourne les deux