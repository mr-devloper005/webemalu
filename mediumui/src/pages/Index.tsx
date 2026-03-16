import { useArticles } from "@/contexts/ArticleContext";
import HeroCarousel from "@/components/HeroCarousel";
import ArticleCard from "@/components/ArticleCard";
import TopicSidebar from "@/components/TopicSidebar";
import { motion } from "framer-motion";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;

const Index = () => {
  const { articles } = useArticles();
  const featured = articles.filter((a) => a.featured);
  const allRegular = articles.filter((a) => !a.featured);
  const trending = articles.slice(0, 6);
  const heroSlides = [...featured, ...trending];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allRegular.length / ITEMS_PER_PAGE);

  const visibleRegular = allRegular.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    const p = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero carousel (includes featured + trending) */}
      {heroSlides.length > 0 && (
        <section className="border-b">
          <HeroCarousel articles={heroSlides} />
        </section>
      )}


      {/* Main content */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12">
          <div className="space-y-10">
            {/* featured carousel above replaces static featured list */}
            <div className="space-y-8">
              {visibleRegular.map((article) => (
                <div key={article.id} className="pb-8 border-b last:border-0">
                  <ArticleCard articleId={article.id} />
                </div>
              ))}

              {/* pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-6">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-secondary text-foreground rounded-full disabled:opacity-50"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`px-3 py-1 rounded-full ${
                        currentPage === i + 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-secondary text-foreground rounded-full disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-20">
              <TopicSidebar />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
