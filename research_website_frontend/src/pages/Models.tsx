import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { MetricBadge } from "@/components/MetricBadge";
import { GradientButton } from "@/components/GradientButton";
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
      {/* Background Orbs */}
      <div className="fixed inset-0 w-full h-full bg-white -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-green-200/70 blur-[140px]" />
        <div className="absolute top-[40%] right-[-8%] w-[500px] h-[500px] rounded-full bg-emerald-200/60 blur-[130px]" />
        <div className="absolute bottom-[-15%] left-[10%] w-[700px] h-[700px] rounded-full bg-teal-200/50 blur-[150px]" />
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
              <SectionHeading subtitle="Trained on 25K+ 3D nesting scenarios • Multiple strategies compared">
                Model Zoo
              </SectionHeading>

              <div className="flex flex-wrap justify-center gap-8 mt-12 text-lg">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <span>
                    Best: <strong className="text-gradient">{bestModel.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-7 h-7 text-emerald-500" />
                  <span>
                    Top Accuracy: <strong className="text-green-600">{bestModel.accuracy}%</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Model Grid – Fixed Height Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modelsData.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full" // forces equal height
                >
                  <GlassCard className="h-full flex flex-col relative overflow-hidden hover:shadow-xl transition-shadow duration-500">
                    {/* Best Model Badge */}
                    {model.accuracy === bestModel.accuracy && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-amber-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-lg flex items-center gap-1 z-10">
                        <Trophy className="w-4 h-4" />
                        Best
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      {/* Header */}
                      <div className="mb-5">
                        <h3 className="text-2xl font-bold text-gradient flex items-center gap-3">
                          <Brain className="w-7 h-7 text-emerald-600" />
                          {model.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {model.strategy}
                        </p>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
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
                      <div className="text-sm text-muted-foreground space-y-1 mb-6">
                        <div className="flex justify-between">
                          <span>Size</span>
                          <strong>{model.size}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Training time</span>
                          <strong>{model.trainTime}</strong>
                        </div>
                      </div>

                      {/* Buttons – No flash/blink */}
                      <div className="flex gap-3 mt-auto">
                        <GradientButton
                          href={`/models/${model.id}`}
                          className="flex-1 text-sm py-3 transition-all duration-300"
                        >
                          View Details
                        </GradientButton>

                        <button
                          onClick={() => handleDownload(model.id)}
                          className="p-3 rounded-xl bg-white/70 backdrop-blur border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                          title="Download model (.zip)"
                        >
                          <Download className="w-6 h-6" />
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
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                Deploy State-of-the-Art Nesting Intelligence
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Download any model and integrate automated algorithm selection into your pipeline.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <GradientButton href="/demo">Try Live Demo</GradientButton>
                <GradientButton href="/dataset">
                  Get Dataset
                </GradientButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Models;