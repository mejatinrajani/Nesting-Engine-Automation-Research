import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const GradientButton = ({ children, className, href, onClick }: GradientButtonProps) => {
  const baseClasses = cn(
    "inline-block bg-gradient-primary animate-gradient px-8 py-4 rounded-xl text-white font-semibold shadow-green hover:shadow-floating transition-all duration-300 text-center",
    className
  );

  if (href) {
    if (href.startsWith("http")) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={baseClasses}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <Link to={href}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={baseClasses}
        >
          {children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
};
