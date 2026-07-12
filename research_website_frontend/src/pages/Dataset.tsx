import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { OutlineButton } from "@/components/OutlineButton";
import { MetricBadge } from "@/components/MetricBadge";
import { Download, Database, Shield, FileText, ArrowDownToLine } from "lucide-react";

const Dataset = () => {
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
      <div>
        {/* Hero */}
        <section className="py-16 md:py-20 border-b border-green-100">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading subtitle="25,437 real-world-like 3D nesting scenarios · 24 engineered features · 6 algorithm classes">
                The Research Dataset
              </SectionHeading>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
                <MetricBadge label="Total Scenarios" value="25,437" color="green" />
                <MetricBadge label="Features" value="24" color="light" />
                <MetricBadge label="Algorithms" value="6" color="mint" />
                <MetricBadge label="Validation" value="5-Fold CV" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-16 bg-green-50 border-b border-green-100">
          <div className="container mx-auto px-4">
            <GlassCard className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-green-900 mb-2">Download the Complete Dataset</h3>
                <p className="text-sm text-gray-500">Fully open-source · MIT License · Ready for research and production</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <button
                  onClick={downloadFull}
                  className="flex flex-col items-center gap-4 p-8 border border-green-200 bg-white hover:bg-green-50 hover:border-green-400 transition-colors text-center hover-round-card"
                >
                  <div className="w-12 h-12 rounded bg-green-600 flex items-center justify-center">
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-green-900">Full Dataset</h4>
                    <p className="text-xs text-gray-500 mt-1">25,437 scenarios · ZIP format</p>
                  </div>
                </button>

                <button
                  onClick={downloadFeatures}
                  className="flex flex-col items-center gap-4 p-8 border border-green-200 bg-white hover:bg-green-50 hover:border-green-400 transition-colors text-center hover-round-card"
                >
                  <div className="w-12 h-12 rounded bg-green-600 flex items-center justify-center">
                    <ArrowDownToLine className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-green-900">Features + Labels</h4>
                    <p className="text-xs text-gray-500 mt-1">CSV bundle · Ready for training</p>
                  </div>
                </button>

                <button
                  onClick={downloadMetadata}
                  className="flex flex-col items-center gap-4 p-8 border border-green-200 bg-white hover:bg-green-50 hover:border-green-400 transition-colors text-center hover-round-card"
                >
                  <div className="w-12 h-12 rounded bg-green-600 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-green-900">Documentation</h4>
                    <p className="text-xs text-gray-500 mt-1">PDF guide + schema</p>
                  </div>
                </button>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Class Distribution */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading subtitle="Which algorithm performs best across 25,437 scenarios?">
              Class Distribution — Best Algorithm per Scenario
            </SectionHeading>

            <GlassCard className="mt-8">
              <div className="rounded overflow-hidden border border-green-100">
                <img
                  src="class-distribution.png"
                  alt="Final Class Distribution across 25,000+ 3D nesting scenarios"
                  className="w-full h-auto"
                />
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6 text-center border-t border-green-100 pt-6">
                <div>
                  <h4 className="text-base font-semibold text-green-800">NFP-Based</h4>
                  <p className="text-3xl font-bold text-green-700 mt-1">31.0%</p>
                  <p className="text-xs text-gray-500 mt-1">Dominant winner</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-green-800">Layer Decomposer</h4>
                  <p className="text-3xl font-bold text-green-700 mt-1">24.9%</p>
                  <p className="text-xs text-gray-500 mt-1">Strong second</p>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-green-800">Genetic Algorithm</h4>
                  <p className="text-3xl font-bold text-green-700 mt-1">21.7%</p>
                  <p className="text-xs text-gray-500 mt-1">Third most frequent</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-16 border-t border-green-100 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <GlassCard className="text-center">
                <Database className="w-10 h-10 text-green-700 mx-auto mb-4" />
                <h4 className="text-base font-semibold text-green-800 mb-2">Physics-Aware Generation</h4>
                <p className="text-sm text-gray-500">
                  Scenarios generated using collision detection and realistic part placement rules.
                </p>
              </GlassCard>

              <GlassCard className="text-center">
                <Shield className="w-10 h-10 text-green-700 mx-auto mb-4" />
                <h4 className="text-base font-semibold text-green-800 mb-2">Ground Truth Labels</h4>
                <p className="text-sm text-gray-500">
                  Each scenario exhaustively tested with 6 algorithms — true best performer labeled.
                </p>
              </GlassCard>

              <GlassCard className="text-center">
                <FileText className="w-10 h-10 text-green-700 mx-auto mb-4" />
                <h4 className="text-base font-semibold text-green-800 mb-2">Fully Documented</h4>
                <p className="text-sm text-gray-500">
                  Complete feature descriptions, generation pipeline, and validation methodology.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 border-t border-green-100">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-green-900 mb-4">
                A Comprehensive 3D Nesting Dataset
              </h2>
              <p className="text-gray-500 mb-8 text-sm">
                Begin training intelligent manufacturing systems with a rigorously prepared and documented dataset.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <GradientButton href="/demo">Try Live Demo</GradientButton>
                <OutlineButton href="/models">Explore Models</OutlineButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Dataset;