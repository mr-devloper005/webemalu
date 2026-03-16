import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "@/data/users";
import { useArticles } from "@/contexts/ArticleContext";
import { useAuth } from "@/contexts/AuthContext";
import ProfileHeader from "@/components/ProfileHeader";
import ArticleCard from "@/components/ArticleCard";
import ActivityTimeline from "@/components/ActivityTimeline";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { ArrowUpDown, Filter, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, toggleFollow, isFollowing } = useAuth();
  const [activeTab, setActiveTab] = useState("articles");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "oldest">("recent");
  const [filterBy, setFilterBy] = useState<"all" | "published" | "draft">("all");

  const [profileUser, setProfileUser] = useState(getUserById(id || ""));
  const { articles, deleteArticle } = useArticles();
  const { bookmarks } = useBookmarks();

  const followingFlag = isFollowing(profileUser?.id || "");

  useEffect(() => {
    setProfileUser(getUserById(id || ""));
  }, [id, followingFlag]);

  // ensure own profile reflects changes to currentUser
  useEffect(() => {
    if (currentUser && currentUser.id === profileUser?.id) {
      setProfileUser(currentUser);
    }
  }, [currentUser, profileUser?.id]);

  if (!profileUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">User not found</h1>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;
  const displayUser = isOwnProfile ? currentUser! : profileUser;
  const userArticles = articles.filter((a) => a.authorId === displayUser.id);
  const bookmarkedArticles = articles.filter((a) => bookmarks.includes(a.id));
  const tabs = ["Articles", "Activity", "About", "Saved"];

  // Calculate stats
  const totalClaps = userArticles.reduce((sum, article) => sum + article.claps, 0);
  const totalViews = userArticles.reduce((sum, article) => sum + Math.floor(Math.random() * 1000), 0); // Simulated views

  // Generate sample activity data
  const activities = useMemo(() => {
    const activityData = [
      ...userArticles.map(article => ({
        id: `article-${article.id}`,
        type: 'article' as const,
        title: `Published "${article.title}"`,
        description: article.subtitle,
        timestamp: article.publishedAt,
        metadata: {
          views: Math.floor(Math.random() * 1000),
          claps: article.claps,
          comments: Math.floor(Math.random() * 50)
        }
      })),
      {
        id: 'milestone-1',
        type: 'milestone' as const,
        title: 'Reached 100 followers',
        description: 'Thank you for your support!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'milestone-2',
        type: 'milestone' as const,
        title: 'Top Writer in Technology',
        description: 'Your articles are trending in Technology',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return activityData.slice(0, 10);
  }, [userArticles]);

  // Sort and filter articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = userArticles;
    
    // For demo purposes, we'll consider all articles as published
    if (filterBy === "published") {
      filtered = filtered.filter(article => article.featured !== false);
    } else if (filterBy === "draft") {
      filtered = filtered.filter(article => article.featured === false);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.claps - a.claps;
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "recent":
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });
  }, [userArticles, sortBy, filterBy]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10"
    >
      <ProfileHeader
        user={displayUser}
        isOwnProfile={isOwnProfile}
        isFollowing={!isOwnProfile && isFollowing(displayUser.id)}
        onToggleFollow={() => {
          if (!isOwnProfile) {
            toggleFollow(displayUser.id);
          }
        }}
        joinDate="January 2024"
        location="San Francisco, CA"
        website="webemalu.com/@username"
        articlesCount={userArticles.length}
        totalViews={totalViews}
        totalClaps={totalClaps}
      />

      {/* Enhanced Tabs */}
      <div className="flex gap-6 border-b mt-10 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.toLowerCase()
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Articles Tab with Enhanced Features */}
      {activeTab === "articles" && (
        <div className="space-y-6">
          {/* Sort and Filter Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredAndSortedArticles.length} {filteredAndSortedArticles.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    {filterBy === "all" ? "All" : filterBy === "published" ? "Published" : "Drafts"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterBy("all")}>
                    All Articles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterBy("published")}>
                    Published
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterBy("draft")}>
                    Drafts
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowUpDown className="w-4 h-4" />
                    {sortBy === "recent" ? "Recent" : sortBy === "popular" ? "Popular" : "Oldest"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Most Recent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Most Popular
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Oldest First
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="space-y-6">
            {filteredAndSortedArticles.map((article) => (
              <div key={article.id} className="relative group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <ArticleCard articleId={article.id} />
                  </div>
                  {isOwnProfile && (
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => navigate(`/write?edit=${article.id}`)}
                        className="px-3 py-1.5 bg-secondary text-foreground rounded-lg text-xs font-medium hover:bg-secondary/80 transition-colors whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Delete this article?")) {
                            deleteArticle(article.id);
                          }
                        }}
                        className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded-lg text-xs font-medium hover:bg-destructive/90 transition-colors whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {filteredAndSortedArticles.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-lg">No articles found.</p>
                {isOwnProfile && (
                  <button
                    onClick={() => navigate('/write')}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Write your first article
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === "activity" && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <ActivityTimeline activities={activities} />
        </div>
      )}

      {/* About Tab */}
      {activeTab === "about" && (
        <div className="space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-lg leading-relaxed">{displayUser.bio}</p>
          </div>
          
          {/* Additional Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {["Technology", "Design", "Productivity", "Writing"].map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Reading Time</span>
                  <span className="font-medium">{userArticles.reduce((sum, article) => sum + article.readingTime, 0)} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Claps per Article</span>
                  <span className="font-medium">
                    {userArticles.length > 0 ? Math.round(totalClaps / userArticles.length) : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Tab */}
      {activeTab === "saved" && (
        <div className="space-y-6">
          {bookmarkedArticles.map((article) => (
            <div key={article.id} className="group">
              <ArticleCard articleId={article.id} />
            </div>
          ))}
          {bookmarkedArticles.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <p className="text-muted-foreground text-lg">No saved articles yet.</p>
              <p className="text-muted-foreground text-sm mt-2">
                Save articles you want to read later by clicking the bookmark icon.
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
