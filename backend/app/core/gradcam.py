import cv2
import numpy as np
import tensorflow as tf
import base64

# Dernière couche de convolution de ResNet50 (à vérifier avec model.summary())
LAST_CONV_LAYER = "conv5_block3_out"


def generate_gradcam(model, image_array, last_conv_layer_name="conv5_block3_out"):
    resnet_submodel = model.get_layer("resnet50")
    last_conv_layer = resnet_submodel.get_layer(last_conv_layer_name)

    # Étape 1 : modèle qui sort la dernière conv + la sortie du sous-modèle ResNet50
    grad_model = tf.keras.models.Model(
        inputs=resnet_submodel.input,
        outputs=[last_conv_layer.output, resnet_submodel.output]
    )

    with tf.GradientTape() as tape:
        conv_outputs, resnet_output = grad_model(image_array)

        # Étape 2 : on rejoue manuellement le reste des couches du modèle externe
        x = model.get_layer("global_average_pooling2d")(resnet_output)
        x = model.get_layer("dense")(x)
        x = model.get_layer("dropout")(x, training=False)
        predictions = model.get_layer("dense_1")(x)

        loss = predictions[:, 0]

    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    conv_outputs = conv_outputs[0]
    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    heatmap = tf.maximum(heatmap, 0) / (tf.reduce_max(heatmap) + 1e-8)
    return heatmap.numpy()


def overlay_heatmap(original_image_bgr, heatmap, alpha=0.4):
    """
    original_image_bgr : image originale en BGR, shape (224, 224, 3), valeurs 0-255
    heatmap : sortie de generate_gradcam(), shape (H, W) valeurs 0-1
    """
    heatmap_resized = cv2.resize(heatmap, (original_image_bgr.shape[1], original_image_bgr.shape[0]))
    heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap_resized), cv2.COLORMAP_JET)

    superimposed = cv2.addWeighted(original_image_bgr.astype(np.uint8), 1 - alpha,
                                    heatmap_colored, alpha, 0)
    return superimposed


def image_to_base64(image_bgr):
    """Convertit une image OpenCV (BGR) en string base64 pour l'envoi JSON."""
    _, buffer = cv2.imencode('.jpg', image_bgr)
    return base64.b64encode(buffer).decode('utf-8')