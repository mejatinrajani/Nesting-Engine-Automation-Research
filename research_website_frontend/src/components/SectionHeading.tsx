import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export const SectionHeading = ({ children, className, subtitle }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-10"
    >
      <h2 className={cn("text-3xl md:text-4xl font-bold text-green-800 mb-3 tracking-tight", className)}>
        {children}
      </h2>
      <div className="w-16 h-0.5 bg-green-500 mx-auto mb-4" />
      {subtitle && (
        <p className="text-base text-gray-500 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
