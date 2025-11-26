import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4, boxShadow: "0 16px 40px rgba(11, 16, 25, 0.12), 0 6px 20px rgba(94, 219, 152, 0.10), 0 6px 20px rgba(89, 176, 247, 0.10)" } : undefined}
      className={cn(
        "glass-card rounded-xl p-6 shadow-soft transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
