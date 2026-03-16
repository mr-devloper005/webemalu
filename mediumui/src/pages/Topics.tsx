import { topics } from "@/data/articles";
import { useArticles } from "@/contexts/ArticleContext";
import ArticleCard from "@/components/ArticleCard";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const Topics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTopic = searchParams.get("t") || "";
  const { articles } = useArticles();

  const filteredArticles = activeTopic
    ? articles.filter((a) => a.tags.includes(activeTopic))
    : articles;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10"
    >
      <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Explore topics</h1>
      <p className="text-muted-foreground mb-8">Discover stories by topic</p>

      {/* Topic pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSearchParams({})}
          className={`tag-badge ${!activeTopic ? "bg-primary text-primary-foreground" : ""}`}
        >
          All
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSearchParams({ t: topic })}
            className={`tag-badge ${activeTopic === topic ? "bg-primary text-primary-foreground" : ""}`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-8">
        {filteredArticles.map((article) => (
          <div key={article.id} className="pb-8 border-b last:border-0">
            <ArticleCard articleId={article.id} />
          </div>
        ))}
        {filteredArticles.length === 0 && (
          <p className="text-muted-foreground text-center py-10">No articles found for this topic.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Topics;
