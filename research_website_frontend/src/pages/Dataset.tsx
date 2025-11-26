import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { MetricBadge } from "@/components/MetricBadge";
import { Download, Database, Shield, FileText, ArrowDownToLine } from "lucide-react";

const Dataset = () => {
  // Real download handlers – place files in public/
  const downloadFull = () => {
    const link = document.createElement("a");
    link.href = "/downloads/scenarios_full.zip";
    link.download = "3d_nesting_scenarios_25k.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadFeatures = () => {
    const link = document.createElement("a");
    link.href = "/downloads/features_labels_csv.zip";
    link.download = "features_and_labels_csv.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadMetadata = () => {
    const link = document.createElement("a");
    link.href = "/downloads/dataset_metadata.pdf";
    link.download = "dataset_documentation.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <SectionHeading subtitle="25,437 real-world-like 3D nesting scenarios • 24 engineered features • 6 algorithm classes">
                The Research Dataset
              </SectionHeading>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
                <MetricBadge label="Total Scenarios" value="25,437" color="green" />
                <MetricBadge label="Features" value="24" color="light" />
                <MetricBadge label="Algorithms" value="6" color="mint" />
                <MetricBadge label="Validation"  value="5-Fold CV" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <GlassCard className="max-w-5xl mx-auto p-10">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gradient mb-4">Download the Complete Dataset</h3>
                <p className="text-xl text-muted-foreground">Fully open-source • MIT License • Ready for research and production</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadFull}
                  className="group flex flex-col items-center gap-5 p-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl hover:shadow-green/50 transition-all"
                >
                  <Download className="w-14 h-14" />
                  <div>
                    <h4 className="text-2xl font-bold">Full Dataset</h4>
                    <p className="text-sm opacity-90 mt-1">25,437 scenarios • ZIP format</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadFeatures}
                  className="group flex flex-col items-center gap-5 p-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl hover:shadow-emerald/50 transition-all"
                >
                  <ArrowDownToLine className="w-14 h-14" />
                  <div>
                    <h4 className="text-2xl font-bold">Features + Labels</h4>
                    <p className="text-sm opacity-90 mt-1">CSV bundle • Ready for training</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadMetadata}
                  className="group flex flex-col items-center gap-5 p-10 rounded-2xl border-2 border-primary/50 bg-white/60 backdrop-blur hover:bg-primary/5 transition-all"
                >
                  <FileText className="w-14 h-14 text-primary" />
                  <div>
                    <h4 className="text-2xl font-bold text-primary">Documentation</h4>
                    <p className="text-sm text-muted-foreground mt-1">PDF guide + schema</p>
                  </div>
                </motion.button>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Real Class Distribution Visualization */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading subtitle="Which algorithm wins most often across 25,437 scenarios?">
              Final Class Distribution (Best Algorithm per Scenario)
            </SectionHeading>

            <GlassCard className="mt-10 p-8 bg-gradient-to-br from-green-50/50 to-emerald-50/30 border border-green-200">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="class-distribution.png"
                  alt="Final Class Distribution across 25,000+ 3D nesting scenarios"
                  className="w-full h-auto"
                />
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="text-2xl font-bold text-gradient">NFP-Based</h4>
                  <p className="text-4xl font-bold text-green-600 mt-2">31.0%</p>
                  <p className="text-muted-foreground">Dominant winner</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gradient">Layer Decomposer</h4>
                  <p className="text-4xl font-bold text-emerald-600 mt-2">24.9%</p>
                  <p className="text-muted-foreground">Strong second</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gradient">Genetic Algorithm</h4>
                  <p className="text-4xl font-bold text-teal-600 mt-2">21.7%</p>
                  <p className="text-muted-foreground">Third most frequent</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <GlassCard className="text-center p-8">
                <Database className="w-14 h-14 text-emerald-600 mx-auto mb-5" />
                <h4 className="text-xl font-bold mb-3">Physics-Aware Generation</h4>
                <p className="text-muted-foreground">
                  Scenarios generated using collision detection and realistic part placement rules.
                </p>
              </GlassCard>

              <GlassCard className="text-center p-8">
                <Shield className="w-14 h-14 text-green-600 mx-auto mb-5" />
                <h4 className="text-xl font-bold mb-3">Ground Truth Labels</h4>
                <p className="text-muted-foreground">
                  Each scenario exhaustively tested with 6 algorithms — true best performer labeled.
                </p>
              </GlassCard>

              <GlassCard className="text-center p-8">
                <FileText className="w-14 h-14 text-primary mx-auto mb-5" />
                <h4 className="text-xl font-bold mb-3">Fully Documented</h4>
                <p className="text-muted-foreground">
                  Complete feature descriptions, generation pipeline, and validation methodology.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                The Most Realistic 3D Nesting Dataset Ever Released
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Start training tomorrow’s intelligent manufacturing systems — today.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <GradientButton href="/demo" className="text-lg px-10 py-5">
                  Try Live Demo
                </GradientButton>
                <GradientButton href="/models"  className="text-lg px-10 py-5">
                  Explore Models
                </GradientButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Dataset;