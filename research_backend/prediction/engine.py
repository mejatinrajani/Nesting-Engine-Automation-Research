import os

import joblib
import numpy as np
import pandas as pd
import trimesh
import trimesh.creation as creation
import xgboost as xgb

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "ml_model")

model = None
scaler = None
le = None


def ensure_artifacts_loaded():
    global model, scaler, le

    if model is not None and scaler is not None and le is not None:
        return

    print("--- Loading ML Artifacts ---")
    loaded_model = xgb.XGBClassifier()
    loaded_model.load_model(os.path.join(MODEL_DIR, "xgb_model_final.json"))

    model = loaded_model
    scaler = joblib.load(os.path.join(MODEL_DIR, "scaler_final.joblib"))
    le = joblib.load(os.path.join(MODEL_DIR, "label_encoder_final.joblib"))
    print("ML artifacts loaded")


def generate_geometry_features(counts, priorities):
    """
    Converts user inputs (counts of shapes) into the 23 features expected by the model.
    """
    meshes = []

    for _ in range(int(counts.get("cubes", 0))):
        meshes.append(creation.box(extents=[10, 10, 10]))

    for _ in range(int(counts.get("plates", 0))):
        meshes.append(creation.box(extents=[50, 50, 2]))

    for _ in range(int(counts.get("spheres", 0))):
        meshes.append(creation.icosphere(radius=5))

    for _ in range(int(counts.get("cylinders", 0))):
        meshes.append(creation.cylinder(radius=5, height=25))

    for _ in range(int(counts.get("cones", 0))):
        meshes.append(creation.cone(radius=5, height=20))

    if not meshes:
        return None

    volumes = [m.volume for m in meshes]
    features = {
        "n_objects": len(meshes),
        "type_diversity": 0.5,
        "total_volume": sum(volumes),
        "volume_mean": np.mean(volumes),
        "volume_std": np.std(volumes),
        "volume_cv": np.std(volumes) / (np.mean(volumes) + 1e-9),
    }

    features["w_eff"] = float(priorities["efficiency"])
    features["w_stab"] = float(priorities["stability"])
    features["w_time"] = float(priorities["speed"])

    feature_order = [
        "n_objects",
        "type_diversity",
        "total_volume",
        "volume_mean",
        "volume_std",
        "volume_cv",
        "packing_density_mean",
        "packing_density_std",
        "packing_density_cv",
        "sphericity_mean",
        "sphericity_std",
        "sphericity_cv",
        "aspect_ratio_mean",
        "aspect_ratio_std",
        "aspect_ratio_cv",
        "face_count_mean",
        "face_count_std",
        "face_count_cv",
        "com_height_mean",
        "com_height_std",
        "w_eff",
        "w_stab",
        "w_time",
    ]

    input_data = {key: features.get(key, 0) for key in feature_order}
    return pd.DataFrame([input_data])


def predict(counts, priorities):
    ensure_artifacts_loaded()

    input_df = generate_geometry_features(counts, priorities)
    if input_df is None:
        return {"error": "No shapes provided"}

    input_scaled = scaler.transform(input_df)
    pred_probs = model.predict_proba(input_scaled)[0]
    pred_idx = np.argmax(pred_probs)

    algorithm_name = le.inverse_transform([pred_idx])[0]
    confidence = float(pred_probs[pred_idx])

    class_names = le.classes_
    alternatives = []
    for index, name in enumerate(class_names):
        if index != pred_idx:
            alternatives.append({
                "name": name,
                "score": float(pred_probs[index]),
            })

    alternatives = sorted(alternatives, key=lambda item: item["score"], reverse=True)[:3]

    return {
        "algorithm": algorithm_name,
        "confidence": confidence,
        "alternatives": alternatives,
    }
