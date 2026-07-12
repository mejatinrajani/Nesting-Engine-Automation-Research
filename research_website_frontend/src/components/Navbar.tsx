import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Dataset", path: "/dataset" },
  { name: "Models", path: "/models" },
  { name: "Comparison", path: "/comparison" },
  { name: "Demo", path: "/demo" },
  { name: "Docs", path: "/docs" },
  { name: "Downloads", path: "/downloads" },
  { name: "About", path: "/about" },
];

export const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-green-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Site title / logo */}
          <Link to="/" className="text-green-800 font-semibold text-sm tracking-wide">
            3D Nesting Research
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2",
                  location.pathname === item.path
                    ? "border-green-600 text-green-700"
                    : "border-transparent text-gray-600 hover:text-green-700 hover:border-green-300"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-green-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden border-t border-green-100 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-2 text-sm font-medium transition-colors duration-200",
                  location.pathname === item.path
                    ? "text-green-700 bg-green-50"
                    : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};