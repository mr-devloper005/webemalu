import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { ArticleProvider } from "@/contexts/ArticleContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import Topics from "./pages/Topics";
import Bookmarks from "./pages/Bookmarks";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <BookmarkProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ArticleProvider>
              <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/article/:id" element={<ArticlePage />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/topics" element={<Topics />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
            </ArticleProvider>
          </TooltipProvider>
        </BookmarkProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
