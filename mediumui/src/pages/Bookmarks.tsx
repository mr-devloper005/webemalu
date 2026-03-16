import { useArticles } from "@/contexts/ArticleContext";
import { useBookmarks } from "@/contexts/BookmarkContext";
import ArticleCard from "@/components/ArticleCard";
import { Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const { bookmarks } = useBookmarks();
  const { articles } = useArticles();
  const bookmarkedArticles = articles.filter((a) => bookmarks.includes(a.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[720px] mx-auto px-4 sm:px-6 py-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-6 h-6" />
        <h1 className="font-display text-3xl font-bold">Your reading list</h1>
      </div>

      {bookmarkedArticles.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Bookmark className="w-12 h-12 mx-auto text-muted-foreground/40" />
          <p className="text-muted-foreground">No bookmarks yet.</p>
          <p className="text-sm text-muted-foreground">
            Click the <Bookmark className="w-4 h-4 inline" /> icon on any article to save it here.
          </p>
          <Link to="/" className="text-primary text-sm hover:underline inline-block mt-2">Browse articles</Link>
        </div>
      ) : (
        <div className="space-y-8">
          {bookmarkedArticles.map((article) => (
            <div key={article.id} className="pb-8 border-b last:border-0">
              <ArticleCard articleId={article.id} />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Bookmarks;
