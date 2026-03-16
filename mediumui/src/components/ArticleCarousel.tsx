import { Article } from "@/data/articles";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ImageWithFallback";

interface CarouselProps {
  articles: Article[];
}

const ArticleCarousel = ({ articles }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const next = () => {
    setIndex((prev) => (prev + 1) % articles.length);
    resetInterval();
  };
  const prev = () => {
    setIndex((prev) => (prev - 1 + articles.length) % articles.length);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    if (articles.length > 1) {
      intervalRef.current = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % articles.length);
      }, 3000);
    }
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [articles.length]);

  if (articles.length === 0) return null;

  return (
    <div className="relative overflow-hidden mx-auto max-w-screen-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {articles.map((article) => (
          <div key={article.id} className="min-w-full relative h-[400px] md:h-[500px]">
            <Link to={`/article/${article.id}`} className="block w-full h-full">
              <ImageWithFallback
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
                <h2 className="text-white font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2">
                  {article.title}
                </h2>
                <p className="text-white text-lg max-w-2xl mb-4 line-clamp-2">
                  {article.subtitle}
                </p>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span>{article.readingTime} min read</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* navigation arrows */}
      {articles.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
          >
            ›
          </button>
        </>
      )}
      {/* slide indicators */}
      {articles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {articles.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-primary" : "bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleCarousel;
