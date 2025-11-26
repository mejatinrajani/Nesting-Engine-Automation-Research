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
      {/* --- AESTHETIC BACKGROUND LAYER --- */}
      <div className="fixed inset-0 w-full h-full bg-white -z-10 overflow-hidden">
        {/* Top Left Green Spot */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-200/80 blur-[140px]" />
        
        {/* Center Right Mint Spot */}
        <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-200/50 blur-[120px]" />
        
        {/* Bottom Left Teal Spot */}
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-green-200/50 blur-[140px]" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-loose text-gradient mb-6">
                Automated Algorithm Selection
                <br />
                for 3D Nesting in Additive Manufacturing
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
                Open-source ML research with comprehensive models, datasets, and evaluation metrics for scientific advancement
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-12">
                <GradientButton href="/demo">Try Demo</GradientButton>
                <OutlineButton href="/models">View Models</OutlineButton>
              </div>

              <div className="flex flex-wrap gap-6 justify-center">
                {highlights.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-2 glass-card px-6 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm"
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 -mt-12">
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeading subtitle="From data to deployment">
              Research Pipeline
            </SectionHeading>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {pipeline.map((item, idx) => (
                <GlassCard key={item.label} className="text-center bg-white/50 backdrop-blur-md border-white/60">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4 shadow-green">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  {idx < pipeline.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-green-500 to-green-400" />
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gradient mb-6">
                Ready to Explore?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Dive into our comprehensive dataset, test our models, or explore the research documentation
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <GradientButton href="/dataset">Explore Dataset</GradientButton>
                <OutlineButton href="/docs">Read Documentation</OutlineButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Home;