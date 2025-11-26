import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MetricBadgeProps {
  label: string;
  value: string | number;
  className?: string;
  color?: "green" | "light" | "mint";
}

export const MetricBadge = ({ label, value, className, color = "green" }: MetricBadgeProps) => {
  const colorClasses = {
    green: "bg-green-100 text-green-700 border-green-300",
    light: "bg-green-50 text-green-600 border-green-200",
    mint: "bg-mint-100 text-green-700 border-mint-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "inline-flex flex-col items-center px-6 py-3 rounded-xl border-2",
        colorClasses[color],
        className
      )}
    >
      <span className="text-sm font-medium uppercase tracking-wide opacity-75">{label}</span>
      <span className="text-2xl font-bold mt-1">{value}</span>
    </motion.div>
  );
};
