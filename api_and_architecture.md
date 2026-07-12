# API and System Architecture Documentation

**Project:** Automated Algorithm Selection for 3D Nesting in Additive Manufacturing
**Author:** Jatin Rajani
**Component:** Backend REST API and Frontend Research Website
**License:** MIT

---

## Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [Backend: Django REST API](#backend-django-rest-api)
   - [Project Structure](#project-structure)
   - [Configuration and Environment](#configuration-and-environment)
   - [API Endpoints Reference](#api-endpoints-reference)
   - [Engine Module: Feature Extraction and Inference](#engine-module-feature-extraction-and-inference)
   - [Security Configuration](#security-configuration)
   - [Running the Backend](#running-the-backend)
3. [Frontend: Research Website](#frontend-research-website)
   - [Technology Stack](#technology-stack)
   - [Application Pages](#application-pages)
   - [Component Library](#component-library)
   - [API Integration](#api-integration)
   - [Running the Frontend](#running-the-frontend)
4. [Integration: Full-Stack Communication](#integration-full-stack-communication)
5. [Production Deployment Checklist](#production-deployment-checklist)

---

## System Architecture Overview

The system comprises three loosely coupled layers:

```
+---------------------------+       HTTP POST        +---------------------------+
|   Research Website        |  ------------------>   |   Django REST API         |
|   (React / Vite / TS)     |  <------------------   |   (Python / XGBoost)      |
|   Port: 8080 (dev)        |       JSON Response    |   Port: 8000 (dev)        |
+---------------------------+                        +---------------------------+
                                                              |
                                                              | File I/O (once at startup)
                                                              v
                                                    +---------------------------+
                                                    |   ML Model Artefacts      |
                                                    |   (xgb_model_final.json,  |
                                                    |    scaler_final.joblib,   |
                                                    |    label_encoder.joblib)  |
                                                    +---------------------------+
```

- The **frontend** is a static React SPA that presents the research findings, hosts downloads, and provides a guided prediction interface at `/demo`.
- The **backend** is a Django server that exposes two REST endpoints. Its primary responsibility is to receive shape and priority parameters, extract geometric features, run inference against the XGBoost model, and return a structured JSON recommendation.
- The **model artefacts** are loaded from disk once per Gunicorn worker process and cached in memory for the lifetime of the process.

---

## Backend: Django REST API

### Project Structure

```
research_backend/
|-- manage.py                          # Django management entry point
|-- requirements.txt                   # Python dependency manifest
|-- .env.example                       # Environment variable template
|-- db.sqlite3                         # SQLite database (used by Django admin only)
|-- research_backend/                  # Django project package
|   |-- __init__.py
|   |-- settings.py                    # Central configuration; reads from environment
|   |-- urls.py                        # URL routing: /api/health/ and /api/predict/
|   |-- wsgi.py                        # WSGI entry point (Gunicorn)
|   `-- asgi.py                        # ASGI entry point (Daphne / Uvicorn, optional)
`-- prediction/                        # Django application
    |-- __init__.py
    |-- apps.py                        # AppConfig (application metadata)
    |-- admin.py                       # Django admin registration (empty)
    |-- models.py                      # Django ORM models (empty; no DB models used)
    |-- views.py                       # API view functions (health_check, predict_algorithm)
    |-- engine.py                      # Inference pipeline: artifact loading, feature extraction, prediction
    |-- tests.py                       # Test module (placeholder)
    |-- migrations/                    # Django migration files
    `-- ml_model/                      # Production model artefact directory
        |-- xgb_model_final.json       # Serialised XGBoost classifier
        |-- scaler_final.joblib        # Fitted StandardScaler
        `-- label_encoder_final.joblib # Fitted LabelEncoder
```

### Configuration and Environment

All configuration values are read from environment variables at server startup. In development, these are provided via a `.env` file. In production, they are injected by the deployment platform.

Copy `.env.example` to `.env` and populate the values before starting the server.

#### Environment Variables

| Variable | Type | Default | Description |
|---|---|---|---|
| `DJANGO_DEBUG` | Boolean | `False` | Enables Django debug mode. Must be `False` in production. |
| `DJANGO_SECRET_KEY` | String | (insecure placeholder) | The cryptographic signing key used by Django. Must be a long, random, unique string in production. |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated strings | `127.0.0.1,localhost` | The list of hostnames that the server will respond to. Set to the production domain in deployment. |
| `DJANGO_CORS_ALLOWED_ORIGINS` | Comma-separated URLs | `http://localhost:8080,http://127.0.0.1:8080` | Origins permitted to make cross-origin requests to the API. Must include the frontend URL. |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Comma-separated URLs | `http://localhost:8080,http://127.0.0.1:8080` | Origins trusted for CSRF verification. Must include the frontend URL. |
| `DJANGO_SECURE_SSL_REDIRECT` | Boolean | `True` (when `DEBUG=False`) | Redirects all HTTP requests to HTTPS. Disable only when TLS is terminated upstream. |
| `DJANGO_SECURE_HSTS_SECONDS` | Integer | `31536000` (1 year) | Duration in seconds for HTTP Strict Transport Security header. |

#### Installed Django Applications

| Application | Purpose |
|---|---|
| `django.contrib.admin` | Django administration interface at `/admin/` |
| `django.contrib.auth` | Authentication framework |
| `corsheaders` | Cross-Origin Resource Sharing middleware |
| `rest_framework` | Django REST Framework for API view rendering and response formatting |
| `prediction` | The core application containing inference logic |

#### Middleware Stack (ordered)

1. `SecurityMiddleware` -- Django security headers
2. `WhiteNoiseMiddleware` -- Static file serving with gzip compression and caching
3. `CorsMiddleware` -- CORS header injection (must precede CommonMiddleware)
4. `SessionMiddleware`
5. `CommonMiddleware`
6. `CsrfViewMiddleware`
7. `AuthenticationMiddleware`
8. `MessageMiddleware`
9. `XFrameOptionsMiddleware`

### API Endpoints Reference

#### GET /api/health/

Returns a simple JSON object confirming that the server is operational. No authentication is required.

**Request:** No body, no parameters.

**Response (200 OK):**
```json
{
  "status": "ok"
}
```

**Usage:** This endpoint is suitable for health monitoring probes, load balancer health checks, and CI/CD deployment verification.

---

#### POST /api/predict/

Accepts a JSON body describing the part composition and operator priorities of a 3D nesting job, executes the XGBoost inference pipeline, and returns the recommended packing algorithm.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
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

**Field Descriptions:**

| Field | Type | Range | Description |
|---|---|---|---|
| `shapes.cubes` | Integer | 0 - 20 | Number of 10 mm cubic parts |
| `shapes.plates` | Integer | 0 - 20 | Number of 50 x 50 x 2 mm flat plate parts |
| `shapes.spheres` | Integer | 0 - 20 | Number of spheres with 5 mm radius |
| `shapes.cylinders` | Integer | 0 - 20 | Number of cylinders with 5 mm radius and 25 mm height |
| `shapes.cones` | Integer | 0 - 20 | Number of cones with 5 mm radius and 20 mm height |
| `priorities.efficiency` | Float | 0.0 - 1.0 | Relative weight assigned to packing density / build volume utilisation |
| `priorities.stability` | Float | 0.0 - 1.0 | Relative weight assigned to physical stability (low centre of mass) |
| `priorities.speed` | Float | 0.0 - 1.0 | Relative weight assigned to computation speed (fast algorithm preferred) |

**Response (200 OK):**
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

**Response Field Descriptions:**

| Field | Type | Description |
|---|---|---|
| `algorithm` | String | The machine-readable name of the recommended algorithm |
| `confidence` | Float [0, 1] | The model's predicted probability for the recommended class |
| `explanation` | String | A human-readable contextual rationale for the recommendation |
| `alternatives` | Array | Up to 3 alternative algorithms with their predicted probability scores, sorted descending |

**Response (500 Internal Server Error):**
```json
{
  "error": "Exception message string"
}
```

**Error conditions:** An error is returned if no shape counts are provided (all zeros), if the model artefacts cannot be loaded, or if an unexpected exception occurs during inference.

---

### Engine Module: Feature Extraction and Inference

The `prediction/engine.py` module contains the complete inference pipeline. The key functions are:

#### `ensure_artifacts_loaded()`

A lazy singleton initialiser. It checks whether the module-level variables `model`, `scaler`, and `le` (label encoder) are populated. If not, it loads all three artefacts from the `ml_model/` directory. This function is called at the start of every prediction request and incurs disk I/O only once per process lifetime.

#### `generate_geometry_features(counts, priorities)`

Constructs a `pandas.DataFrame` with a single row containing the 23 input features expected by the production model.

**Process:**
1. For each shape type in `counts`, instantiate the corresponding number of `trimesh` mesh objects.
2. Compute `n_objects` (total count), `total_volume`, `volume_mean`, `volume_std`, and `volume_cv` from the mesh volumes.
3. Assign `type_diversity` as a fixed value of 0.5 (representing a generic mixed-geometry assumption for the API context).
4. Assign `w_eff`, `w_stab`, and `w_time` from the `priorities` dictionary.
5. Fill the remaining features (packing density, sphericity, aspect ratio, face count, centre of mass) with zero, as computing these requires the full physics simulation.
6. Construct and return a DataFrame with columns ordered exactly as specified in `feature_names.json`.

**Return value:** A `pandas.DataFrame` with one row and 23 columns, or `None` if all shape counts are zero.

#### `predict(counts, priorities)`

The top-level prediction function called by the view layer.

1. Calls `ensure_artifacts_loaded()`.
2. Calls `generate_geometry_features()` to obtain the input DataFrame.
3. Applies `scaler.transform()` to normalise the features.
4. Calls `model.predict_proba()` to obtain the class probability distribution.
5. Identifies the argmax class and the corresponding algorithm name via `le.inverse_transform()`.
6. Constructs and returns the response dictionary.

---

### Security Configuration

The `settings.py` file applies the following security measures when `DJANGO_DEBUG` is `False`:

| Setting | Value | Effect |
|---|---|---|
| `SESSION_COOKIE_SECURE` | `True` | Session cookies are transmitted over HTTPS only |
| `CSRF_COOKIE_SECURE` | `True` | CSRF cookies are transmitted over HTTPS only |
| `SECURE_SSL_REDIRECT` | Configurable | Redirects HTTP to HTTPS |
| `SECURE_HSTS_SECONDS` | 31536000 | Instructs browsers to enforce HTTPS for 1 year |
| `SECURE_HSTS_INCLUDE_SUBDOMAINS` | `True` | Extends HSTS to all subdomains |
| `SECURE_HSTS_PRELOAD` | `True` | Enables HSTS preloading |
| `SECURE_CONTENT_TYPE_NOSNIFF` | `True` | Prevents MIME-type sniffing |
| `X_FRAME_OPTIONS` | `DENY` | Prevents clickjacking via iframe embedding |
| `SECURE_PROXY_SSL_HEADER` | `HTTP_X_FORWARDED_PROTO: https` | Detects HTTPS from upstream proxies |

### Running the Backend

```bash
# Create and activate a virtual environment
python -m venv .venv
.venv\Scripts\activate       # Windows PowerShell
# source .venv/bin/activate  # macOS / Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env with appropriate values

# Apply migrations
python manage.py migrate

# Collect static files (required for production with WhiteNoise)
python manage.py collectstatic --no-input

# Start development server
python manage.py runserver

# Start production server (Gunicorn)
gunicorn research_backend.wsgi:application --bind 0.0.0.0:8000 --workers 2
```

---

## Frontend: Research Website

### Technology Stack

| Layer | Library | Version |
|---|---|---|
| JavaScript Framework | React | 18.3.1 |
| Build Tool | Vite | 5.4 |
| Language | TypeScript | 5.8 |
| Client-Side Routing | React Router DOM | 6.30.1 |
| UI Primitives | Radix UI | Various (see package.json) |
| Animation | Framer Motion | 12.23 |
| Data Visualisation | Recharts | 3.5.0 |
| Styling | Tailwind CSS | 3.4.17 |
| State and Data Fetching | TanStack Query (React Query) | 5.83.0 |
| Form Validation | React Hook Form + Zod | 7.61.1 + 3.25.76 |
| Toast Notifications | Sonner | 1.7.4 |
| Icon Set | Lucide React | 0.462.0 |

### Application Pages

The routing is defined in `src/App.tsx` using React Router DOM v6.

| Route | Component File | Description |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Landing page: research title, key statistics (25K+ scenarios, 3 models, 4 strategies, 67% accuracy), pipeline overview, and call-to-action buttons |
| `/dataset` | `src/pages/Dataset.tsx` | Dataset overview: class distribution chart, download buttons, physics-aware generation description |
| `/models` | `src/pages/Models.tsx` | Model repository: grid of all three models with accuracy, F1, precision, recall metrics and download links |
| `/models/:id` | `src/pages/ModelDetail.tsx` | Individual model detail view, routed by model ID |
| `/comparison` | `src/pages/Comparison.tsx` | Side-by-side strategy comparison: best-model spotlight, performance evolution line chart, full leaderboard table |
| `/demo` | `src/pages/Demo.tsx` | Live prediction interface: two-step wizard (shape configuration -> priority weights -> API call -> results display) |
| `/docs` | `src/pages/Docs.tsx` | Technical documentation: sidebar navigation with sections for overview, dataset guide, model details, training strategy, and contributing |
| `/downloads` | `src/pages/Downloads.tsx` | Downloads centre: categorised download items for dataset files, model weights, Jupyter notebooks, and PDF documentation |
| `/about` | `src/pages/About.tsx` | Researcher profile: name, photograph, biography, social links, research values, and contact options |
| `*` | `src/pages/NotFound.tsx` | 404 not found fallback |

### Component Library

Custom reusable components are located in `src/components/`:

| Component | Description |
|---|---|
| `Navbar.tsx` | Top navigation bar with links to all primary routes |
| `Footer.tsx` | Page footer with navigation links, social links, and license notice |
| `PageLayout.tsx` | Wrapper component that applies the Navbar and Footer to all pages |
| `GlassCard.tsx` | A styled card container with a glass-morphism-inspired border and background |
| `GradientButton.tsx` | Primary call-to-action button with a green gradient; supports both `href` and `onClick` |
| `OutlineButton.tsx` | Secondary button with a bordered outline style |
| `MetricBadge.tsx` | A compact badge for displaying a labelled metric value (e.g., "Accuracy: 67%") |
| `ModelCard.tsx` | Card component for displaying a model summary |
| `DatasetTable.tsx` | Tabular display of dataset schema or feature information |
| `SectionHeading.tsx` | Section title component with an optional subtitle |
| `NavLink.tsx` | Individual navigation link with active state styling |

The `src/components/ui/` directory contains primitive UI components from the shadcn/ui library built on top of Radix UI primitives.

### API Integration

The frontend communicates with the backend via a single `fetch` call in `src/pages/Demo.tsx`. The API base URL is configured via the `VITE_API_BASE_URL` environment variable, accessed through a utility in `src/lib/api.ts` (`buildApiUrl`).

**Environment variable:** Set `VITE_API_BASE_URL=http://127.0.0.1:8000` in `research_website_frontend/.env` for local development.

The prediction request is triggered when the user completes Step 2 of the demo wizard and clicks "Run Prediction". The result is stored in React component state and rendered in the results panel to the right of the wizard.

### Running the Frontend

```bash
cd research_website_frontend

# Copy the environment template
copy .env.example .env
# Set VITE_API_BASE_URL to the backend address

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Integration: Full-Stack Communication

### Development Setup

For local development, the backend and frontend servers run simultaneously on separate ports. The CORS configuration in `research_backend/research_backend/settings.py` must include the frontend origin (`http://localhost:8080` by default) to permit cross-origin API requests from the browser.

**Recommended local development configuration:**

1. Start the Django backend on `http://127.0.0.1:8000`.
2. Set `VITE_API_BASE_URL=http://127.0.0.1:8000` in the frontend `.env` file.
3. Ensure `DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080` in the backend `.env` file.
4. Start the Vite frontend on `http://localhost:8080` (or the port Vite assigns).

### Request Flow Diagram

```
User Interaction (Demo Page)
         |
         | Click "Run Prediction"
         v
handlePredict() in Demo.tsx
         |
         | fetch POST /api/predict/ with { shapes, priorities }
         v
predict_algorithm() in views.py
         |
         | calls engine.predict(shapes, priorities)
         v
ensure_artifacts_loaded()          generate_geometry_features()
    (load from ml_model/ dir)           (build 23-col DataFrame)
         |                                         |
         +-------------------+--------------------+
                             |
                             v
                 scaler.transform(input_df)
                             |
                             v
                model.predict_proba(scaled)
                             |
                             v
              Build response dict and return
                             |
         +-------------------+
         |
         v
REST Framework Response { algorithm, confidence, explanation, alternatives }
         |
         v
Frontend: setPrediction(data) --> render results panel
```

---

## Production Deployment Checklist

Before deploying to a production environment, verify the following items:

**Backend:**
- [ ] `DJANGO_DEBUG` is set to `False`.
- [ ] `DJANGO_SECRET_KEY` is set to a long, unique, cryptographically random value.
- [ ] `DJANGO_ALLOWED_HOSTS` includes the production domain.
- [ ] `DJANGO_CORS_ALLOWED_ORIGINS` and `DJANGO_CSRF_TRUSTED_ORIGINS` include the production frontend URL with the correct protocol (https).
- [ ] `python manage.py collectstatic --no-input` has been executed.
- [ ] The server is started via Gunicorn with an appropriate number of workers.
- [ ] TLS is configured at the load balancer or reverse proxy layer, and `X-Forwarded-Proto: https` is forwarded to Django.
- [ ] The `ml_model/` directory containing all three model artefacts is present and readable by the server process.

**Frontend:**
- [ ] `VITE_API_BASE_URL` is set to the production backend URL (e.g., `https://api.yourdomain.com`).
- [ ] `npm run build` has been executed successfully.
- [ ] The `dist/` directory is deployed to the static file hosting service or CDN.
- [ ] All files in the `public/` directory (ZIP archives, PDFs, model files, images) are present and accessible.
