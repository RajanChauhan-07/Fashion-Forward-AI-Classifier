from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

from model_utils import preprocess_image, predict_topwear_bottomwear, extract_palette

app = FastAPI(title="Fashion Classifier Backend")

# ---------- CORS (allow your frontend) ---------- #
origins = [
    "http://localhost:5173",   # Vite default
    "http://localhost:8080",   # in case you're using this port
    "https://your-vercel-domain.vercel.app",  # replace later after deploy
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> Dict[str, Any]:
    return {"status": "ok"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ("image/jpeg", "image/png"):
        raise HTTPException(status_code=400, detail="File must be JPG or PNG")

    file_bytes = await file.read()

    try:
        pil_img, img_array = preprocess_image(file_bytes)
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read image")

    # prediction
    pred_name, pred_prob, probs = predict_topwear_bottomwear(img_array)

    # palette
    try:
        palette = extract_palette(pil_img, n_colors=5)
    except Exception:
        palette = []

    # match the JSON shape the frontend expects
    resp = {
        "predicted": pred_name,
        "confidence": pred_prob,
        "probabilities": probs,
        "palette": palette,
        "gradcam_url": None,   # we'll fill this later when Grad-CAM endpoint exists
        "vision": None         # future: Cloud Vision API results
    }
    return resp
