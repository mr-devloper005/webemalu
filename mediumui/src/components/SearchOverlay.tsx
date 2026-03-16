import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useArticles } from "@/contexts/ArticleContext";
import { getUserById } from "@/data/users";
import { motion, AnimatePresence } from "framer-motion";
import ImageWithFallback from "@/components/ImageWithFallback";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const { articles } = useArticles();
  const filtered = query.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="max-w-[600px] mt-20 mx-4 sm:mx-auto bg-background border rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 border-b">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="flex-1 py-4 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {query.trim() && filtered.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-10">
                  No articles found for "{query}"
                </p>
              )}
              {filtered.map((article) => {
                const author = getUserById(article.authorId);
                return (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}`}
                    onClick={onClose}
                    className="flex items-start gap-4 px-4 py-3 hover:bg-secondary transition-colors border-b last:border-0"
                  >
                    <ImageWithFallback src={article.coverImage} alt="" className="w-14 h-14 rounded object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display font-bold text-sm leading-snug line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{author?.name}</span>
                        <span>·</span>
                        <span>{article.readingTime} min read</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
              {!query.trim() && (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  <p>Start typing to search articles</p>
                  <p className="text-xs mt-1">Press <kbd className="px-1.5 py-0.5 rounded border bg-secondary text-xs">ESC</kbd> to close</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
