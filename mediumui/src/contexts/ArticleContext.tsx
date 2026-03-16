import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Article, articles as defaultArticles } from "@/data/articles";

interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;
}

const ArticleContext = createContext<ArticleContextType>({
  articles: [],
  addArticle: () => {},
  updateArticle: () => {},
  deleteArticle: () => {},
  getArticleById: () => undefined,
});

export const useArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  // load saved custom articles from localStorage and merge with defaults
  useEffect(() => {
    let custom: Article[] = [];
    try {
      const saved = localStorage.getItem("webemalu_articles");
      if (saved) {
        custom = JSON.parse(saved);
      }
    } catch {
      custom = [];
    }
    // put custom articles at the front so they appear first
    setArticles([...custom, ...defaultArticles]);
  }, []);

  const addArticle = (article: Article) => {
    setArticles((prev) => {
      const updated = [article, ...prev];
      // only persist custom ones (those not in default list)
      const toStore = updated.filter(
        (a) => !defaultArticles.some((d) => d.id === a.id)
      );
      localStorage.setItem("webemalu_articles", JSON.stringify(toStore));
      return updated;
    });
  };

  const updateArticle = (article: Article) => {
    setArticles((prev) => {
      const updated = prev.map((a) => (a.id === article.id ? article : a));
      // persist custom ones
      const toStore = updated.filter(
        (a) => !defaultArticles.some((d) => d.id === a.id)
      );
      localStorage.setItem("webemalu_articles", JSON.stringify(toStore));
      return updated;
    });
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      const toStore = updated.filter(
        (a) => !defaultArticles.some((d) => d.id === a.id)
      );
      localStorage.setItem("webemalu_articles", JSON.stringify(toStore));
      return updated;
    });
  };

  const getArticleById = (id: string) => articles.find((a) => a.id === id);

  return (
    <ArticleContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle, getArticleById }}>
      {children}
    </ArticleContext.Provider>
  );
};
