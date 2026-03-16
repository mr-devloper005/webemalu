import { useState, ImgHTMLAttributes } from "react";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const ImageWithFallback = ({ src, fallbackSrc = "/placeholder.svg", onError, alt, ...rest }: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);
  const [generatedSrc, setGeneratedSrc] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleError: React.ReactEventHandler<HTMLImageElement> = async (event) => {
    // if we already tried generating or there's no AI endpoint configured, fall back to placeholder
    const aiEndpoint = import.meta.env.VITE_AI_IMAGE_ENDPOINT;

    if (!generatedSrc && aiEndpoint && !isGenerating) {
      try {
        setIsGenerating(true);
        const response = await fetch(aiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: typeof alt === "string" && alt.trim() ? alt : "Illustration for blog article",
            originalSrc: src,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.url === "string" && data.url.length > 0) {
            setGeneratedSrc(data.url);
            setHasError(false);
            if (onError) onError(event);
            return;
          }
        }
      } catch {
        // ignore and fall through to normal fallback
      } finally {
        setIsGenerating(false);
      }
    }

    setHasError(true);
    if (onError) {
      onError(event);
    }
  };

  const resolvedSrc = generatedSrc || (!hasError && src ? src : fallbackSrc);

  return <img src={resolvedSrc} onError={handleError} alt={alt} {...rest} />;
};

export default ImageWithFallback;

