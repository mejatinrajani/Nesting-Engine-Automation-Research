import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { MetricBadge } from "@/components/MetricBadge";
import { OutlineButton } from "@/components/OutlineButton";
import { GradientButton } from "@/components/GradientButton";
import { Trophy, Zap } from "lucide-react";
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
} from "recharts";

const Comparison = () => {
  const sortedModels = [...modelsData].sort((a, b) => b.accuracy - a.accuracy);
  const bestModel = sortedModels[0];

  const chartData = [
    { name: "Strategy 1", model: "XGBoost-S1", accuracy: 37, f1: 30, precision: 33, recall: 38 },
    { name: "Strategy 2", model: "XGBoost-S2", accuracy: 55, f1: 52, precision: 52, recall: 55 },
    { name: "Strategy 3", model: "XGBoost-S3", accuracy: 67, f1: 65, precision: 64, recall: 70 },
  ];

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
              <SectionHeading subtitle="Side-by-side evaluation of all training strategies">
                Model Performance Comparison
              </SectionHeading>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-sm">
                <div className="flex items-center gap-2 border border-green-200 rounded px-4 py-2 bg-white">
                  <Trophy className="w-5 h-5 text-green-700" />
                  <span className="text-gray-600">Champion: <strong className="text-green-800">{bestModel.name}</strong></span>
                </div>
                <div className="flex items-center gap-2 border border-green-200 rounded px-4 py-2 bg-white">
                  <Zap className="w-5 h-5 text-green-700" />
                  <span className="text-gray-600">Peak Accuracy: <strong className="text-green-800">{bestModel.accuracy}%</strong></span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Best Model Spotlight */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="border-l-4 border-l-green-600">
                <div className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded bg-green-600 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Best Performing Model
                  </h3>
                  <p className="text-green-600 font-medium mb-8">{bestModel.name}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Accuracy</p>
                      <p className="text-3xl font-bold text-green-700">{bestModel.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">F1 Score</p>
                      <p className="text-3xl font-bold text-green-700">{bestModel.f1}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Precision</p>
                      <p className="text-3xl font-bold text-green-700">{bestModel.precision.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Recall</p>
                      <p className="text-3xl font-bold text-green-700">{bestModel.recall.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Performance Evolution Chart */}
        <section className="py-16 bg-green-50 border-t border-b border-green-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading subtitle="Clear progression from baseline to final optimized model">
              Strategy Performance Evolution
            </SectionHeading>

            <GlassCard className="mt-8 p-6">
              <ResponsiveContainer width="100%" height={380}>
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 13, fill: "#6b7280" }} tickLine={false} />
                  <YAxis
                    domain={[25, 75]}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    label={{ value: "Score (%)", angle: -90, position: "insideLeft", style: { fontWeight: 600, fill: "#374151" } }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #d1fae5",
                      borderRadius: "4px",
                      fontSize: "13px",
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line type="monotone" dataKey="accuracy" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4, fill: "#16a34a" }} name="Accuracy" />
                  <Line type="monotone" dataKey="f1" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="F1 Score" />
                  <Line type="monotone" dataKey="precision" stroke="#86efac" strokeWidth={2} dot={{ r: 3 }} name="Precision" />
                  <Line type="monotone" dataKey="recall" stroke="#4ade80" strokeWidth={2} dot={{ r: 3 }} name="Recall" />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <SectionHeading subtitle="Detailed ranking with all metrics">Model Leaderboard</SectionHeading>

            <GlassCard className="mt-8 overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-green-200 bg-green-50">
                      <th className="text-left px-5 py-4 font-semibold text-green-800 uppercase tracking-wide text-xs">Rank</th>
                      <th className="text-left px-5 py-4 font-semibold text-green-800 uppercase tracking-wide text-xs">Model</th>
                      <th className="text-left px-5 py-4 font-semibold text-green-800 uppercase tracking-wide text-xs">Strategy</th>
                      <th className="text-center px-5 py-4 font-semibold text-green-800 uppercase tracking-wide text-xs">Accuracy</th>
                      <th className="text-center px-5 py-4 font-semibold text-green-800 uppercase tracking-wide text-xs">Precision</th>
                      <th className="text-center px-5 py-4 font-semibold text-green-800 uppercase tracking-wide text-xs">Recall</th>
                      <th className="text-center px-5 py-4 font-semibold text-green-800 uppercase tracking-wide text-xs">F1 Score</th>
                      <th className="text-center px-5 py-4 font-semibold text-green-800 uppercase tracking-wide text-xs">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedModels.map((model, idx) => (
                      <tr
                        key={model.id}
                        className={`border-b border-green-100 transition-colors ${
                          idx === 0 ? "bg-green-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 font-semibold text-green-800">
                            {idx === 0 && <Trophy className="w-4 h-4 text-green-700" />}
                            <span>#{idx + 1}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-green-700">{model.name}</td>
                        <td className="px-5 py-4 text-gray-500 max-w-xs">{model.strategy}</td>
                        <td className="px-5 py-4 text-center">
                          <span className={`font-bold ${idx === 0 ? "text-green-700" : "text-gray-700"}`}>
                            {model.accuracy}%
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center text-gray-600">{model.precision.toFixed(2)}</td>
                        <td className="px-5 py-4 text-center text-gray-600">{model.recall.toFixed(2)}</td>
                        <td className="px-5 py-4 text-center font-medium text-gray-700">{model.f1}</td>
                        <td className="px-5 py-4 text-center text-gray-500">{model.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
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
                From 37% to 67% — Measurable Progress
              </h2>
              <p className="text-gray-500 mb-8 text-sm">
                See how each strategic improvement pushed the boundaries of automated algorithm selection.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <GradientButton href="/models">Explore All Models</GradientButton>
                <OutlineButton href="/docs">Read the Documentation</OutlineButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Comparison;