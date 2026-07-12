import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const GradientButton = ({ children, className, href, onClick }: GradientButtonProps) => {
  const baseClasses = cn(
    "inline-block bg-green-600 px-8 py-3 text-white font-medium border border-green-700 hover:bg-green-700 transition-colors duration-200 text-center text-sm tracking-wide hover-round-btn",
    className
  );

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} className={baseClasses}>
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
};
