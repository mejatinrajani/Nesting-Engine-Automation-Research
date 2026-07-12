# Automated Algorithm Selection for 3D Nesting in Additive Manufacturing

A machine learning research project that trains interpretable XGBoost classifiers to predict the optimal packing algorithm for a given 3D nesting scenario, enabling intelligent and automated decision-making in additive manufacturing build preparation.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Research Motivation](#research-motivation)
3. [Repository Structure](#repository-structure)
4. [Dataset](#dataset)
5. [Machine Learning Models](#machine-learning-models)
6. [Backend API](#backend-api)
7. [Research Website Frontend](#research-website-frontend)
8. [Installation and Setup](#installation-and-setup)
9. [Usage](#usage)
10. [Results](#results)
11. [License](#license)
12. [Author and Contact](#author-and-contact)

---

## Project Overview

In additive manufacturing, the selection of a 3D part packing (nesting) algorithm has a direct and measurable impact on build volume utilisation, print time, and structural stability. Despite this, the prevailing industry practice relies on engineer heuristics or fixed algorithmic rules that do not adapt to the geometric composition of each job.

This research addresses that gap by formulating the algorithm selection problem as a supervised multi-class classification task. A dataset of 25,437 synthetic but physically realistic 3D nesting scenarios was generated, each exhaustively evaluated against six candidate algorithms. An XGBoost classifier was then trained on a set of 23 geometry-derived features to predict the single best-performing algorithm for any new scenario.

The final optimised model achieves 67% classification accuracy, representing a 3.2-fold improvement over random baseline selection.

All artefacts produced by this research, including the dataset, trained model weights, Jupyter notebooks, and documentation, are published openly under the MIT License.

---

## Research Motivation

The correct choice of a 3D nesting algorithm can be the difference between 90% build volume utilisation and a figure below 60%. The six algorithms evaluated in this study each have distinct performance characteristics:

| Algorithm | Primary Strength |
|---|---|
| NFP-Based (No-Fit Polygon) | Geometry-aware placement of irregular and flat parts |
| Layer Decomposer | Decomposing mixed-geometry jobs into optimal horizontal layers |
| Genetic Algorithm | Global optimisation of packing density for complex scenes |
| Bottom-Left with Gravity (BLF) | Physics-stable, gravity-driven part stacking |
| First Fit Decreasing (FFD) | High-speed heuristic sorting for time-critical jobs |
| Simulated Annealing | Escaping local optima in constrained packing problems |

No single algorithm dominates across all scenario types. This research builds an automated selector that evaluates the geometric features of each job and recommends the most appropriate algorithm, removing the burden of manual selection from the engineer.

---

## Repository Structure

```
3d_packing_algo_for_nesting_engine/
|
|-- Packing_Algorithm_Project/              # Core ML research directory
|   |
|   |-- Algorithm_Selection_for_3d_Packing_in_Additive_Manufacturing/
|   |   |-- data/
|   |   |   `-- final_dataset/             # v1 dataset (25,000 scenarios)
|   |   |       |-- features.csv           # 24-column feature matrix
|   |   |       |-- labels.csv             # Best-algorithm labels
|   |   |       |-- metadata.json          # Dataset schema and class statistics
|   |   |       |-- class_balance_final.png
|   |   |       `-- scenarios/             # Raw per-scenario JSON files
|   |   `-- model/                         # v1 trained model artefacts
|   |       |-- xgb_model.json             # XGBoost Strategy 1 (baseline)
|   |       |-- scaler.joblib              # StandardScaler fitted on training data
|   |       `-- label_encoder.joblib       # LabelEncoder for target classes
|   |
|   |-- Algorithm_Selection_for_3d_Packing_in_Additive_Manufacturing_v2/
|   |   |-- data/
|   |   |   `-- final_dataset/             # v2 dataset (identical 25,000 scenarios)
|   |   |       |-- features.csv           # Full 24-column feature matrix
|   |   |       |-- features_final_23cols.csv   # Reduced 23-column feature set
|   |   |       |-- labels.csv
|   |   |       |-- labels_final_6class.csv
|   |   |       |-- metadata.json
|   |   |       `-- scenarios/
|   |   |-- model/                         # v2 Strategy 2 model artefacts
|   |   |   |-- model_strategist.json      # XGBoost Strategist model
|   |   |   |-- scaler_strategist.joblib
|   |   |   `-- label_encoder_strategist.joblib
|   |   `-- model2/                        # v2 Strategy 3 (final) model artefacts
|   |       |-- xgb_model_final.json       # Best performing model (67% accuracy)
|   |       |-- scaler_final.joblib
|   |       |-- label_encoder_final.joblib
|   |       `-- feature_names.json         # Ordered list of the 23 input features
|   |
|   |-- Model_for_algorithm_selection_in_3d_printing_in_additive_manufacturing.ipynb
|   |-- Synopsis Document.pdf
|   |-- dataset_documentation_jovac.docx
|   `-- model_documentation.docx
|
|-- research_backend/                      # Django REST API server
|   |-- research_backend/                  # Django project configuration
|   |   |-- settings.py
|   |   |-- urls.py
|   |   |-- wsgi.py
|   |   `-- asgi.py
|   |-- prediction/                        # Django application (core logic)
|   |   |-- engine.py                      # Feature extraction and inference pipeline
|   |   |-- views.py                       # REST API endpoint handlers
|   |   |-- ml_model/                      # Deployed model artefacts (production copies)
|   |   |   |-- xgb_model_final.json
|   |   |   |-- scaler_final.joblib
|   |   |   `-- label_encoder_final.joblib
|   |   `-- migrations/
|   |-- manage.py
|   |-- requirements.txt
|   `-- .env.example
|
|-- research_website_frontend/             # React/Vite research publication website
|   |-- src/
|   |   |-- pages/                         # Application pages (Home, Dataset, Models, Demo, etc.)
|   |   |-- components/                    # Reusable UI components
|   |   |-- data/                          # Static JSON data for the frontend
|   |   |-- hooks/                         # Custom React hooks
|   |   `-- lib/                           # Utility functions
|   |-- public/                            # Static assets served publicly
|   |   |-- *.ipynb                        # Training notebook (publicly downloadable)
|   |   |-- *.pdf                          # Documentation PDFs
|   |   |-- *.zip                          # Downloadable dataset and model bundles
|   |   `-- *.json / *.joblib / *.jpg      # Model artefacts and media
|   |-- package.json
|   |-- vite.config.ts
|   `-- .env.example
|
|-- README.md
|-- LICENSE
`-- .gitignore
```

---

## Dataset

### Overview

The dataset consists of 25,437 synthetically generated 3D nesting scenarios, each representing a realistic additive manufacturing build job. Every scenario was evaluated exhaustively using all six candidate packing algorithms. The label assigned to each scenario is the name of the algorithm that achieved the highest packing efficiency under gravity-constrained simulation.

### Generation Methodology

Scenarios were generated by a custom physics-aware simulator written in Python using the `trimesh` library. The simulator places randomly sampled collections of canonical 3D geometries (cubes, flat plates, spheres, cylinders, and cones) into a standard build volume of 300 x 300 x 400 mm, consistent with commonly used Fused Deposition Modelling and SLA printer dimensions. The number of parts per job ranges from 5 to 50.

### Feature Engineering

Twenty-four features are extracted per scenario. These features are grouped into the following categories:

| Feature Group | Features |
|---|---|
| Object Count | `n_objects`, `type_diversity` |
| Volume Statistics | `total_volume`, `volume_mean`, `volume_std`, `volume_cv` |
| Packing Density | `packing_density_mean`, `packing_density_std`, `packing_density_cv` |
| Sphericity | `sphericity_mean`, `sphericity_std`, `sphericity_cv` |
| Convexity | `convexity_mean`, `convexity_std`, `convexity_cv` |
| Aspect Ratio | `aspect_ratio_mean`, `aspect_ratio_std`, `aspect_ratio_cv` |
| Face Count | `face_count_mean`, `face_count_std`, `face_count_cv` |
| Centre of Mass Height | `com_height_mean`, `com_height_std`, `com_height_cv` |

The final production model uses a reduced set of 23 features, replacing the convexity group with three user-supplied priority weights: `w_eff` (efficiency), `w_stab` (stability), and `w_time` (computation speed).

### Class Distribution

| Algorithm | Count | Proportion |
|---|---|---|
| NFP-Based | 7,749 | 31.0% |
| Layer Decomposer | 6,227 | 24.9% |
| Genetic Algorithm | 5,432 | 21.7% |
| BLF Gravity | 2,547 | 10.2% |
| First Fit Decreasing | 1,815 | 7.3% |
| Simulated Annealing | 1,230 | 4.9% |

The class imbalance is a property of the underlying physical problem and is preserved in the training data to reflect real-world scenario distributions.

### Validation

All models were validated using 5-fold stratified cross-validation to ensure robustness across class-imbalanced data.

---

## Machine Learning Models

Three distinct training strategies were pursued, each building incrementally upon the previous.

### Strategy 1 -- Baseline (XGBoost-Strategy-1)

The baseline model was trained from scratch on the full 24-feature dataset using default XGBoost hyperparameters. This establishes the lower bound of achievable performance.

- **Test Accuracy:** 37%
- **Macro F1 Score:** 0.30
- **Precision:** 0.33
- **Recall:** 0.38
- **Model File:** `xgb_model.json` (~98 MB)
- **Training Time:** approximately 4.2 hours

### Strategy 2 -- Strategist Model (XGBoost-Strategy-2)

A secondary "strategist" XGBoost model was trained to guide and correct the predictions of the baseline. This meta-learning approach improves performance significantly by learning from the error patterns of Strategy 1.

- **Test Accuracy:** 55%
- **Macro F1 Score:** 0.52
- **Precision:** 0.52
- **Recall:** 0.55
- **Model File:** `model_strategist.json` (~52 MB)

### Strategy 3 -- Final Optimised Model (XGBoost-Strategy-3)

The final model incorporates hyperparameter tuning using grid search, early stopping, and a refined 23-feature set that replaces the geometric convexity features with user-supplied priority weights. This model is used in production.

- **Test Accuracy:** 67%
- **Macro F1 Score:** 0.65
- **Precision:** 0.64
- **Recall:** 0.70
- **Model File:** `xgb_model_final.json` (~138 MB)
- **Training Time:** approximately 4.2 hours

---

## Backend API

The backend is a Django 5.2 REST API that serves real-time algorithm predictions. It is built with Django REST Framework and uses Gunicorn with WhiteNoise for production static file serving.

### Technology Stack

| Component | Library / Version |
|---|---|
| Web Framework | Django 5.2.1 |
| REST API | Django REST Framework 3.15.2 |
| CORS | django-cors-headers 4.4.0 |
| Production Server | Gunicorn 22.0.0 |
| Static Files | WhiteNoise 6.7.0 |
| ML Inference | XGBoost 2.1.1 |
| Feature Extraction | trimesh 4.4.9, NumPy 2.0.2, Pandas 2.2.2 |
| Serialisation | joblib 1.4.2 |

### API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health/` | Health check returning `{"status": "ok"}` |
| POST | `/api/predict/` | Accepts shape counts and priority weights; returns algorithm recommendation |

### Prediction Request Schema

```json
{
  "shapes": {
    "cubes": 5,
    "plates": 8,
    "spheres": 3,
    "cylinders": 4,
    "cones": 2
  },
  "priorities": {
    "efficiency": 0.85,
    "stability": 0.70,
    "speed": 0.60
  }
}
```

### Prediction Response Schema

```json
{
  "algorithm": "nfp_based",
  "confidence": 0.782,
  "explanation": "Detected flat or irregular shapes. NFP is optimal for geometry-aware nesting.",
  "alternatives": [
    { "name": "layer_decomposer", "score": 0.134 },
    { "name": "genetic", "score": 0.061 },
    { "name": "blf_gravity", "score": 0.023 }
  ]
}
```

---

## Research Website Frontend

The research publication website is a React 18 single-page application built with Vite and TypeScript. It presents the research findings interactively and provides access to the live prediction API.

### Technology Stack

| Component | Library / Version |
|---|---|
| Framework | React 18.3.1 |
| Build Tool | Vite 5.4 |
| Language | TypeScript 5.8 |
| Routing | React Router DOM 6.30 |
| UI Components | Radix UI Primitives, shadcn/ui |
| Animation | Framer Motion 12 |
| Charts | Recharts 3.5 |
| Styling | Tailwind CSS 3.4 |
| HTTP / State | TanStack Query 5 |

### Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Research overview and key statistics |
| `/dataset` | Dataset | Dataset description, class distribution, and downloads |
| `/models` | Models | Model repository with metrics and download links |
| `/models/:id` | Model Detail | Detailed view of a specific model |
| `/comparison` | Comparison | Side-by-side performance chart and leaderboard |
| `/demo` | Demo | Live two-step prediction interface backed by the API |
| `/docs` | Docs | Full technical documentation |
| `/downloads` | Downloads | Centralised download centre for all research artefacts |
| `/about` | About | Researcher profile and contact information |

---

## Installation and Setup

### Prerequisites

- Python 3.11 or later
- Node.js 20 or later and npm
- Git

### Backend Setup

```bash
# Navigate to the backend directory
cd research_backend

# Create and activate a Python virtual environment
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS / Linux

# Install Python dependencies
pip install -r requirements.txt

# Copy the example environment file and configure it
copy .env.example .env

# Apply database migrations
python manage.py migrate

# Run the development server
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000`.

### Backend Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DJANGO_DEBUG` | Enables debug mode | `False` |
| `DJANGO_SECRET_KEY` | Django cryptographic secret key | Must be set in production |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated list of permitted hostnames | `127.0.0.1,localhost` |
| `DJANGO_CORS_ALLOWED_ORIGINS` | Comma-separated list of permitted CORS origins | `http://localhost:8080` |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Comma-separated list of CSRF-trusted origins | `http://localhost:8080` |
| `DJANGO_SECURE_SSL_REDIRECT` | Force HTTPS redirect in production | `True` |
| `DJANGO_SECURE_HSTS_SECONDS` | HSTS max-age in seconds | `31536000` |

### Frontend Setup

```bash
# Navigate to the frontend directory
cd research_website_frontend

# Copy the example environment file and configure it
copy .env.example .env

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

The website will be available at `http://localhost:8080` by default (refer to Vite output for the exact port).

### Frontend Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Full base URL of the backend API | `http://127.0.0.1:8000` |

---

## Usage

### Live Prediction via Demo Page

1. Navigate to `/demo` on the running frontend.
2. In Step 1, adjust the slider controls to specify the number of parts for each geometry type (cubes, flat plates, spheres, cylinders, and cones).
3. In Step 2, set the relative importance of each packing objective: packing density efficiency, physical stability, and computation speed.
4. Click "Run Prediction" to submit the request to the backend API.
5. The results panel will display the recommended algorithm, the model's confidence score, a textual rationale, and a ranked list of alternative candidates.

### Direct API Integration

The `/api/predict/` endpoint accepts standard JSON over HTTP POST and can be integrated directly into any manufacturing software pipeline or notebook workflow. Refer to the Backend API section above for the complete request and response schemas.

---

## Results

| Model | Strategy | Accuracy | F1 Score | Precision | Recall |
|---|---|---|---|---|---|
| XGBoost-Strategy-1 | Training from scratch | 37% | 0.30 | 0.33 | 0.38 |
| XGBoost-Strategy-2 | Strategist meta-learning | 55% | 0.52 | 0.52 | 0.55 |
| XGBoost-Strategy-3 | Final fine-tuned (production) | **67%** | **0.65** | **0.64** | **0.70** |

The progression from Strategy 1 to Strategy 3 represents a 30-percentage-point improvement in classification accuracy, achieved through the combination of meta-learning guidance and systematic hyperparameter optimisation.

---

## License

This project and all associated artefacts, including source code, trained model weights, generated datasets, documentation, and notebooks, are released under the **MIT License**.

See the [LICENSE](./LICENSE) file in this repository for the full text of the licence.

---

## Author and Contact

**Jatin Rajani**
Machine Learning Researcher -- Additive Manufacturing AI

- **Portfolio:** https://jatinrajani.me/
- **Email:** mejatinrajani.tech@gmail.com
- **GitHub:** https://github.com/mejatinrajani
- **LinkedIn:** https://linkedin.com/in/mejatinrajani
- **Research Repository:** https://github.com/mejatinrajani/Nesting-Engine-Automation-Research

Contributions in the form of additional real-printer data, improved feature sets, new algorithm implementations, or documentation improvements are welcome. Please open an issue or submit a pull request on the repository above.
