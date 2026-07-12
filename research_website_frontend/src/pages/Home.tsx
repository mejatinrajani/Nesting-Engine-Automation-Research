import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { GradientButton } from "@/components/GradientButton";
import { OutlineButton } from "@/components/OutlineButton";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { MetricBadge } from "@/components/MetricBadge";
import { Brain, Lock, Code, Database, TrendingUp, Layers, BarChart } from "lucide-react";

const Home = () => {
  const stats = [
    { label: "Dataset Size", value: "25K+", color: "green" as const },
    { label: "Models", value: "3", color: "light" as const },
    { label: "Strategies", value: "4", color: "mint" as const },
    { label: "Accuracy", value: "67%", color: "green" as const },
  ];

  const highlights = [
    { icon: Brain, label: "AI-Powered", desc: "Advanced machine learning models" },
    { icon: Code, label: "Open Source", desc: "Fully transparent and collaborative" },
    { icon: Lock, label: "Privacy-First", desc: "Your data stays secure" },
  ];

  const pipeline = [
    { icon: Database, label: "Dataset", desc: "25K+ labeled samples" },
    { icon: Layers, label: "4 Strategies", desc: "Transfer, Fine-tune, From Scratch" },
    { icon: TrendingUp, label: "3 Models", desc: "Multiple architectures" },
    { icon: BarChart, label: "Metrics", desc: "Comprehensive evaluation" },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-green-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">Research Publication</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-green-900 mb-6">
              Automated Algorithm Selection
              <br />
              for 3D Nesting in Additive Manufacturing
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto mb-10">
              Open-source ML research with comprehensive models, datasets, and evaluation metrics for scientific advancement.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <GradientButton href="/demo">Try Demo</GradientButton>
              <OutlineButton href="/models">View Models</OutlineButton>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 bg-white border border-green-200 px-5 py-2.5 rounded text-sm"
                >
                  <item.icon className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-green-50 border-b border-green-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <MetricBadge
                key={stat.label}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                className="w-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="From data to deployment">
            Research Pipeline
          </SectionHeading>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {pipeline.map((item) => (
              <GlassCard key={item.label} className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded bg-green-600 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-base text-gray-800 mb-1">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-green-100 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Ready to Explore?
            </h2>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              Dive into our comprehensive dataset, test our models, or explore the research documentation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <GradientButton href="/dataset">Explore Dataset</GradientButton>
              <OutlineButton href="/docs">Read Documentation</OutlineButton>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;