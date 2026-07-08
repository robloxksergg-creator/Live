import { useState } from "react";

import { Lightbox } from "@/components/Lightbox";
import { WorkCard } from "@/components/WorkCard";
import type { WorkItem } from "@/lib/works";

interface MasonryGalleryProps {
  works: WorkItem[];
}

export function MasonryGallery({ works }: MasonryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <section
        aria-label="Галерея работ"
        className="columns-1 gap-5 sm:columns-2 lg:columns-3"
      >
        {works.map((work, index) => (
          <div
            key={work.id}
            className="mb-5 break-inside-avoid"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <WorkCard work={work} onClick={() => setActiveIndex(index)} />
          </div>
        ))}
      </section>

      {activeIndex !== null && (
        <Lightbox
          works={works}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onIndexChange={setActiveIndex}
        />
      )}
    </>
  );
}

