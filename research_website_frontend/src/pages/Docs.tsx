import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { Book, Database, Brain, GitBranch, Trophy, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const docSections = [
  { id: "overview", label: "Project Overview", icon: Book },
  { id: "dataset", label: "Dataset Guide", icon: Database },
  { id: "models", label: "Model Details", icon: Brain },
  { id: "training", label: "Training Strategy", icon: GitBranch },
  { id: "contributing", label: "Contributing", icon: GitBranch },
];

const Docs = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-8">
            <div className="border-b border-green-100 pb-6">
              <h1 className="text-3xl font-bold text-green-900 mb-4">
                Automated Algorithm Selection for 3D Nesting in Additive Manufacturing
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                In additive manufacturing, choosing the right packing algorithm can mean the difference between <strong>90% build volume utilization</strong> and wasting over 40%. Yet today, engineers still rely on trial-and-error or fixed heuristics.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mt-3">
                This research presents a lightweight, interpretable XGBoost model that, given a set of 3D parts and user priorities (efficiency, stability, speed), <strong>predicts the single best-performing nesting algorithm</strong> — with up to <strong>67% accuracy</strong> across thousands of real-world-like scenarios.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="text-center border-t-2 border-t-green-600">
                <Trophy className="w-8 h-8 mx-auto text-green-700 mb-3" />
                <h3 className="text-xl font-bold text-green-900">67% Accuracy</h3>
                <p className="text-gray-500 mt-1 text-sm">Best model beats random choice by 3.2×</p>
              </GlassCard>
              <GlassCard className="text-center border-t-2 border-t-green-600">
                <Database className="w-8 h-8 mx-auto text-green-700 mb-3" />
                <h3 className="text-xl font-bold text-green-900">25,000+ Scenarios</h3>
                <p className="text-gray-500 mt-1 text-sm">Physics-aware synthetic dataset</p>
              </GlassCard>
              <GlassCard className="text-center border-t-2 border-t-green-600">
                <Brain className="w-8 h-8 mx-auto text-green-700 mb-3" />
                <h3 className="text-xl font-bold text-green-900">XGBoost</h3>
                <p className="text-gray-500 mt-1 text-sm">Fast, interpretable, production-ready</p>
              </GlassCard>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              This work is a step toward <strong>intelligent, autonomous manufacturing systems</strong> that make optimal decisions without human guesswork.
            </p>
          </div>
        );

      case "dataset":
        return (
          <div className="space-y-8">
            <div className="border-b border-green-100 pb-6">
              <h1 className="text-3xl font-bold text-green-900 mb-4">Dataset Guide</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                We generated <strong>25,000+ realistic 3D nesting scenarios</strong> using a custom physics-based simulator that places mixed geometries (cubes, plates, spheres, cylinders, cones) into standard build volumes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-green-800 mb-4">Dataset Statistics</h2>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-green-600">•</span><span><strong>Total Scenarios:</strong> 25,437</span></li>
                <li className="flex gap-2"><span className="text-green-600">•</span><span><strong>Part Types:</strong> 5 (Cubes, Flat Plates, Spheres, Tall Cylinders, Cones)</span></li>
                <li className="flex gap-2"><span className="text-green-600">•</span><span><strong>Parts per Job:</strong> 5 to 50</span></li>
                <li className="flex gap-2"><span className="text-green-600">•</span><span><strong>Build Volume:</strong> 300×300×400 mm (standard Prusa/SLA size)</span></li>
                <li className="flex gap-2"><span className="text-green-600">•</span><span><strong>Algorithms Tested:</strong> 8 state-of-the-art (Bottom-Left, MaxRects, Guillotine, Genetic, etc.)</span></li>
                <li className="flex gap-2"><span className="text-green-600">•</span><span><strong>Labels:</strong> Best-performing algorithm per scenario</span></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-green-800 mb-4">24 Engineered Features</h2>
              <div className="bg-green-50 border border-green-200 p-5 rounded">
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <li>• Count of each shape type</li>
                  <li>• Total volume & surface area</li>
                  <li>• Geometric complexity score</li>
                  <li>• Aspect ratio variance</li>
                  <li>• Center of mass stability index</li>
                  <li>• Convex hull volume ratio</li>
                  <li>• Sphericity & cylindricality metrics</li>
                  <li>• And 17 more domain-informed features</li>
                </ul>
              </div>
            </div>

            <div>
              <GradientButton href="/downloads" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Complete Dataset
              </GradientButton>
            </div>
          </div>
        );

      case "models":
        return (
          <div className="space-y-8">
            <div className="border-b border-green-100 pb-6">
              <h1 className="text-3xl font-bold text-green-900 mb-4">Model Details</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Three XGBoost models trained with increasing sophistication. All are fully open-source and ready for deployment.
              </p>
            </div>

            <div className="space-y-6">
              <GlassCard className="border-l-4 border-l-gray-300">
                <h3 className="text-lg font-bold text-green-900 mb-2">Strategy 1 – Baseline</h3>
                <p className="text-sm text-gray-500 mb-4">Training from scratch on raw features.</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-2xl font-bold text-gray-700">37% Accuracy</span>
                  <GradientButton href="/models/model-1.zip" className="flex items-center gap-2 text-xs py-2 px-4">
                    <Download className="w-4 h-4" />
                    Download model-1.zip (98 MB)
                  </GradientButton>
                </div>
              </GlassCard>

              <GlassCard className="border-l-4 border-l-green-400">
                <h3 className="text-lg font-bold text-green-900 mb-2">Strategy 2 – Strategist Model</h3>
                <p className="text-sm text-gray-500 mb-4">Meta-learning approach: model learns to guide the main model.</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-2xl font-bold text-green-700">55% Accuracy</span>
                  <GradientButton href="/models/model-2.zip" className="flex items-center gap-2 text-xs py-2 px-4">
                    <Download className="w-4 h-4" />
                    Download model-2.zip (98 MB)
                  </GradientButton>
                </div>
              </GlassCard>

              <GlassCard className="border-l-4 border-l-green-600">
                <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-700" />
                  Strategy 3 – Final Fine-tuned (Best Model)
                </h3>
                <p className="text-sm text-gray-500 mb-4">Hyperparameter-tuned, early stopping, and feature refinement.</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-2xl font-bold text-green-700">67% Accuracy</span>
                  <GradientButton href="/models/model-3.zip" className="flex items-center gap-2 text-xs py-2 px-4">
                    <Download className="w-4 h-4" />
                    Download Best Model (138 MB)
                  </GradientButton>
                </div>
              </GlassCard>
            </div>
          </div>
        );

      case "training":
        return (
          <div className="text-center py-20">
            <GitBranch className="w-16 h-16 mx-auto text-green-600 mb-6 opacity-60" />
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Training Strategy & Ablation Studies
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
              Full training logs, hyperparameter sweeps, feature importance analysis, and comparison of all three strategies.
            </p>
            <p className="text-base font-semibold text-green-600 mt-8">Coming Soon</p>
          </div>
        );

      case "contributing":
        return (
          <div className="text-center py-20">
            <GitBranch className="w-16 h-16 mx-auto text-green-600 mb-6" />
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Contribute to This Research
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed mb-8">
              This project is fully open-source under the MIT License. Contributions such as additional real printer data, improved features, or new algorithm implementations are welcome.
            </p>
            <GradientButton href="https://github.com/mejatinrajani/Nesting-Engine-Automation-Research" className="flex items-center gap-2 mx-auto">
              View on GitHub
            </GradientButton>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div>
        {/* Hero */}
        <section className="py-14 border-b border-green-100">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading subtitle="Complete technical reference · Fully reproducible · Open for extension">
                Documentation
              </SectionHeading>
            </motion.div>
          </div>
        </section>

        {/* Docs Layout */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <GlassCard className="sticky top-20 p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Sections</h3>
                  <nav className="space-y-1">
                    {docSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded text-left text-sm font-medium transition-colors",
                          activeSection === section.id
                            ? "bg-green-600 text-white"
                            : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                        )}
                      >
                        <section.icon className="w-4 h-4" />
                        {section.label}
                      </button>
                    ))}
                  </nav>
                </GlassCard>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <GlassCard className="min-h-[600px] p-8">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderContent()}
                  </motion.div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Docs;