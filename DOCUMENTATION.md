# Documentation Index

**Project:** Automated Algorithm Selection for 3D Nesting in Additive Manufacturing
**Author:** Jatin Rajani
**License:** MIT

---

This directory contains the complete technical documentation for the project. Each document is self-contained and covers a distinct aspect of the system.

---

## Documents

| File | Contents |
|---|---|
| [dataset_documentation.md](./dataset_documentation.md) | Dataset generation methodology, feature descriptions, class distribution, file formats, dataset versions, and usage limitations |
| [model_documentation.md](./model_documentation.md) | Problem formulation, XGBoost architecture rationale, all three training strategies, inference pipeline, performance metrics, model artefact loading instructions, and deployment considerations |
| [api_and_architecture.md](./api_and_architecture.md) | Full system architecture diagram, Django REST API configuration, endpoint reference, engine module internals, frontend page and component inventory, API integration flow, and production deployment checklist |

---

## Quick Reference

### Key Performance Figures

| Model | Accuracy | F1 Score |
|---|---|---|
| XGBoost-Strategy-1 (Baseline) | 37% | 0.30 |
| XGBoost-Strategy-2 (Strategist) | 55% | 0.52 |
| XGBoost-Strategy-3 (Final) | **67%** | **0.65** |

### API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health/` | Server health check |
| POST | `/api/predict/` | Algorithm recommendation |

### Dataset Summary

| Attribute | Value |
|---|---|
| Total Scenarios | 25,437 |
| Feature Columns (full) | 24 |
| Feature Columns (production) | 23 |
| Target Classes | 6 |
| Validation Protocol | 5-fold stratified cross-validation |
| License | MIT |

---

For the project-level overview, see [README.md](../README.md).
For the full MIT License text, see [LICENSE](../LICENSE).
