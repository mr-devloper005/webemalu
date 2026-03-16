import { Link } from "react-router-dom";
import { siteConfig } from "@/config/siteConfig";
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => (
  <footer className="bg-black text-white mt-16">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-4">
          <Link to="/" className="font-display text-lg font-bold tracking-tight" onClick={() => window.scrollTo(0, 0)}>
            {siteConfig.website.name}
          </Link>
          <div className="flex gap-4">
            <a 
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:justify-items-end sm:text-right">
          {siteConfig.footer.links.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="hover:text-gray-300 transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-4">
        {siteConfig.footer.copyright}
      </div>
    </div>
  </footer>
);

export default Footer;
