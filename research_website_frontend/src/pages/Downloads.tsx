import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { Download, Database, FileCode, BookOpen, FileText, Shield, Sparkles } from "lucide-react";

const Downloads = () => {
  const handleDownload = (path: string, filename: string) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSections = [
    {
      title: "Dataset Files",
      icon: Database,
      items: [
        { name: "Complete Dataset (Scenarios)", size: "180 MB", path: "scenarios.zip", file: "nesting_scenarios_full.zip" },
        { name: "Features + Labels (CSV Bundle)", size: "12 MB", path: "labels_and_features.zip", file: "features_labels_csv.zip" },
        { name: "Dataset Metadata & Schema", size: "1.2 MB", path: "metadata.json", file: "dataset_metadata.pdf" },
      ],
    },
    {
      title: "Trained Model Weights",
      icon: FileCode,
      items: [
        { name: "XGBoost Strategy 1 – Baseline", size: "98 MB", path: "models.zip", file: "xgboost_strategy1.zip" },
        { name: "XGBoost Strategy 2 – Strategist", size: "52 MB", path: "models.zip", file: "xgboost_strategy2.zip" },
        { name: "XGBoost Strategy 3 – Final (Best)", size: "138 MB", path: "models.zip", file: "xgboost_strategy3_best.zip" },
        { name: "All Models Bundle", size: "450 MB", path: "models.zip", file: "all_trained_models.zip" },
      ],
    },
    {
      title: "Jupyter Notebooks & Code",
      icon: BookOpen,
      items: [
        { name: "Complete Training + Evaluation Notebook", size: "3.1 MB", path: "Model_for_algorithm_selection_in_3d_printing_in_additive_manufacturing (1).ipynb", file: "3d_nesting_automated_training.ipynb" },
        { name: "Data Generation & Preprocessing Script", size: "180 KB", path: "Model_for_algorithm_selection_in_3d_printing_in_additive_manufacturing (1).ipynb", file: "generate_nesting_scenarios.py" },
      ],
    },
    {
      title: "Documentation & Papers",
      icon: FileText,
      items: [
        { name: "Dataset Documentation", size: "2.5 MB", path: "dataset_documentation.pdf", file: "dataset_documentation.pdf" },
        { name: "Model Training & Strategy Report", size: "3.2 MB", path: "model_documentation.pdf", file: "model_training_strategies.pdf" },
      ],
    },
  ];

  return (
    <PageLayout>
      {/* Aesthetic Background Orbs */}
      <div className="fixed inset-0 w-full h-full bg-white -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-green-200/70 blur-[150px]" />
        <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-200/60 blur-[140px]" />
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
              <SectionHeading subtitle="Everything you need to reproduce, extend, and deploy our research">
                Downloads Center
              </SectionHeading>

              <p className="mt-8 text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                All datasets, trained models, source code, notebooks, and documentation are freely available under the{" "}
                <span className="font-bold text-gradient">MIT License</span> — use them for research, industry, or teaching.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Download Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="space-y-20">
              {downloadSections.map((section, secIdx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: secIdx * 0.15 }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <section.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gradient">{section.title}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {section.items.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <GlassCard className="group p-6 hover:shadow-2xl hover:shadow-green/20 transition-all duration-500 h-full flex items-center justify-between">
                          <div className="flex-1 pr-6">
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gradient transition">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                                {item.path.split(".").pop()?.toUpperCase()}
                              </span>
                              <span className="font-medium">{item.size}</span>
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDownload(item.path, item.file)}
                            className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-green transition-all"
                            title={`Download ${item.name}`}
                          >
                            <Download className="w-7 h-7" />
                          </motion.button>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* License & Trust */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <GlassCard className="border-2 border-green-500/30 bg-gradient-to-br from-green-50/50 to-emerald-50/30 backdrop-blur">
              <div className="text-center p-10">
                <Shield className="w-16 h-16 mx-auto text-green-600 mb-6" />
                <h3 className="text-3xl font-bold text-gradient mb-4">Open & Permissive License</h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Everything on this page is released under the <strong>MIT License</strong> — one of the most permissive open-source licenses.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-6 py-3 bg-green-100 text-green-700 rounded-full text-lg font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Free for Commercial Use
                  </span>
                  <span className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-full text-lg font-bold">
                    No Attribution Required
                  </span>
                  <span className="px-6 py-3 bg-teal-100 text-teal-700 rounded-full text-lg font-bold">
                    Modify & Redistribute
                  </span>
                </div>

                <p className="mt-8 text-sm text-muted-foreground">
                  See <code className="bg-white/50 px-2 py-1 rounded">LICENSE</code> file in each download for full terms.
                </p>
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
                Start Building Tomorrow’s Nesting Systems Today
              </h2>
              <div className="flex flex-wrap gap-6 justify-center mt-10">
                <GradientButton href="/demo" className="text-lg px-10 py-5">
                  Try Live Demo
                </GradientButton>
                <GradientButton href="/docs" className="text-lg px-10 py-5">
                  Read Research Paper
                </GradientButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Downloads;