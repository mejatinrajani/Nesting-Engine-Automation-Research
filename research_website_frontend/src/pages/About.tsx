import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassCard } from "@/components/GlassCard";
import { GradientButton } from "@/components/GradientButton";
import { Mail, Github, Twitter, Linkedin, Brain, Sparkles, Heart, Globe } from "lucide-react";

const About = () => {
  const openEmail = () => {
    window.location.href = "mailto:mejatinrajani@gmail.com?subject=Regarding%20Your%203D%20Nesting%20AI%20Research";
  };

  return (
    <PageLayout>
      {/* Aesthetic Background Orbs */}
      <div className="fixed inset-0 w-full h-full bg-white -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-green-200/70 blur-[150px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-200/60 blur-[140px]" />
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
              <SectionHeading subtitle="The human behind the breakthrough">
                Meet the Researcher
              </SectionHeading>

              <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                This isn’t just a project — it’s years of passion, late nights, and a deep belief that{" "}
                <span className="text-gradient font-bold">AI can make manufacturing smarter, greener, and more accessible</span>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Profile Spotlight */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="overflow-hidden border-2 border-green-500/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/10" />
                <div className="relative p-10 text-center">
                  <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl ring-8 ring-white/50">
                    <span className="text-7xl font-bold text-white">J</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-3">
                    Jatin Rajani
                  </h2>
                  <p className="text-2xl text-emerald-600 font-medium mb-6">
                    Machine Learning Researcher • Additive Manufacturing AI
                  </p>

                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
                    I’m a researcher driven by the vision of using AI to solve real industrial problems — starting with one of the hardest:{" "}
                    <strong>automatically choosing the best 3D nesting algorithm</strong> for any given job.
                    <br /><br />
                    This project represents over 18 months of work: generating 25K+ synthetic scenarios, training multiple strategies, and pushing XGBoost to its limits — all to prove that smart, interpretable AI can outperform human heuristics in additive manufacturing.
                  </p>

                  <div className="flex justify-center gap-6">
                    <motion.a
                      href="mailto:mejatinrajani@gmail.com"
                      onClick={(e) => {
                        e.preventDefault();
                        openEmail();
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-green transition-all"
                    >
                      <Mail className="w-7 h-7" />
                    </motion.a>
                    <motion.a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 rounded-2xl bg-white/80 backdrop-blur border border-gray-300 text-gray-800 hover:bg-gray-100 transition-all shadow-md"
                    >
                      <Github className="w-7 h-7" />
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/mejatinrajani"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 rounded-2xl bg-white/80 backdrop-blur border border-gray-300 text-gray-800 hover:bg-gray-100 transition-all shadow-md"
                    >
                      <Linkedin className="w-7 h-7" />
                    </motion.a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <Heart className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gradient mb-4">Passion-Driven Research</h3>
                <p className="text-muted-foreground">
                  Every line of code, every experiment, and every late night was fueled by a genuine desire to make AI useful in the real world.
                </p>
              </GlassCard>

              <GlassCard className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Globe className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gradient mb-4">Open Science First</h3>
                <p className="text-muted-foreground">
                  Full dataset, models, code, and documentation released under MIT — because knowledge grows when shared.
                </p>
              </GlassCard>

              <GlassCard className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <Brain className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gradient mb-4">Impact Over Ego</h3>
                <p className="text-muted-foreground">
                  This work is dedicated to researchers, engineers, and makers who want to build the future of smart manufacturing.
                </p>
              </GlassCard>
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
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
                Let’s Build the Future Together
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Whether you're a researcher, startup founder, or industry engineer — if you're excited about AI-powered manufacturing, I’d love to hear from you.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <GradientButton
                  onClick={openEmail}
                  className="text-lg px-10 py-5 flex items-center gap-3"
                >
                  <Mail className="w-6 h-6" />
                  Get in Touch
                </GradientButton>
                <GradientButton
                  href="/downloads"
                  className="text-lg px-10 py-5"
                >
                  Download Everything
                </GradientButton>
              </div>

              <p className="mt-12 text-sm text-muted-foreground">
                mejatinrajani@gmail.com • Always happy to collaborate, advise, or just geek out about nesting algorithms
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default About;