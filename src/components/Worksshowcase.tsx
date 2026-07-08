import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Lightbox } from "@/components/Lightbox";
import { WorkCard } from "@/components/WorkCard";
import { cn } from "@/lib/utils";
import type { WorkItem } from "@/lib/works";

interface WorksShowcaseProps {
  works: WorkItem[];
  /** Сколько "окон" показывать одновременно на широких экранах */
  visibleCount?: number;
}

/**
 * Витрина из N окон (по умолчанию 3): показывает срез общего списка works,
 * стрелки листают весь список по одному элементу за клик (по кругу).
 * Клик по любому окну открывает Lightbox, где можно пролистать уже все работы.
 */
export function WorksShowcase({ works, visibleCount = 3 }: WorksShowcaseProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const windowCount = Math.max(1, Math.min(visibleCount, works.length));
  const canScroll = works.length > windowCount;

  const visibleWorks = Array.from({ length: windowCount }, (_, i) => {
    const actualIndex = (startIndex + i) % works.length;
    return { work: works[actualIndex], actualIndex };
  });

  function goPrev() {
    setStartIndex((prev) => (prev - 1 + works.length) % works.length);
  }

  function goNext() {
    setStartIndex((prev) => (prev + 1) % works.length);
  }

  if (works.length === 0) return null;

  return (
    <div className="relative">
      <div
        className={cn(
          "grid gap-4 sm:gap-5",
          windowCount === 1 && "grid-cols-1",
          windowCount === 2 && "grid-cols-1 sm:grid-cols-2",
          windowCount >= 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {visibleWorks.map(({ work, actualIndex }) => (
          <WorkCard
            key={`${work.id}-${actualIndex}`}
            work={work}
            mediaClassName="aspect-[4/5] h-full"
            fit="contain"
            className="h-full"
            onClick={() => setActiveIndex(actualIndex)}
          />
        ))}
      </div>

      {canScroll && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Предыдущие работы"
            className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-white sm:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Следующие работы"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/90 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-white sm:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {activeIndex !== null && (
        <Lightbox
          works={works}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onIndexChange={setActiveIndex}
        />
      )}
    </div>
  );
}
