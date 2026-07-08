import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { WorkItem } from "@/lib/works";
import { cn } from "@/lib/utils";

interface LightboxProps {
  works: WorkItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({ works, index, onClose, onIndexChange }: LightboxProps) {
  const work = works[index];

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + works.length) % works.length);
  }, [index, works.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % works.length);
  }, [index, works.length, onIndexChange]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext, onClose]);

  // Блокируем скролл фона, пока лайтбокс открыт
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  if (!work) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X className="h-6 w-6" />
      </button>

      {works.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          aria-label="Предыдущее фото"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-6 sm:p-3"
        >
          <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" />
        </button>
      )}

      {works.length > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          aria-label="Следующее фото"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-6 sm:p-3"
        >
          <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" />
        </button>
      )}

      <figure
        className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        {work.type === "video" ? (
          <video
            key={work.id}
            src={work.image}
            controls
            autoPlay
            playsInline
            className={cn(
              "max-h-[75vh] max-w-[90vw] rounded-lg shadow-2xl",
              "animate-in fade-in zoom-in-95 duration-200",
            )}
          />
        ) : (
          <img
            key={work.id}
            src={work.image}
            alt={work.title}
            className={cn(
              "max-h-[75vh] max-w-[90vw] rounded-lg object-contain shadow-2xl",
              "animate-in fade-in zoom-in-95 duration-200",
            )}
          />
        )}
        <figcaption className="text-sm text-white/80">
          {work.title}
          <span className="ml-2 text-white/50">
            {index + 1} / {works.length}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
