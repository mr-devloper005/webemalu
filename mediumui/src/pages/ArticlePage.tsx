import { useParams, Link, useNavigate } from "react-router-dom";
import { useArticles } from "@/contexts/ArticleContext";
import { getUserById } from "@/data/users";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useAuth } from "@/contexts/AuthContext";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import CommentSection from "@/components/CommentSection";
import ArticleCard from "@/components/ArticleCard";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Heart, Bookmark, Share, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, getArticleById, deleteArticle, updateArticle } = useArticles();
  const { currentUser, toggleFollow, isFollowing } = useAuth();
  const article = id ? getArticleById(id) : undefined;
  // keep local clap count and liked state per user
  const [claps, setClaps] = useState(article?.claps || 0);
  const [liked, setLiked] = useState(false);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = id ? isBookmarked(id) : false;

  useEffect(() => {
    if (article) {
      // scroll back to top when navigating between articles
      window.scrollTo(0, 0);
      setClaps(article.claps);
      // load liked state for this user/article
      if (currentUser) {
        const key = `medium_liked_articles_${currentUser.id}`;
        try {
          const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
          setLiked(list.includes(article.id));
        } catch {
          setLiked(false);
        }
      } else {
        setLiked(false);
      }
    }
  }, [article, currentUser]);

  const handleClap = () => {
    if (!article || !currentUser) return;
    const key = `medium_liked_articles_${currentUser.id}`;
    let list: string[] = [];
    try {
      list = JSON.parse(localStorage.getItem(key) || "[]");
    } catch {}
    const already = list.includes(article.id);
    const updatedList = already ? list.filter((i) => i !== article.id) : [...list, article.id];
    localStorage.setItem(key, JSON.stringify(updatedList));

    const delta = already ? -1 : 1;
    const newCount = claps + delta;
    setClaps(newCount);
    setLiked(!already);
    // update article in context so other components see it
    updateArticle({ ...article, claps: newCount });
  };

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Article not found</h1>
        <Link to="/" className="text-primary hover:underline">Go home</Link>
      </div>
    );
  }

  const author = getUserById(article.authorId);
  if (!author) return null;
  
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);

  const handleBookmark = () => {
    toggleBookmark(article.id);
    toast(bookmarked ? "Removed from reading list" : "Added to reading list");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const ActionBar = () => (
    <div className="flex items-center justify-between border-y py-3">
      <div className="flex items-center gap-5">
        <button onClick={handleClap} className={`flex items-center gap-1.5 ${liked ? "text-primary" : "text-muted-foreground hover:text-primary"} transition-colors` }>
          <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
          <span className="text-sm">{claps}</span>
        </button>
        <a href="#comments" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={handleBookmark} className={`transition-colors ${bookmarked ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
          <Bookmark className="w-5 h-5" fill={bookmarked ? "currentColor" : "none"} />
        </button>
        <button onClick={handleShare} className="text-muted-foreground hover:text-foreground transition-colors">
          <Share className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const isAuthor = currentUser && article && currentUser.id === article.authorId;

  const handleDelete = () => {
    if (!article) return;
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle(article.id);
      toast("Article deleted");
      navigate("/");
    }
  };

  return (
    <>
      <ReadingProgressBar />
      <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-[720px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-4">{article.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">{article.subtitle}</p>
          <div className="flex items-center gap-3 mb-6">
            <Link to={`/profile/${author.id}`}>
              <ImageWithFallback src={author.avatar} alt={author.name} className="w-11 h-11 rounded-full object-cover" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Link to={`/profile/${author.id}`} className="font-medium text-sm hover:text-primary transition-colors">{author.name}</Link>
                {currentUser && currentUser.id !== author.id && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <button 
                      onClick={() => toggleFollow(author.id)}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      {isFollowing(author.id) ? "Following" : "Follow"}
                    </button>
                  </>
                )}
              </div>
              <div className="text-sm text-muted-foreground">{article.readingTime} min read · {date}</div>
            </div>
          </div>
          <ActionBar />
          {isAuthor && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigate(`/write?edit=${article.id}`)}
                className="px-4 py-1.5 bg-secondary text-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1.5 bg-destructive text-destructive-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
            </div>
          )}
        </header>

        <ImageWithFallback src={article.coverImage} alt={article.title} className="w-full rounded-sm mb-8" />
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

        <div className="flex flex-wrap gap-2 mt-10 mb-8">
          {article.tags.map((tag) => (
            <Link key={tag} to={`/topics?t=${tag}`} className="tag-badge">{tag}</Link>
          ))}
        </div>

        <ActionBar />

        <div className="flex items-start gap-4 my-12 p-6 bg-secondary rounded-lg">
          <Link to={`/profile/${author.id}`}>
            <ImageWithFallback src={author.avatar} alt={author.name} className="w-16 h-16 rounded-full object-cover" />
          </Link>
          <div>
            <Link to={`/profile/${author.id}`} className="font-display font-bold text-lg hover:text-primary transition-colors">{author.name}</Link>
            <p className="text-sm text-muted-foreground mt-1 mb-3">{author.bio}</p>
            {currentUser && currentUser.id !== author.id && (
              <button
                onClick={() => toggleFollow(author.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-opacity ${
                  isFollowing(author.id)
                    ? "bg-secondary text-foreground"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {isFollowing(author.id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>

        <div id="comments">
          <CommentSection articleId={article.id} />
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display font-bold text-xl mb-6">More from Webemalu</h3>
            <div className="space-y-8">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.id} articleId={a.id} />
              ))}
            </div>
          </div>
        )}
      </motion.article>
    </>
  );
};

export default ArticlePage;
