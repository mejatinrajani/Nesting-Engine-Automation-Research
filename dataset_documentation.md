# Dataset Documentation

**Project:** Automated Algorithm Selection for 3D Nesting in Additive Manufacturing
**Author:** Jatin Rajani
**Version:** 2.0 (Final)
**Last Updated:** 2025-11-17
**License:** MIT

---

## Table of Contents

1. [Purpose and Scope](#purpose-and-scope)
2. [Generation Methodology](#generation-methodology)
3. [Build Volume and Part Geometry](#build-volume-and-part-geometry)
4. [Labelling Procedure](#labelling-procedure)
5. [Feature Descriptions](#feature-descriptions)
6. [Production Feature Set (23 Columns)](#production-feature-set-23-columns)
7. [Dataset Files and Formats](#dataset-files-and-formats)
8. [Class Distribution and Balance](#class-distribution-and-balance)
9. [Dataset Versions](#dataset-versions)
10. [Reproducibility](#reproducibility)
11. [Intended Use and Limitations](#intended-use-and-limitations)

---

## Purpose and Scope

This dataset was created to support supervised machine learning research into automated packing algorithm selection for additive manufacturing. Each record in the dataset corresponds to a single 3D nesting scenario: a randomly assembled collection of three-dimensional geometric parts that must be placed inside a standard printer build volume.

The dataset was generated synthetically because no sufficiently large labelled dataset existed in the public domain. Synthetic generation allowed precise control over the geometric composition of each scenario and enabled exhaustive, ground-truth evaluation using all candidate packing algorithms.

The dataset is intended to serve researchers and practitioners who wish to:

- Train or fine-tune machine learning classifiers for algorithm selection.
- Benchmark new packing algorithms against a standardised reference set.
- Analyse the geometric properties that determine the superiority of one algorithm over another.
- Reproduce the experiments described in the accompanying research.

---

## Generation Methodology

The dataset was produced by a custom Python script using the `trimesh` geometry processing library. The generation process follows an incremental, chunk-based approach, as recorded in the `metadata.json` file (`"generation_mode": "incremental"`, `"last_chunk": 24`).

### Scenario Construction

For each scenario, the following procedure was applied:

1. A random number of parts is drawn uniformly from the range [5, 50].
2. For each part, a geometry type is selected at random from the five canonical types: cube, flat plate, sphere, tall cylinder, and cone.
3. A mesh object is instantiated using `trimesh.creation` primitives at fixed representative dimensions (detailed in the next section).
4. The collection of mesh objects constitutes a single scenario.

### Algorithm Evaluation

Each scenario was evaluated against all six candidate packing algorithms. The evaluation metric is packing efficiency, defined as the ratio of the total occupied volume to the build volume under physically realistic gravity-constrained placement. The algorithm that achieves the highest packing efficiency for a given scenario is designated as the ground-truth label for that record.

The six algorithms evaluated are:

- `blf_gravity` -- Bottom-Left with Gravity: places parts from the bottom-left corner of the build plate, applying a gravitational downward force to minimise the centre of mass height.
- `first_fit_decreasing` -- First Fit Decreasing: sorts parts by volume in descending order and places each in the first available position; a fast deterministic heuristic.
- `simulated_annealing` -- Simulated Annealing: a stochastic search algorithm that probabilistically accepts suboptimal placements to escape local optima.
- `nfp_based` -- No-Fit Polygon: computes the exact geometric boundary within which one part cannot be placed without overlapping another, enabling geometry-aware placement for irregular and flat shapes.
- `genetic` -- Genetic Algorithm: an evolutionary optimisation algorithm that evolves a population of candidate placement sequences over multiple generations to maximise packing density.
- `layer_decomposer` -- Layer Decomposer: decomposes the build job into horizontal layers and packs each layer independently, well-suited for mixed-geometry jobs with parts of varying heights.

---

## Build Volume and Part Geometry

### Standard Build Volume

All scenarios use a build volume of **300 mm x 300 mm x 400 mm**, corresponding to the build envelope of commonly used mid-range Fused Deposition Modelling printers such as the Prusa MK4 series and similar Stereolithography systems.

### Canonical Part Dimensions

The five geometry types are instantiated at fixed representative dimensions in the simulation:

| Geometry Type | Trimesh Primitive | Dimensions |
|---|---|---|
| Cube | `creation.box` | 10 mm x 10 mm x 10 mm |
| Flat Plate | `creation.box` | 50 mm x 50 mm x 2 mm |
| Sphere | `creation.icosphere` | Radius: 5 mm |
| Tall Cylinder | `creation.cylinder` | Radius: 5 mm, Height: 25 mm |
| Cone | `creation.cone` | Radius: 5 mm, Height: 20 mm |

These dimensions were chosen to be representative of common industrial part families and to create meaningful geometric diversity within a single scenario.

---

## Labelling Procedure

Each scenario record is assigned exactly one label: the name of the algorithm that achieved the highest packing efficiency when evaluated exhaustively against all six algorithms. This is a hard-label, single-class labelling scheme; ties are broken by a deterministic ordering of the algorithm names.

The label space is therefore:

```
{ blf_gravity, first_fit_decreasing, simulated_annealing, nfp_based, genetic, layer_decomposer }
```

Labels are stored as plain strings in `labels.csv` and encoded to integer indices for model training using a scikit-learn `LabelEncoder`, which is serialised and stored alongside each model as `label_encoder.joblib`.

---

## Feature Descriptions

The following table describes all 24 features present in the primary `features.csv` file. All statistics marked as `_mean`, `_std`, and `_cv` are computed across all parts within a single scenario.

| Feature Name | Data Type | Description |
|---|---|---|
| `n_objects` | Integer | Total number of part instances in the scenario |
| `type_diversity` | Float [0, 1] | Normalised count of distinct geometry types present; 0 = all same type, 1 = all five types present |
| `total_volume` | Float (mm^3) | Sum of the volumes of all individual parts |
| `volume_mean` | Float (mm^3) | Arithmetic mean of individual part volumes |
| `volume_std` | Float (mm^3) | Standard deviation of individual part volumes |
| `volume_cv` | Float | Coefficient of variation of part volumes (`volume_std / volume_mean`) |
| `packing_density_mean` | Float [0, 1] | Mean simulated packing density across placement attempts |
| `packing_density_std` | Float | Standard deviation of packing density across placement attempts |
| `packing_density_cv` | Float | Coefficient of variation of packing density |
| `sphericity_mean` | Float [0, 1] | Mean Wadell sphericity of all parts; ratio of the surface area of an equivalent-volume sphere to the actual surface area |
| `sphericity_std` | Float | Standard deviation of part sphericity |
| `sphericity_cv` | Float | Coefficient of variation of part sphericity |
| `convexity_mean` | Float [0, 1] | Mean ratio of part volume to its convex hull volume; measures concavity |
| `convexity_std` | Float | Standard deviation of part convexity |
| `convexity_cv` | Float | Coefficient of variation of part convexity |
| `aspect_ratio_mean` | Float | Mean ratio of the longest axis to the shortest axis of each part's bounding box |
| `aspect_ratio_std` | Float | Standard deviation of part aspect ratios |
| `aspect_ratio_cv` | Float | Coefficient of variation of part aspect ratios |
| `face_count_mean` | Float | Mean number of triangular mesh faces across all parts; a proxy for geometric complexity |
| `face_count_std` | Float | Standard deviation of face counts |
| `face_count_cv` | Float | Coefficient of variation of face counts |
| `com_height_mean` | Float (mm) | Mean height of the centre of mass of each part; relevant to gravitational stability |
| `com_height_std` | Float (mm) | Standard deviation of centre-of-mass heights |
| `com_height_cv` | Float | Coefficient of variation of centre-of-mass heights |

---

## Production Feature Set (23 Columns)

The final production model (Strategy 3) operates on a reduced 23-column feature set. The three convexity features (`convexity_mean`, `convexity_std`, `convexity_cv`) are replaced by three user-supplied priority weights that allow the model to incorporate operator preferences into the recommendation.

The 23 features in the order expected by the model are:

| Index | Feature Name | Source |
|---|---|---|
| 0 | `n_objects` | Computed from scenario |
| 1 | `type_diversity` | Computed from scenario |
| 2 | `total_volume` | Computed from scenario |
| 3 | `volume_mean` | Computed from scenario |
| 4 | `volume_std` | Computed from scenario |
| 5 | `volume_cv` | Computed from scenario |
| 6 | `packing_density_mean` | Computed from scenario |
| 7 | `packing_density_std` | Computed from scenario |
| 8 | `packing_density_cv` | Computed from scenario |
| 9 | `sphericity_mean` | Computed from scenario |
| 10 | `sphericity_std` | Computed from scenario |
| 11 | `sphericity_cv` | Computed from scenario |
| 12 | `aspect_ratio_mean` | Computed from scenario |
| 13 | `aspect_ratio_std` | Computed from scenario |
| 14 | `aspect_ratio_cv` | Computed from scenario |
| 15 | `face_count_mean` | Computed from scenario |
| 16 | `face_count_std` | Computed from scenario |
| 17 | `face_count_cv` | Computed from scenario |
| 18 | `com_height_mean` | Computed from scenario |
| 19 | `com_height_std` | Computed from scenario |
| 20 | `w_eff` | User-supplied: packing efficiency priority [0.0, 1.0] |
| 21 | `w_stab` | User-supplied: physical stability priority [0.0, 1.0] |
| 22 | `w_time` | User-supplied: computation speed priority [0.0, 1.0] |

The authoritative ordered list of these features is stored in `feature_names.json` in the `model2` directory.

---

## Dataset Files and Formats

### Primary Files

| File | Format | Size | Description |
|---|---|---|---|
| `features.csv` | CSV | ~10.2 MB | Full 24-column feature matrix; one row per scenario |
| `features_final_23cols.csv` | CSV | ~7.7 MB | Reduced 23-column feature matrix used for production training |
| `labels.csv` | CSV | ~313 KB | Single-column file containing the string label for each scenario |
| `labels_final_6class.csv` | CSV | ~313 KB | Equivalent to `labels.csv`; confirmed to contain the 6-class label set |
| `metadata.json` | JSON | ~1.3 KB | Dataset schema: total scenarios, feature names, algorithm names, class counts, class balance, generation timestamp |
| `class_balance_final.png` | PNG | ~219 KB | Bar chart of class distribution |

### Raw Scenario Files

The `scenarios/` directory contains one JSON file per scenario, providing the raw data from which the feature matrix was derived. These files are available for researchers who wish to implement alternative feature extraction strategies.

### Downloadable Bundles

For convenience, the research website provides the following pre-packaged ZIP archives:

| Bundle | Contents | Approximate Size |
|---|---|---|
| `scenarios.zip` | All raw scenario JSON files | 180 MB |
| `labels_and_features.zip` | `features.csv` and `labels.csv` only | 12 MB |

---

## Class Distribution and Balance

The dataset exhibits a naturally imbalanced class distribution that reflects the genuine performance characteristics of the six algorithms across randomly generated scenarios. This imbalance is intentional and is not corrected during training, as it represents the true prior probability of each algorithm being optimal.

| Algorithm | Scenario Count | Dataset Proportion |
|---|---|---|
| `nfp_based` | 7,749 | 31.00% |
| `layer_decomposer` | 6,227 | 24.91% |
| `genetic` | 5,432 | 21.73% |
| `blf_gravity` | 2,547 | 10.19% |
| `first_fit_decreasing` | 1,815 | 7.26% |
| `simulated_annealing` | 1,230 | 4.92% |
| **Total** | **25,000** | **100%** |

The dominance of `nfp_based` reflects the prevalence of flat plates and irregular geometries in the generated scenarios, for which No-Fit Polygon placement is geometrically superior. The low frequency of `simulated_annealing` indicates that deterministic methods outperform it for the canonical geometry types used.

---

## Dataset Versions

| Version | Directory | Scenarios | Features | Notes |
|---|---|---|---|---|
| v1 | `Algorithm_Selection_for_3d_Packing_in_Additive_Manufacturing` | 25,000 | 24 | Initial dataset; includes convexity features |
| v2 | `Algorithm_Selection_for_3d_Packing_in_Additive_Manufacturing_v2` | 25,000 | 24 / 23 | Adds `features_final_23cols.csv` and `labels_final_6class.csv` for production training |

Both versions share identical `metadata.json` files and identical raw scenario counts. The v2 directory introduces the refined feature set used by the final optimised model.

---

## Reproducibility

To reproduce the dataset from source:

1. Install the Python dependencies listed in `research_backend/requirements.txt`.
2. Open the Jupyter notebook `Model_for_algorithm_selection_in_3d_printing_in_additive_manufacturing.ipynb` from the `Packing_Algorithm_Project` directory or from the `public/` directory of the frontend.
3. Execute the data generation cells in order. The notebook is documented with section headings that demarcate generation, preprocessing, and training stages.

All random seeds are fixed within the notebook to ensure reproducibility of the generation procedure.

---

## Intended Use and Limitations

### Intended Use

This dataset is designed for:

- Supervised classification research in manufacturing AI.
- Algorithm benchmarking and comparative evaluation.
- Feature engineering exploration for 3D geometry characterisation.
- Educational demonstration of machine learning pipelines for industrial applications.

### Limitations

- **Synthetic origin:** The dataset was generated from canonical geometric primitives, not scanned or modelled real industrial parts. Generalisation to arbitrary organic or complex CAD geometries may require retraining or domain adaptation.
- **Fixed build volume:** All scenarios use a single build volume. Scenarios intended for very large or very small printers may require re-generation with adjusted dimensions.
- **Simplified physics:** The gravity simulation used during generation is a first-order approximation. High-fidelity finite element stability analysis was not applied.
- **No material properties:** Material density, thermal properties, and support structure requirements are not modelled. These factors may influence algorithm selection in practice.
