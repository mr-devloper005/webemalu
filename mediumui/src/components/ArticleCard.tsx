import { Link } from "react-router-dom";
import { useArticles } from "@/contexts/ArticleContext";
import { getUserById } from "@/data/users";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ImageWithFallback";

interface ArticleCardProps {
  articleId: string;
  variant?: "default" | "compact" | "featured";
}

const ArticleCard = ({ articleId, variant = "default" }: ArticleCardProps) => {
  const { articles } = useArticles();
  const article = articles.find((a) => a.id === articleId);
  if (!article) return null;
  const author = getUserById(article.authorId);
  if (!author) return null;

  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (variant === "featured") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to={`/article/${article.id}`} className="group block" onClick={() => window.scrollTo(0, 0)}>
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ImageWithFallback src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-sm font-medium">{author.name}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-bold leading-tight group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed line-clamp-2">
                {article.subtitle}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{date}</span>
                <span>·</span>
                <span>{article.readingTime} min read</span>
                <span>·</span>
                <span className="tag-badge text-xs">{article.tags[0]}</span>
              </div>
            </div>
            <div className="aspect-[16/10] rounded-sm overflow-hidden">
              <ImageWithFallback src={article.coverImage} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/article/${article.id}`} className="group flex gap-4 items-start" onClick={() => window.scrollTo(0, 0)}>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <ImageWithFallback src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-xs font-medium">{author.name}</span>
          </div>
          <h3 className="font-display font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <div className="text-xs text-muted-foreground">
            {date} · {article.readingTime} min read
          </div>
        </div>
        <div className="w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden">
          <ImageWithFallback src={article.coverImage} alt="" className="w-full h-full object-cover" />
        </div>
      </Link>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Link to={`/article/${article.id}`} className="group block" onClick={() => window.scrollTo(0, 0)}>
        <div className="flex gap-5 items-start">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <ImageWithFallback src={author.avatar} alt={author.name} className="w-5 h-5 rounded-full object-cover" />
              <span className="text-sm font-medium">{author.name}</span>
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl leading-snug group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 hidden sm:block">
              {article.subtitle}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{date}</span>
              <span>·</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
          <div className="w-24 h-24 sm:w-32 sm:h-28 flex-shrink-0 rounded-sm overflow-hidden">
            <ImageWithFallback src={article.coverImage} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
