import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { OutlineButton } from "@/components/OutlineButton";
import { Download, Database, FileCode, BookOpen, FileText, Shield, CheckCircle } from "lucide-react";

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
      <div>
        {/* Hero */}
        <section className="py-16 md:py-20 border-b border-green-100">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading subtitle="Everything required to reproduce, extend, and deploy this research">
                Downloads Centre
              </SectionHeading>

              <p className="mt-6 text-gray-500 max-w-4xl mx-auto text-sm leading-relaxed">
                All datasets, trained models, source code, notebooks, and documentation are freely available under the{" "}
                <strong className="text-green-700">MIT License</strong> — for research, industry, or teaching.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Download Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="space-y-16">
              {downloadSections.map((section, secIdx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: secIdx * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded bg-green-600 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-green-900">{section.title}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {section.items.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 }}
                      >
                        <GlassCard className="flex items-center justify-between p-4">
                          <div className="flex-1 pr-4">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1">{item.name}</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                                {item.path.split(".").pop()?.toUpperCase()}
                              </span>
                              <span>{item.size}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDownload(item.path, item.file)}
                            className="p-2.5 border border-green-300 text-green-700 bg-white hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors hover-round-btn"
                            title={`Download ${item.name}`}
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* License */}
        <section className="py-16 border-t border-green-100 bg-green-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <GlassCard className="border-l-4 border-l-green-600">
              <div className="text-center p-8">
                <Shield className="w-12 h-12 mx-auto text-green-700 mb-4" />
                <h3 className="text-2xl font-bold text-green-900 mb-3">Open & Permissive License</h3>
                <p className="text-gray-500 text-sm mb-8 max-w-3xl mx-auto">
                  All resources on this page are released under the <strong>MIT License</strong> — one of the most permissive open-source licenses available.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Free for Commercial Use
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    No Attribution Required
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Modify & Redistribute
                  </span>
                </div>

                <p className="mt-6 text-xs text-gray-400">
                  See <code className="bg-white px-1.5 py-0.5 rounded border border-green-200">LICENSE</code> file in each download for full terms.
                </p>
              </div>
            </GlassCard>
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
                Begin Building with the Research Assets
              </h2>
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <GradientButton href="/demo">Try Live Demo</GradientButton>
                <OutlineButton href="/docs">Read Research Documentation</OutlineButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Downloads;