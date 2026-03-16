import { motion } from "framer-motion";
import { Search, HelpCircle, BookOpen, MessageCircle, Mail, ArrowRight, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);

  const toggleArticleExpansion = (articleTitle: string) => {
    setExpandedArticles(prev => 
      prev.includes(articleTitle) 
        ? prev.filter(title => title !== articleTitle)
        : [...prev, articleTitle]
    );
  };

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using Webemalu",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      icon: Users,
      title: "Account & Profile",
      description: "Manage your account and personal information",
      color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      icon: MessageCircle,
      title: "Writing & Publishing",
      description: "Create and publish your stories",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    },
    {
      icon: Star,
      title: "Membership & Billing",
      description: "Understand your subscription and payments",
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
    },
  ];

  const popularArticles = [
    {
      category: "Getting Started",
      title: "How do I create an account?",
      answer: "Click 'Sign up' in the top right corner. Enter your name, email, and a password to get started.",
      views: "12.5k"
    },
    {
      category: "Writing & Publishing",
      title: "How do I write an article?",
      answer: "Click 'Write' in the navigation bar. Add a title, write your content, select tags, and hit Publish.",
      views: "8.2k"
    },
    {
      category: "Getting Started",
      title: "How do I bookmark articles?",
      answer: "Click the bookmark icon on any article to save it to your reading list. Find them on the Bookmarks page.",
      views: "6.7k"
    },
    {
      category: "Account & Profile",
      title: "How do I edit my profile?",
      answer: "Go to your profile page and click 'Edit profile' to update your name, bio, and avatar.",
      views: "5.9k"
    },
    {
      category: "Account & Profile",
      title: "How do I follow other writers?",
      answer: "Visit someone's profile or article and click the 'Follow' button. You'll see their posts in your feed.",
      views: "4.3k"
    },
    {
      category: "Writing & Publishing",
      title: "How do I search for articles?",
      answer: "Click the search icon or press ⌘K to open search. Type keywords to find articles by title, subtitle, or topic.",
      views: "3.8k"
    },
  ];

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-slate-50 dark:bg-slate-900"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to your questions and learn how to make the most of Medium
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">Find help organized by topic</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">Popular Articles</h2>
            <p className="text-lg text-muted-foreground">Most viewed help articles</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.views} views</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{article.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {expandedArticles.includes(article.title) ? article.answer : `${article.answer.substring(0, 100)}...`}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleArticleExpansion(article.title)}
                      className="gap-2"
                    >
                      {expandedArticles.includes(article.title) ? 'Show Less' : 'Read More'}
                      <ArrowRight className={`w-3 h-3 transition-transform ${expandedArticles.includes(article.title) ? 'rotate-90' : ''}`} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try searching for different keywords</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold mb-4">Still need help?</h2>
              <ContactForm 
                title="Contact Support" 
                subtitle="Our support team is here to help you with any questions or issues you might have."
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center">
                  <Zap className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Help;
