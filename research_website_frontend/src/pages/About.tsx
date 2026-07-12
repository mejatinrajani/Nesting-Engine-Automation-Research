import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { OutlineButton } from "@/components/OutlineButton";
import { Mail, Github, Linkedin, Brain, Heart, Globe } from "lucide-react";

const About = () => {
  const openEmail = () => {
    window.location.href = "mailto:mejatinrajani.tech@gmail.com?subject=Regarding%20Your%203D%20Nesting%20AI%20Research";
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
              <SectionHeading subtitle="The researcher behind this work">
                About the Author
              </SectionHeading>

              <p className="mt-6 text-lg text-gray-500 max-w-4xl mx-auto leading-relaxed">
                This research represents years of work towards applying AI to solve real industrial challenges in 3D nesting and additive manufacturing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Profile */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="overflow-hidden">
                <div className="p-10 text-center">
                  <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 border-green-200">
                    <img src="/my_img.jpeg" alt="Jatin Rajani" className="w-full h-full object-cover" />
                  </div>

                  <h2 className="text-3xl font-bold text-green-900 mb-2">
                    Jatin Rajani
                  </h2>
                  <p className="text-base text-green-600 font-medium mb-6">
                    Machine Learning Researcher · Additive Manufacturing AI
                  </p>

                  <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed mb-8 text-sm">
                    I am a researcher focused on applying AI to solve real industrial problems — specifically, automatically choosing the best 3D nesting algorithm for any given job.
                    <br /><br />
                    This project represents over 18 months of work: generating 25K+ synthetic scenarios, training multiple strategies, and optimizing XGBoost models to prove that smart, interpretable AI can outperform human heuristics in additive manufacturing.
                  </p>

                  <div className="flex justify-center gap-4">
                    <a
                      href="mailto:mejatinrajani.tech@gmail.com"
                      onClick={(e) => { e.preventDefault(); openEmail(); }}
                      className="p-3 border border-green-300 text-green-700 bg-white hover:bg-green-50 transition-colors hover-round-btn"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/mejatinrajani"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 transition-colors hover-round-btn"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/mejatinrajani"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 transition-colors hover-round-btn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 border-t border-green-100 bg-green-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <SectionHeading subtitle="Core principles guiding this research">
              Research Values
            </SectionHeading>
            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded bg-green-600 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-green-800 mb-3">Passion-Driven Research</h3>
                <p className="text-sm text-gray-500">
                  Every experiment and iteration was fueled by a genuine desire to make AI useful in the real world.
                </p>
              </GlassCard>

              <GlassCard className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded bg-green-600 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-green-800 mb-3">Open Science First</h3>
                <p className="text-sm text-gray-500">
                  Full dataset, models, code, and documentation released under MIT — because knowledge grows when shared.
                </p>
              </GlassCard>

              <GlassCard className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded bg-green-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-green-800 mb-3">Impact Over Ego</h3>
                <p className="text-sm text-gray-500">
                  This work is dedicated to researchers, engineers, and makers who want to build the future of smart manufacturing.
                </p>
              </GlassCard>
            </div>
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
                Get in Touch
              </h2>
              <p className="text-gray-500 mb-8 text-sm">
                Whether you are a researcher, startup founder, or industry engineer — if you are interested in AI-powered manufacturing, I would be glad to connect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GradientButton onClick={openEmail} className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Send an Email
                </GradientButton>
                <OutlineButton href="/downloads">
                  Download Research Assets
                </OutlineButton>
              </div>

              <p className="mt-8 text-xs text-gray-400">
                mejatinrajani.tech@gmail.com
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default About;