import { Github, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t-4 border-green-600   py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">ML Research</h3>
            <p className="text-muted-foreground text-sm">
              Open-source machine learning research project with comprehensive models and datasets.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dataset" className="hover:text-primary transition">Dataset</Link></li>
              <li><Link to="/models" className="hover:text-primary transition">Models</Link></li>
              <li><Link to="/demo" className="hover:text-primary transition">Demo</Link></li>
              <li><Link to="/docs" className="hover:text-primary transition">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/downloads" className="hover:text-primary transition">Downloads</Link></li>
              <li><Link to="/comparison" className="hover:text-primary transition">Comparison</Link></li>
              <li><Link to="/about" className="hover:text-primary transition">About</Link></li>
              <li><a href="#" className="hover:text-primary transition">GitHub</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:research@example.com" className="text-muted-foreground hover:text-primary transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-200/30 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ML Research Project. Open Source under MIT License.</p>
        </div>
      </div>
    </footer>
  );
};
