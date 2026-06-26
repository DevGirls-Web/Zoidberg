from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.core.preprocessing import preprocess_image
from app.core.prediction import predict_pneumonia

app = FastAPI(title="Zoidberg2.0 API")

# Autoriser les requêtes depuis ton frontend React (à ajuster selon ton port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite par défaut
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "API Zoidberg2.0 opérationnelle"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Vérification du type de fichier
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Le fichier doit être une image")

    file_bytes = await file.read()

    try:
        image_array = preprocess_image(file_bytes)
        result = predict_pneumonia(image_array)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de traitement : {str(e)}")

    return result