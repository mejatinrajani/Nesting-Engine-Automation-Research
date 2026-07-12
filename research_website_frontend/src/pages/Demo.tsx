import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { OutlineButton } from "@/components/OutlineButton";
import { MetricBadge } from "@/components/MetricBadge";
import { Progress } from "@/components/ui/progress";
import { buildApiUrl } from "@/lib/api";
import { Brain, Zap, Package, Timer, Shield, ChevronRight } from "lucide-react";

// Only the best model (Strategy 3)
const BEST_MODEL = {
  id: "model-3",
  name: "XGBoost-Strategy-3 (Final Optimized)",
  accuracy: 67,
};

const Demo = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  // Step 1: Shape Counts
  const [shapes, setShapes] = useState({
    cubes: 5,
    plates: 8,
    spheres: 3,
    cylinders: 4,
    cones: 2,
  });

  // Step 2: Packing Priorities
  const [priorities, setPriorities] = useState({
    efficiency: 0.85,
    stability: 0.70,
    speed: 0.60,
  });

  const handlePredict = async () => {
    setLoading(true);

    try {
      const response = await fetch(buildApiUrl("/api/predict/"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shapes, priorities }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction({
          algorithm: data.algorithm,
          confidence: data.confidence,
          explanation: data.explanation,
          alternatives: data.alternatives,
        });
      } else {
        console.error("Server Error:", data);
      }
    } catch (error) {
      console.error("Connection Error:", error);
    } finally {
      setLoading(false);
    }
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
              <SectionHeading subtitle="Powered by our optimised model (67% accuracy) · Trained on 25K+ 3D nesting scenarios">
                Live 3D Nesting Algorithm Selector
              </SectionHeading>

              <div className="mt-8 max-w-3xl mx-auto">
                <p className="text-gray-500 text-sm leading-relaxed">
                  Specify your part mix and packing priorities. The model will recommend the most suitable nesting algorithm for your additive manufacturing job.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <MetricBadge label="Model Used" value={BEST_MODEL.name} color="green" />
                <MetricBadge label="Top Accuracy" value={`${BEST_MODEL.accuracy}%`} color="mint" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Demo */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Panel */}
              <div className="lg:col-span-2">
                <GlassCard>
                  {/* Step Progress Indicator */}
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-green-100">
                    <div className={`w-8 h-8 rounded flex items-center justify-center font-semibold text-sm ${step >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                      1
                    </div>
                    <div className={`flex-1 h-0.5 ${step >= 2 ? "bg-green-500" : "bg-gray-200"}`} />
                    <div className={`w-8 h-8 rounded flex items-center justify-center font-semibold text-sm ${step >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                      2
                    </div>
                    <p className="text-xs font-medium text-gray-500 ml-2">
                      Step {step} of 2: {step === 1 ? "Define Part Counts" : "Set Packing Priorities"}
                    </p>
                  </div>

                  {step === 1 ? (
                    /* Step 1: Shape Counts */
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <h3 className="text-base font-semibold text-green-900 mb-6">
                        Specify the number of parts for each geometry type:
                      </h3>

                      {Object.entries(shapes).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 capitalize">
                              {key === "cubes" && <Package className="w-4 h-4 text-green-600" />}
                              {key === "plates" && <div className="w-4 h-4 bg-gray-400 rounded" />}
                              {key === "spheres" && <div className="w-4 h-4 bg-green-300 rounded-full" />}
                              {key === "cylinders" && <Timer className="w-4 h-4 text-green-600" />}
                              {key === "cones" && <Zap className="w-4 h-4 text-green-600" />}
                              {key}
                            </label>
                            <span className="text-lg font-bold text-green-700 w-10 text-right">{value}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={value}
                            onChange={(e) => setShapes({ ...shapes, [key]: +e.target.value })}
                            className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #16a34a 0%, #16a34a ${(value / 20) * 100}%, #e5e7eb ${(value / 20) * 100}%, #e5e7eb 100%)`,
                            }}
                          />
                        </div>
                      ))}

                      <div className="pt-4">
                        <GradientButton
                          onClick={() => setStep(2)}
                          className="w-full py-3 flex items-center justify-center gap-2"
                        >
                          Continue to Packing Priorities
                          <ChevronRight className="w-4 h-4" />
                        </GradientButton>
                      </div>
                    </motion.div>
                  ) : (
                    /* Step 2: Priorities */
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <h3 className="text-base font-semibold text-green-900 mb-6">
                        Specify the relative importance of each packing objective:
                      </h3>

                      {Object.entries(priorities).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                              {key === "efficiency" && <Package className="w-4 h-4 text-green-600" />}
                              {key === "stability" && <Shield className="w-4 h-4 text-green-600" />}
                              {key === "speed" && <Zap className="w-4 h-4 text-green-600" />}
                              {key === "efficiency" && "Pack Density (Efficiency)"}
                              {key === "stability" && "Physical Stability"}
                              {key === "speed" && "Computation Speed"}
                            </label>
                            <span className="text-sm font-bold text-green-700">{value.toFixed(2)}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={value}
                            onChange={(e) => setPriorities({ ...priorities, [key]: +e.target.value })}
                            className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #16a34a 0%, #16a34a ${value * 100}%, #e5e7eb ${value * 100}%, #e5e7eb 100%)`,
                            }}
                          />
                        </div>
                      ))}

                      <div className="flex gap-3 pt-4">
                        <OutlineButton onClick={() => setStep(1)} className="flex-1 py-2.5 text-sm">
                          Back
                        </OutlineButton>
                        <GradientButton
                          onClick={handlePredict}
                          className="flex-1 py-3 text-sm flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            "Processing..."
                          ) : (
                            <>
                              <Brain className="w-4 h-4" />
                              Run Prediction
                            </>
                          )}
                        </GradientButton>
                      </div>
                    </motion.div>
                  )}
                </GlassCard>
              </div>

              {/* Results Panel */}
              <div className="space-y-5">
                {prediction ? (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <GlassCard className="border-l-4 border-l-green-600">
                      <div className="text-center py-6">
                        <p className="text-xs uppercase tracking-widest text-green-600 font-semibold mb-3">Recommended Algorithm</p>
                        <h3 className="text-xl font-bold text-green-900 mb-3">
                          {prediction.algorithm}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Confidence: <strong className="text-green-700">{(prediction.confidence * 100).toFixed(1)}%</strong>
                        </p>
                      </div>
                    </GlassCard>

                    <GlassCard>
                      <h4 className="text-sm font-semibold text-green-900 mb-3">Rationale</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {prediction.explanation}
                      </p>
                    </GlassCard>

                    <GlassCard>
                      <h4 className="text-sm font-semibold text-green-900 mb-3">Alternative Candidates</h4>
                      <div className="space-y-3">
                        {prediction.alternatives.map((alt: any) => (
                          <div key={alt.name} className="flex items-center justify-between gap-3">
                            <span className="text-sm text-gray-600">{alt.name}</span>
                            <Progress value={alt.score * 100} className="w-24 h-2" />
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                ) : (
                  <GlassCard className="text-center py-16">
                    <div className="opacity-40">
                      <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-500">
                        Configure your job parameters and submit to receive an algorithm recommendation.
                      </p>
                    </div>
                  </GlassCard>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Demo;
