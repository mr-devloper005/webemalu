import { Article } from "@/data/articles";
import { getUserById } from "@/data/users";
import useEmblaCarousel from "embla-carousel-react";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ImageWithFallback";

interface HeroCarouselProps {
  articles: Article[];
}

const HeroCarousel = ({ articles }: HeroCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const next = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);
  const prev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) return;
    if (articles.length <= 1) return;
    autoplayRef.current = window.setInterval(() => {
      next();
    }, 3000);
  }, [next, articles.length]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!paused) startAutoplay();
    return stopAutoplay;
  }, [paused, startAutoplay, stopAutoplay]);

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  if (articles.length === 0) return null;

  return (
    <div
      className="relative group overflow-hidden mx-auto w-full max-w-[1200px] rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {articles.map((article, idx) => {
            const author = getUserById(article.authorId);
            if (!author) return null;
            return (
              <div key={article.id} className="relative min-w-full h-[400px] md:h-[500px] flex-shrink-0">
                <motion.div
                  className="absolute inset-0 w-full h-full rounded-lg overflow-hidden"
                  animate={{ scale: selectedIndex === idx ? 1.05 : 1 }}
                  transition={{ duration: 3 }}
                >
                  <ImageWithFallback
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 max-w-lg text-left">
                  <span className="tag-badge bg-white/20 text-white mb-2">{article.tags[0]}</span>
                  <h2 className="text-white font-serif text-3xl md:text-5xl font-bold leading-tight mb-2">
                    {article.title}
                  </h2>
                  <p className="text-white font-serif text-base md:text-lg mb-4 line-clamp-2">
                    {article.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-4">
                    <ImageWithFallback src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full" />
                    <span>{author.name}</span>
                    <span>· {article.readingTime} min read</span>
                  </div>
                  <Link
                    to={`/article/${article.id}`}
                    className="inline-block px-6 py-2 bg-primary text-white font-medium rounded-full shadow hover:scale-105 transition-transform"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* arrows */}
      {articles.length > 1 && (
        <>          
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ›
          </button>
        </>
      )}

      {/* pagination dots */}
      {articles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === selectedIndex ? "bg-primary" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* progress indicator */}
      {articles.length > 1 && (
        <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden">
          <div
            key={selectedIndex}
            className="h-full bg-primary carousel-progress"
          />
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
