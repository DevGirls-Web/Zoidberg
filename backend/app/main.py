from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.core.preprocessing import preprocess_image
from app.core.prediction import predict_pneumonia

app = FastAPI(title="Zoidberg2.0 API")

# Autoriser les requêtes depuis ton frontend 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ← port Next.js
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "API Zoidberg2.0 opérationnelle"}


from app.core.gradcam import generate_gradcam, overlay_heatmap, image_to_base64
from app.core.prediction import predict_pneumonia, model

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Le fichier doit être une image")

    file_bytes = await file.read()

    try:
        image_array, original_bgr = preprocess_image(file_bytes)
        result = predict_pneumonia(image_array)

        heatmap = generate_gradcam(model, image_array)
        overlayed = overlay_heatmap(original_bgr, heatmap)
        gradcam_base64 = image_to_base64(overlayed)

        result["gradcam_image"] = f"data:image/jpeg;base64,{gradcam_base64}"

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de traitement : {str(e)}")

    return result