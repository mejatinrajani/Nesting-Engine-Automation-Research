import { Github, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-green-200 bg-white py-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-base font-semibold text-green-800 mb-3">ML Research</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Open-source machine learning research project with comprehensive models and datasets.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/dataset" className="hover:text-green-700 transition-colors">Dataset</Link></li>
              <li><Link to="/models" className="hover:text-green-700 transition-colors">Models</Link></li>
              <li><Link to="/demo" className="hover:text-green-700 transition-colors">Demo</Link></li>
              <li><Link to="/docs" className="hover:text-green-700 transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/downloads" className="hover:text-green-700 transition-colors">Downloads</Link></li>
              <li><Link to="/comparison" className="hover:text-green-700 transition-colors">Comparison</Link></li>
              <li><Link to="/about" className="hover:text-green-700 transition-colors">About</Link></li>
              <li><a href="https://github.com/mejatinrajani" target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition-colors">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/mejatinrajani" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:mejatinrajani.tech@gmail.com" className="text-gray-400 hover:text-green-700 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-100 mt-8 pt-6 text-center text-xs text-gray-400">
          <p>&copy; 2026 ML Research Project. Open Source under MIT License.</p>
        </div>
      </div>
    </footer>
  );
};
