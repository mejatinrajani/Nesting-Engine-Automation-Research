import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { Book, Database, Brain, Sparkles, GitBranch, Trophy, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const docSections = [
  { id: "overview", label: "Project Overview", icon: Book },
  { id: "dataset", label: "Dataset Guide", icon: Database },
  { id: "models", label: "Model Details", icon: Brain },
  { id: "training", label: "Training Strategy", icon: Sparkles },
  { id: "contributing", label: "Contributing", icon: GitBranch },
];

const Docs = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="prose prose-lg max-w-none space-y-10">
            <h1 className="text-5xl font-bold text-gradient mb-8">
              Automated Algorithm Selection for 3D Nesting in Additive Manufacturing
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              In additive manufacturing, choosing the right packing algorithm can mean the difference between <strong>90% build volume utilization</strong> and wasting over 40%. Yet today, engineers still rely on trial-and-error or fixed heuristics.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              This research changes that.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We trained a lightweight, interpretable XGBoost model that, given a set of 3D parts and user priorities (efficiency, stability, speed), <strong>predicts the single best-performing nesting algorithm</strong> — with up to <strong>67% accuracy</strong> across thousands of real-world-like scenarios.
            </p>

            <div className="grid md:grid-cols-3 gap-8 my-16">
              <GlassCard className="p-8 text-center border border-green-200">
                <Trophy className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold text-gradient">67% Accuracy</h3>
                <p className="text-muted-foreground mt-2">Best model beats random choice by 3.2×</p>
              </GlassCard>
              <GlassCard className="p-8 text-center border border-emerald-200">
                <Database className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
                <h3 className="text-2xl font-bold text-gradient">25,000+ Scenarios</h3>
                <p className="text-muted-foreground mt-2">Physics-aware synthetic dataset</p>
              </GlassCard>
              <GlassCard className="p-8 text-center border border-teal-200">
                <Brain className="w-12 h-12 mx-auto text-teal-600 mb-4" />
                <h3 className="text-2xl font-bold text-gradient">XGBoost</h3>
                <p className="text-muted-foreground mt-2">Fast, interpretable, production-ready</p>
              </GlassCard>
            </div>

            <p className="text-lg text-muted-foreground">
              This is not just another ML model — it’s a step toward <strong>intelligent, autonomous manufacturing systems</strong> that make optimal decisions without human guesswork.
            </p>
          </div>
        );

      case "dataset":
        return (
          <div className="prose prose-lg max-w-none space-y-10">
            <h1 className="text-5xl font-bold text-gradient mb-8">Dataset Guide</h1>
            <p className="text-xl text-muted-foreground">
              We generated <strong>25,000+ realistic 3D nesting scenarios</strong> using a custom physics-based simulator that places mixed geometries (cubes, plates, spheres, cylinders, cones) into standard build volumes.
            </p>

            <h2 className="text-3xl font-bold text-gradient mt-12">Dataset Statistics</h2>
            <ul className="grid md:grid-cols-2 gap-6 text-lg">
              <li><strong>Total Scenarios:</strong> 25,437</li>
              <li><strong>Part Types:</strong> 5 (Cubes, Flat Plates, Spheres, Tall Cylinders, Cones)</li>
              <li><strong>Parts per Job:</strong> 5 to 50</li>
              <li><strong>Build Volume:</strong> 300×300×400 mm (standard Prusa/SLA size)</li>
              <li><strong>Algorithms Tested:</strong> 8 state-of-the-art (Bottom-Left, MaxRects, Guillotine, Genetic, etc.)</li>
              <li><strong>Labels:</strong> Best-performing algorithm per scenario</li>
            </ul>

            <h2 className="text-3xl font-bold text-gradient mt-12">24 Engineered Features</h2>
            <div className="bg-muted/50 p-6 rounded-xl text-muted-foreground">
              <p className="text-lg mb-4">Includes:</p>
              <ul className="grid md:grid-cols-2 gap-3 text-base">
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

            <div className="text-center py-10">
              <GradientButton href="/downloads" className="text-lg px-12 py-5">
                <Download className="w-6 h-6 mr-3" />
                Download Complete Dataset
              </GradientButton>
            </div>
          </div>
        );

      case "models":
        return (
          <div className="prose prose-lg max-w-none space-y-10">
            <h1 className="text-5xl font-bold text-gradient mb-8">Model Details</h1>
            <p className="text-xl text-muted-foreground">
              Three XGBoost models trained with increasing sophistication. All are fully open-source and ready for deployment.
            </p>

            <div className="space-y-8">
              <GlassCard className="p-8 border border-orange-200">
                <h3 className="text-2xl font-bold text-gradient mb-3">Strategy 1 – Baseline</h3>
                <p className="text-muted-foreground mb-4">Training from scratch on raw features.</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-3xl font-bold text-orange-600">37% Accuracy</span>
                  <GradientButton href="/models/model-1.zip" className="px-8 py-4">
                    <Download className="w-5 h-5 mr-2" />
                    Download model-1.zip (98 MB)
                  </GradientButton>
                </div>
              </GlassCard>

              <GlassCard className="p-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-gradient mb-3">Strategy 2 – Strategist Model</h3>
                <p className="text-muted-foreground mb-4">Meta-learning approach: model learns to guide the main model.</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-3xl font-bold text-blue-600">55% Accuracy</span>
                  <GradientButton href="/models/model-2.zip" className="px-8 py-4">
                    <Download className="w-5 h-5 mr-2" />
                    Download model-2.zip (98 MB)
                  </GradientButton>
                </div>
              </GlassCard>

              <GlassCard className="p-8 border-2 border-green-400 shadow-lg shadow-green/20">
                <h3 className="text-2xl font-bold text-gradient mb-3 flex items-center gap-3">
                  <Trophy className="w-7 h-7 text-yellow-500" />
                  Strategy 3 – Final Fine-tuned (Best Model)
                </h3>
                <p className="text-muted-foreground mb-4">Hyperparameter-tuned, early stopping, and feature refinement.</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-3xl font-bold text-green-600">67% Accuracy</span>
                  <GradientButton href="/models/model-3.zip" className="px-8 py-4">
                    <Download className="w-6 h-6 mr-2" />
                    Download Best Model (138 MB)
                  </GradientButton>
                </div>
              </GlassCard>
            </div>
          </div>
        );

      case "training":
        return (
          <div className="text-center py-32">
            <Sparkles className="w-24 h-24 mx-auto text-emerald-500 mb-8 opacity-60" />
            <h2 className="text-5xl font-bold text-gradient mb-6">
              Training Strategy & Ablation Studies
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Full training logs, hyperparameter sweeps, feature importance analysis, and comparison of all three strategies.
            </p>
            <p className="text-2xl font-medium text-emerald-600 mt-12">Coming Soon</p>
          </div>
        );

      case "contributing":
        return (
          <div className="text-center py-32">
            <GitBranch className="w-24 h-24 mx-auto text-emerald-600 mb-8" />
            <h2 className="text-5xl font-bold text-gradient mb-8">
              Contribute to This Research
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
              This project is fully open-source under the MIT License.<br />
              Want to add real printer data? Improve features? Test new algorithms?<br />
              Your contribution can push this work even further.
            </p>
            <GradientButton
              href="https://github.com/yourusername/3d-nesting-ai"
              className="text-lg px-12 py-5"
            >
              View on GitHub
            </GradientButton>
            <p className="text-muted-foreground mt-8">
              (Replace link with your actual repo when ready)
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout>
      {/* Background Orbs */}
      <div className="fixed inset-0 w-full h-full bg-white -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-green-200/70 blur-[150px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-200/60 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[15%] w-[750px] h-[750px] rounded-full bg-teal-200/50 blur-[160px]" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading subtitle="Complete technical reference • Fully reproducible • Open for extension">
                Documentation
              </SectionHeading>
            </motion.div>
          </div>
        </section>

        {/* Docs Layout */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-4 gap-10">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <GlassCard className="sticky top-24 p-6">
                  <h3 className="text-2xl font-bold text-gradient mb-8">Sections</h3>
                  <nav className="space-y-3">
                    {docSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          "w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 font-medium",
                          activeSection === section.id
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                            : "hover:bg-white/70 backdrop-blur hover:border-green-200 border border-transparent"
                        )}
                      >
                        <section.icon className="w-6 h-6" />
                        {section.label}
                      </button>
                    ))}
                  </nav>
                </GlassCard>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <GlassCard className="min-h-screen p-10">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
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