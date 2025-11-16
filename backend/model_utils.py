import io
import json
import numpy as np
from PIL import Image, ImageOps
from sklearn.cluster import KMeans
import tensorflow as tf

MODEL_PATH = "models/final_model.h5"
LABEL_MAP_PATH = "models/label_map.json"
IMG_SIZE = (224, 224)

# -------- MODEL LOADING -------- #

def load_model_and_labels():
    model = tf.keras.models.load_model(MODEL_PATH)
    with open(LABEL_MAP_PATH, "r") as f:
        label_map = json.load(f)
    sorted_keys = sorted(label_map.keys(), key=lambda x: int(x))
    class_names = [label_map[k] for k in sorted_keys]
    return model, class_names

model, CLASS_NAMES = load_model_and_labels()


# -------- PREPROCESSING -------- #

def preprocess_image(file_bytes):
    img = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    img = ImageOps.fit(img, IMG_SIZE, Image.LANCZOS)
    arr = np.array(img).astype(np.float32)
    arr = tf.keras.applications.efficientnet.preprocess_input(arr)
    return img, arr  # return PIL + np array


# -------- PREDICTION -------- #

def predict_topwear_bottomwear(img_array):
    x = np.expand_dims(img_array, axis=0)
    preds = model.predict(x, verbose=0)[0]
    probs = {CLASS_NAMES[i]: float(preds[i]) for i in range(len(CLASS_NAMES))}
    best_idx = int(np.argmax(preds))
    best_name = CLASS_NAMES[best_idx]
    best_prob = float(preds[best_idx])
    return best_name, best_prob, probs


# -------- COLOR PALETTE -------- #

def extract_palette(pil_img, n_colors=5):
    img = pil_img.convert("RGB")
    small = img.resize((150, 150))
    arr = np.array(small).reshape(-1, 3)

    if len(arr) < n_colors:
        n_colors = max(1, len(arr))

    kmeans = KMeans(n_clusters=n_colors, n_init=5)
    kmeans.fit(arr)

    centers = kmeans.cluster_centers_.astype(int)
    labels = kmeans.labels_
    counts = np.bincount(labels)
    total = counts.sum()

    palette = []
    for center, count in zip(centers, counts):
        r, g, b = center
        hex_color = "#{:02X}{:02X}{:02X}".format(r, g, b)
        pct = float(count) / float(total)
        palette.append({
            "hex": hex_color,
            "percent": round(pct * 100, 2),
            "rgb": [int(r), int(g), int(b)],
        })

    # Sort by percent desc
    palette.sort(key=lambda x: x["percent"], reverse=True)
    return palette
