import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Heart, Share, MoreHorizontal } from "lucide-react";
import { notifications } from "@/data/notifications";
import { getUserById } from "@/data/users";
import { useArticles } from "@/contexts/ArticleContext";
import { useAuth } from "@/contexts/AuthContext";
import ImageWithFallback from "@/components/ImageWithFallback";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import ReportDialog from "@/components/ReportDialog";

const tabs = [
  { id: "for-you", label: "For you" },
  { id: "featured", label: "Featured" },
] as const;

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("for-you");
  const { getArticleById, updateArticle } = useArticles();
  const { currentUser, toggleFollow, isFollowing, toggleMute, isMuted } = useAuth();
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!currentUser) {
      setLikedMap({});
      return;
    }
    const key = `medium_liked_articles_${currentUser.id}`;
    try {
      const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
      const next: Record<string, boolean> = {};
      list.forEach((id) => {
        next[id] = true;
      });
      setLikedMap(next);
    } catch {
      setLikedMap({});
    }
  }, [currentUser]);

  const filtered = useMemo(
    () => notifications.filter((notification) => notification.bucket === activeTab),
    [activeTab]
  );

  const formatDate = (dateValue: string) =>
    new Date(dateValue).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const handleClap = (articleId: string) => {
    if (!currentUser) {
      toast("Sign in to clap for stories");
      return;
    }
    const key = `medium_liked_articles_${currentUser.id}`;
    let list: string[] = [];
    try {
      list = JSON.parse(localStorage.getItem(key) || "[]");
    } catch {}
    const already = list.includes(articleId);
    const updatedList = already ? list.filter((id) => id !== articleId) : [...list, articleId];
    localStorage.setItem(key, JSON.stringify(updatedList));

    setLikedMap((prev) => ({ ...prev, [articleId]: !already }));

    const article = getArticleById(articleId);
    if (article) {
      const newCount = article.claps + (already ? -1 : 1);
      updateArticle({ ...article, claps: newCount });
    }
  };

  const handleShare = async (articleId: string) => {
    const url = `${window.location.origin}/article/${articleId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleReport = (actorId: string, reason: string) => {
    toast.success(`Report submitted: ${reason}`);
  };

  return (
    <section className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Inbox</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            Notifications
          </h1>
        </div>
      </div>

      <div className="mt-8 border-b border-border/60 flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border/70 p-10 text-center text-sm text-muted-foreground">
            You are all caught up.
          </div>
        )}

        {filtered.map((notification) => {
          const article = notification.articleId ? getArticleById(notification.articleId) : undefined;
          const actor = getUserById(notification.actorId);
          if (!article || !actor) return null;

          return (
            <div key={notification.id} className="border-b border-border/60 pb-8 last:border-0">
              <div className="flex gap-6 items-start">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ImageWithFallback
                      src={actor.avatar}
                      alt={actor.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-medium text-foreground">{actor.name}</span>
                    <span>·</span>
                    <span>{notification.message}</span>
                  </div>
                  <Link
                    to={`/article/${article.id}`}
                    className="block font-display text-xl sm:text-2xl font-bold leading-snug hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                  <p className="text-muted-foreground text-sm sm:text-base line-clamp-2">
                    {article.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(notification.createdAt)}</span>
                    <span>·</span>
                    <span>{article.readingTime} min read</span>
                    <span>·</span>
                    <span>{article.claps} claps</span>
                    <div className="ml-auto flex items-center gap-2 text-muted-foreground">
                      <button
                        onClick={() => handleClap(article.id)}
                        className={`p-2 rounded-full hover:bg-secondary ${likedMap[article.id] ? "text-primary" : ""}`}
                        aria-label="Like story"
                      >
                        <Heart className="w-4 h-4" fill={likedMap[article.id] ? "currentColor" : "none"} />
                      </button>
                      <Link
                        to={`/article/${article.id}#comments`}
                        className="p-2 rounded-full hover:bg-secondary"
                        aria-label="Open comments"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleShare(article.id)}
                        className="p-2 rounded-full hover:bg-secondary"
                        aria-label="Share story"
                      >
                        <Share className="w-4 h-4" />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-full hover:bg-secondary" aria-label="More options">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => {
                              if (!currentUser) {
                                toast("Sign in to follow authors");
                                return;
                              }
                              toggleFollow(actor.id);
                              toast(isFollowing(actor.id) ? "Unfollowed author" : "Following author");
                            }}
                          >
                            {isFollowing(actor.id) ? "Unfollow author" : "Follow author"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (!currentUser) {
                                toast("Sign in to mute authors");
                                return;
                              }
                              toggleMute(actor.id);
                              toast(isMuted(actor.id) ? "Author unmuted" : "Author muted");
                            }}
                          >
                            {isMuted(actor.id) ? "Unmute author" : "Mute author"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <ReportDialog
                            onReport={(reason) => handleReport(actor.id, reason)}
                          >
                            <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                              Report story
                            </DropdownMenuItem>
                          </ReportDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                <div className="w-28 h-24 sm:w-36 sm:h-28 flex-shrink-0 rounded-sm overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Notifications;
