import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { MetricBadge } from "@/components/MetricBadge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Zap, Package, Timer, Shield } from "lucide-react";

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
      // Point to your local Django server
      const response = await fetch('http://127.0.0.1:8000/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shapes: shapes,
          priorities: priorities
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction({
          algorithm: data.algorithm, // Django returns 'nfp_based'
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
      {/* Background Orbs */}
      <div className="fixed inset-0 w-full h-full bg-white -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-green-200/70 blur-[150px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-200/60 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[20%] w-[750px] h-[750px] rounded-full bg-teal-200/50 blur-[160px]" />
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
              <SectionHeading subtitle="Powered by our state-of-the-art model (67% accuracy) • Trained on 25K+ real nesting scenarios">
                Live 3D Nesting Algorithm Selector
              </SectionHeading>

              <div className="mt-10 max-w-4xl mx-auto">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Tell us your part mix and packing priorities — our AI instantly recommends the{" "}
                  <span className="text-gradient font-bold">best-performing nesting algorithm</span> for your
                  additive manufacturing job.
                </p>
              </div>

              <div className="flex justify-center gap-8 mt-12">
                <MetricBadge label="Model Used" value={BEST_MODEL.name} color="green" />
                <MetricBadge label="Top Accuracy" value={`${BEST_MODEL.accuracy}%`} color="mint" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Demo */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Input Panel */}
              <div className="lg:col-span-2">
                <GlassCard className="p-8">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${step === 1 ? "bg-gradient-primary" : "bg-green-500"}`}>
                        1
                      </div>
                      <div className="w-24 h-1 bg-gray-300">
                        <div className={`h-full transition-all duration-500 ${step === 2 ? "w-full bg-gradient-primary" : "w-0"}`} />
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${step === 2 ? "bg-gradient-primary" : "bg-gray-300"}`}>
                        2
                      </div>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Step {step}: {step === 1 ? "Define Parts" : "Set Priorities"}
                    </p>
                  </div>

                  {step === 1 ? (
                    /* Step 1: Shape Counts */
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      <h3 className="text-2xl font-bold text-gradient text-center mb-8">
                        How many of each shape do you have?
                      </h3>

                      {Object.entries(shapes).map(([key, value]) => (
                        <div key={key} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="font-semibold capitalize flex items-center gap-3">
                              {key === "cubes" && <Package className="w-5 h-5 text-emerald-600" />}
                              {key === "plates" && <div className="w-5 h-5 bg-gray-400 rounded" />}
                              {key === "spheres" && <div className="w-5 h-5 bg-blue-500 rounded-full" />}
                              {key === "cylinders" && <Timer className="w-5 h-5 text-teal-600" />}
                              {key === "cones" && <Zap className="w-5 h-5 text-yellow-500" />}
                              {key.replace(/s$/, "")} {key.endsWith("s") ? "" : "s"}
                            </label>
                            <span className="text-2xl font-bold text-primary w-16 text-right">{value}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={value}
                            onChange={(e) => setShapes({ ...shapes, [key]: +e.target.value })}
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                            style={{
                              background: `linear-gradient(to right, #10b981 0%, #10b981 ${(value / 20) * 100}%, #e5e7eb ${(value / 20) * 100}%, #e5e7eb 100%)`,
                            }}
                          />
                        </div>
                      ))}

                      <GradientButton
                        onClick={() => setStep(2)}
                        className="w-full py-5 text-lg font-semibold mt-10"
                      >
                        Next: Set Packing Priorities
                      </GradientButton>
                    </motion.div>
                  ) : (
                    /* Step 2: Priorities */
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                      <h3 className="text-2xl font-bold text-gradient text-center mb-8">
                        What matters most for this job?
                      </h3>

                      {Object.entries(priorities).map(([key, value]) => (
                        <div key={key} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="font-semibold flex items-center gap-3">
                              {key === "efficiency" && <Package className="w-6 h-6 text-green-600" />}
                              {key === "stability" && <Shield className="w-6 h-6 text-blue-600" />}
                              {key === "speed" && <Zap className="w-6 h-6 text-yellow-500" />}
                              {key === "efficiency" && "Pack Tight (Maximize Density)"}
                              {key === "stability" && "Don't Roll (Prioritize Balance)"}
                              {key === "speed" && "Pack Fast (Minimize Time)"}
                            </label>
                            <span className="text-2xl font-bold text-primary">{value.toFixed(2)}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={value}
                            onChange={(e) => setPriorities({ ...priorities, [key]: +e.target.value })}
                            className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #10b981 0%, #10b981 ${value * 100}%, #e5e7eb ${value * 100}%, #e5e7eb 100%)`,
                            }}
                          />
                        </div>
                      ))}

                      <div className="flex gap-4 mt-12">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 py-4 border-2 border-primary/50 text-primary rounded-xl font-medium hover:bg-primary/10 transition"
                        >
                          Back
                        </button>
                        <GradientButton
                          onClick={handlePredict}
                          className="flex-1 py-5 text-lg font-bold flex items-center justify-center gap-3"
                        >
                          {loading ? (
                            <>Predicting...</>
                          ) : (
                            <>
                              <Brain className="w-6 h-6" />
                              Predict Best Algorithm
                            </>
                          )}
                        </GradientButton>
                      </div>
                    </motion.div>
                  )}
                </GlassCard>
              </div>

              {/* Results Panel */}
              <div className="space-y-6">
                {prediction ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <GlassCard className="border-2 border-green-500/50 shadow-xl">
                      <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                        <Sparkles className="w-16 h-16 mx-auto text-green-600 mb-4" />
                        <h3 className="text-3xl font-bold text-gradient mb-2">
                          Recommended Algorithm
                        </h3>
                        <p className="text-2xl font-bold text-primary">
                          {prediction.algorithm}
                        </p>
                        <p className="text-lg mt-3">
                          Confidence: <strong className="text-green-600">{(prediction.confidence * 100).toFixed(1)}%</strong>
                        </p>
                      </div>
                    </GlassCard>

                    <GlassCard>
                      <h4 className="font-bold text-lg mb-4">Why this algorithm?</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {prediction.explanation}
                      </p>
                    </GlassCard>

                    <GlassCard>
                      <h4 className="font-bold text-lg mb-4">Top Alternatives</h4>
                      <div className="space-y-4">
                        {prediction.alternatives.map((alt: any) => (
                          <div key={alt.name} className="flex items-center justify-between">
                            <span className="font-medium">{alt.name}</span>
                            <Progress value={alt.score * 100} className="w-32 h-3" />
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                ) : (
                  <GlassCard className="text-center py-20">
                    <div className="opacity-30">
                      <Brain className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                      <p className="text-xl text-muted-foreground">
                        Configure your job and click predict
                      </p>
                      <p className="text-sm mt-4 max-w-xs mx-auto">
                        Our AI will instantly recommend the optimal nesting strategy
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