import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface OutlineButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const OutlineButton = ({ children, className, href, onClick }: OutlineButtonProps) => {
  const baseClasses = cn(
    "inline-block px-8 py-3 font-medium border border-green-600 text-green-700 bg-white hover:bg-green-600 hover:text-white transition-colors duration-200 text-center text-sm tracking-wide hover-round-btn",
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
