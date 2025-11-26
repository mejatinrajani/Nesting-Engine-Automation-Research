import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { MetricBadge } from "@/components/MetricBadge";
import { Trophy, TrendingUp, Zap } from "lucide-react";
import modelsData from "@/data/models.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const Comparison = () => {
  const sortedModels = [...modelsData].sort((a, b) => b.accuracy - a.accuracy);
  const bestModel = sortedModels[0];

  // Data for the chart — ordered by strategy progression
  const chartData = [
    {
      name: "Strategy 1",
      model: "XGBoost-S1",
      accuracy: 37,
      f1: 30,
      precision: 33,
      recall: 38,
    },
    {
      name: "Strategy 2",
      model: "XGBoost-S2",
      accuracy: 55,
      f1: 52,
      precision: 52,
      recall: 55,
    },
    {
      name: "Strategy 3",
      model: "XGBoost-S3",
      accuracy: 67,
      f1: 65,
      precision: 64,
      recall: 70,
    },
  ];

  return (
    <PageLayout>
      {/* Aesthetic Background Orbs */}
      <div className="fixed inset-0 w-full h-full bg-white -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[650px] h-[650px] rounded-full bg-green-200/70 blur-[150px]" />
        <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] rounded-full bg-emerald-200/60 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[15%] w-[700px] h-[700px] rounded-full bg-teal-200/50 blur-[160px]" />
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
              <SectionHeading subtitle="Side-by-side evaluation of all training strategies">
                Model Performance Comparison
              </SectionHeading>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 text-lg">
                <div className="flex items-center gap-3">
                  <Trophy className="w-9 h-9 text-yellow-500" />
                  <span>
                    Champion: <strong className="text-gradient text-2xl">{bestModel.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-7 h-7 text-emerald-500" />
                  <span>
                    Peak Accuracy: <strong className="text-green-600 text-2xl">{bestModel.accuracy}%</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Best Model Spotlight */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <GlassCard className="relative overflow-hidden border-2 border-green-500/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5" />
                <div className="relative p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-2xl">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
                    Best Performing Model
                  </h3>
                  <p className="text-xl font-medium text-primary mb-8">{bestModel.name}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Accuracy</p>
                      <p className="text-4xl font-bold text-green-600">{bestModel.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">F1 Score</p>
                      <p className="text-4xl font-bold text-emerald-600">{bestModel.f1}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Precision</p>
                      <p className="text-4xl font-bold text-teal-600">{bestModel.precision.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Recall</p>
                      <p className="text-4xl font-bold text-cyan-600">{bestModel.recall.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Performance Evolution Chart */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading subtitle="Clear progression from baseline to final optimized model">
              Strategy Performance Evolution
            </SectionHeading>

            <GlassCard className="mt-10 p-8">
              <ResponsiveContainer width="100%" height={420}>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="f1Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="4 6" stroke="rgba(0,0,0,0.05)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 14, fontWeight: 600 }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[25, 75]}
                    tick={{ fontSize: 13 }}
                    label={{ value: "Score (%)", angle: -90, position: "insideLeft", style: { fontWeight: 600 } }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                  <Legend verticalAlign="top" height={40} />

                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#10b981"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#accuracyGrad)"
                    name="Accuracy"
                  />
                  <Area
                    type="monotone"
                    dataKey="f1"
                    stroke="#06b6d4"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#f1Grad)"
                    name="F1 Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <SectionHeading subtitle="Detailed ranking with all metrics">Model Leaderboard</SectionHeading>

            <GlassCard className="mt-10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20 bg-white/40 backdrop-blur">
                      <th className="text-left p-5 font-bold">Rank</th>
                      <th className="text-left p-5 font-bold">Model</th>
                      <th className="text-left p-5 font-bold">Strategy</th>
                      <th className="text-center p-5 font-bold">Accuracy</th>
                      <th className="text-center p-5 font-bold">Precision</th>
                      <th className="text-center p-5 font-bold">Recall</th>
                      <th className="text-center p-5 font-bold">F1 Score</th>
                      <th className="text-center p-5 font-bold">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedModels.map((model, idx) => (
                      <tr
                        key={model.id}
                        className={`border-b border-white/10 transition-all ${
                          idx === 0 ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10" : "hover:bg-white/5"
                        }`}
                      >
                        <td className="p-5">
                          <div className="flex items-center gap-2 font-bold">
                            {idx === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                            <span className={idx === 0 ? "text-green-600 text-lg" : ""}>#{idx + 1}</span>
                          </div>
                        </td>
                        <td className="p-5 font-semibold text-primary">{model.name}</td>
                        <td className="p-5 text-sm max-w-xs">{model.strategy}</td>
                        <td className="p-5 text-center">
                          <span className={`font-bold text-lg ${idx === 0 ? "text-green-600" : "text-foreground"}`}>
                            {model.accuracy}%
                          </span>
                        </td>
                        <td className="p-5 text-center">{model.precision.toFixed(2)}</td>
                        <td className="p-5 text-center">{model.recall.toFixed(2)}</td>
                        <td className="p-5 text-center font-medium">{model.f1}</td>
                        <td className="p-5 text-center text-muted-foreground">{model.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
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
                From 37% to 67% — Real Progress
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                See how each strategic improvement pushed the boundaries of automated algorithm selection.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/models" className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-green transition-all duration-300">
                  Explore All Models
                </a>
                <a href="/docs" className="px-8 py-4 border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
                  Read the Paper
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Comparison;