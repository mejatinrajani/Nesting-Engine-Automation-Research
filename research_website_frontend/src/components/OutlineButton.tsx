import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface OutlineButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const OutlineButton = ({ children, className, href, onClick }: OutlineButtonProps) => {
  const baseClasses = cn(
    "inline-block px-8 py-4 rounded-xl font-semibold border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white transition-all duration-300 shadow-soft hover:shadow-green text-center",
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
