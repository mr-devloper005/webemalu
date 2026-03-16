import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Edit, Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import SearchOverlay from "@/components/SearchOverlay";
import { useAuth } from "@/contexts/AuthContext";
import ImageWithFallback from "@/components/ImageWithFallback";
import { useArticles } from "@/contexts/ArticleContext";
import { notifications } from "@/data/notifications";
import { getUserById } from "@/data/users";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { currentUser, signOut } = useAuth();
  const { getArticleById } = useArticles();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/topics", label: "Topics" },
    { to: "/bookmarks", label: "Bookmarks" },
    { to: "/write", label: "Write", icon: Edit },
  ];

  const previewNotifications = notifications.slice(0, 4).map((notification) => {
    const actor = getUserById(notification.actorId);
    const article = notification.articleId ? getArticleById(notification.articleId) : undefined;
    return { ...notification, actor, article };
  }).filter((notification) => notification.actor);

  const formatDate = (dateValue: string) =>
    new Date(dateValue).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-border shadow-sm" : "bg-background border-transparent"}`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="font-display text-2xl font-bold tracking-tight">Webemalu</Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${location.pathname === link.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  <span className="flex items-center gap-1.5">
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
              {currentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                      title="Notifications"
                      aria-label="Notifications"
                    >
                      <Bell className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-0 rounded-xl border-border/60 shadow-xl">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
                      <span className="text-sm font-semibold">Notifications</span>
                      <Link to="/notifications" className="text-xs text-primary hover:underline">
                        See all
                      </Link>
                    </div>
                    <div className="py-1">
                      {previewNotifications.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-muted-foreground">No new notifications yet.</div>
                      ) : (
                        previewNotifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            asChild
                            className="px-4 py-3 rounded-none focus:bg-muted/70"
                          >
                            <Link
                              to={notification.article ? `/article/${notification.article.id}` : "/notifications"}
                              className="flex gap-3"
                            >
                              <div className="relative">
                                <ImageWithFallback
                                  src={notification.actor?.avatar || ""}
                                  alt={notification.actor?.name || "Author avatar"}
                                  className="w-9 h-9 rounded-full object-cover"
                                />
                                {notification.unread && (
                                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
                                )}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="text-sm text-foreground">
                                  <span className="font-medium">{notification.actor?.name}</span>{" "}
                                  {notification.message}
                                </div>
                                {notification.article && (
                                  <div className="text-xs text-muted-foreground line-clamp-1">
                                    {notification.article.title}
                                  </div>
                                )}
                                <div className="text-[11px] text-muted-foreground">
                                  {formatDate(notification.createdAt)}
                                </div>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        ))
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="px-4 py-2.5 rounded-none focus:bg-muted/70">
                      <Link to="/notifications" className="text-sm font-medium text-primary">
                        View notifications
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <Link to={`/profile/${currentUser.id}`}>
                    <ImageWithFallback src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-primary/30 transition-all" />
                  </Link>
                  <button onClick={signOut} className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors" title="Sign out">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link to="/signin">
                  <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">Sign in</button>
                </Link>
              )}
            </div>

            <div className="md:hidden flex items-center gap-1">
              <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              {currentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 text-muted-foreground" aria-label="Notifications">
                      <Bell className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-0 rounded-xl border-border/60 shadow-xl">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
                      <span className="text-sm font-semibold">Notifications</span>
                      <Link to="/notifications" className="text-xs text-primary hover:underline">
                        See all
                      </Link>
                    </div>
                    <div className="py-1">
                      {previewNotifications.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-muted-foreground">No new notifications yet.</div>
                      ) : (
                        previewNotifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            asChild
                            className="px-4 py-3 rounded-none focus:bg-muted/70"
                          >
                            <Link
                              to={notification.article ? `/article/${notification.article.id}` : "/notifications"}
                              className="flex gap-3"
                            >
                              <div className="relative">
                                <ImageWithFallback
                                  src={notification.actor?.avatar || ""}
                                  alt={notification.actor?.name || "Author avatar"}
                                  className="w-9 h-9 rounded-full object-cover"
                                />
                                {notification.unread && (
                                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
                                )}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="text-sm text-foreground">
                                  <span className="font-medium">{notification.actor?.name}</span>{" "}
                                  {notification.message}
                                </div>
                                {notification.article && (
                                  <div className="text-xs text-muted-foreground line-clamp-1">
                                    {notification.article.title}
                                  </div>
                                )}
                                <div className="text-[11px] text-muted-foreground">
                                  {formatDate(notification.createdAt)}
                                </div>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        ))
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="px-4 py-2.5 rounded-none focus:bg-muted/70">
                      <Link to="/notifications" className="text-sm font-medium text-primary">
                        View notifications
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <ThemeToggle />
              <button className="p-2 text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              className="md:hidden border-t overflow-hidden bg-background">
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.to ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                    <span className="flex items-center gap-2">
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.label}
                    </span>
                  </Link>
                ))}
                {currentUser && (
                  <Link to="/notifications"
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === "/notifications" ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                    <span className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </span>
                  </Link>
                )}
                <div className="pt-2 border-t">
                  {currentUser ? (
                    <div className="flex items-center justify-between px-3 py-2.5">
                      <Link to={`/profile/${currentUser.id}`} className="flex items-center gap-2">
                        <ImageWithFallback src={currentUser.avatar} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-sm font-medium">{currentUser.name}</span>
                      </Link>
                      <button onClick={signOut} className="text-sm text-muted-foreground hover:text-foreground">Sign out</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link to="/signin" className="block px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary rounded-lg">Sign in</Link>
                      <Link to="/signup" className="block px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary rounded-lg">Sign up</Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
