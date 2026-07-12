import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { MetricBadge } from "@/components/MetricBadge";
import { GradientButton } from "@/components/GradientButton";
import { OutlineButton } from "@/components/OutlineButton";
import { Download, Brain, Trophy, Zap } from "lucide-react";
import modelsData from "@/data/models.json";

const Models = () => {
  const handleDownload = (modelId: string) => {
    const link = document.createElement("a");
    link.href = `/models.zip`;
    link.download = `/models.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bestModel = modelsData.reduce((prev, current) =>
    (prev.accuracy ?? 0) > (current.accuracy ?? 0) ? prev : current
  );

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
              <SectionHeading subtitle="Trained on 25K+ 3D nesting scenarios · Multiple strategies compared">
                Model Repository
              </SectionHeading>

              <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
                <div className="flex items-center gap-2 border border-green-200 rounded px-4 py-2 bg-white">
                  <Trophy className="w-4 h-4 text-green-700" />
                  <span className="text-gray-600">Best: <strong className="text-green-800">{bestModel.name}</strong></span>
                </div>
                <div className="flex items-center gap-2 border border-green-200 rounded px-4 py-2 bg-white">
                  <Zap className="w-4 h-4 text-green-700" />
                  <span className="text-gray-600">Top Accuracy: <strong className="text-green-800">{bestModel.accuracy}%</strong></span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Model Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modelsData.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="h-full"
                >
                  <GlassCard className={`h-full flex flex-col relative overflow-hidden ${model.accuracy === bestModel.accuracy ? "border-green-400 border-l-4 border-l-green-600" : ""}`}>
                    {/* Best Model Badge */}
                    {model.accuracy === bestModel.accuracy && (
                      <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-semibold px-3 py-1 flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        Best Model
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-green-600" />
                          {model.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          {model.strategy}
                        </p>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <MetricBadge
                          label="Accuracy"
                          value={`${model.accuracy}%`}
                          color={model.accuracy >= 60 ? "green" : model.accuracy >= 50 ? "light" : "mint"}
                        />
                        <MetricBadge label="F1" value={model.f1.toFixed(2)} color="light" />
                        <MetricBadge label="Precision" value={model.precision.toFixed(2)} color="mint" />
                        <MetricBadge label="Recall" value={model.recall.toFixed(2)} color="green" />
                      </div>

                      {/* Size & Time */}
                      <div className="text-xs text-gray-500 space-y-1 mb-5 border-t border-green-100 pt-3">
                        <div className="flex justify-between">
                          <span>Model Size</span>
                          <strong className="text-gray-700">{model.size}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Training Time</span>
                          <strong className="text-gray-700">{model.trainTime}</strong>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <GradientButton
                          href={`/models/${model.id}`}
                          className="flex-1 text-xs py-2.5"
                        >
                          View Details
                        </GradientButton>

                        <button
                          onClick={() => handleDownload(model.id)}
                          className="p-2.5 border border-green-300 text-green-700 bg-white hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors hover-round-btn"
                          title="Download model (.zip)"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 border-t border-green-100 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-green-900 mb-4">
                Deploy Automated Nesting Intelligence
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Download any model and integrate automated algorithm selection into your pipeline.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <GradientButton href="/demo">Try Live Demo</GradientButton>
                <OutlineButton href="/dataset">Access Dataset</OutlineButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Models;