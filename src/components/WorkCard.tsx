import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import type { WorkItem } from "@/lib/works";

interface WorkCardProps {
  work: WorkItem;
  className?: string;
  mediaClassName?: string;
  /**
   * "cover" (по умолчанию) — фото/видео заполняет рамку, лишнее обрезается.
   * "contain" — фото/видео показывается целиком без обрезки, а рамка
   * (mediaClassName задаёт её размер) добивается размытой версией того же
   * кадра по краям, чтобы не было пустых белых полос.
   */
  fit?: "cover" | "contain";
  onClick?: () => void;
}

export function WorkCard({
  work,
  className,
  mediaClassName,
  fit = "cover",
  onClick,
}: WorkCardProps) {
  const isContain = fit === "contain";

  const foregroundClasses = cn(
    "transition-transform duration-700 ease-out group-hover:scale-[1.03]",
    isContain
      ? "relative z-10 h-full w-full object-contain"
      : cn("w-full object-cover", mediaClassName ?? "aspect-auto"),
  );

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden",
          isContain && (mediaClassName ?? "aspect-auto"),
        )}
      >
        {/* Размытая подложка — только в режиме contain, только для фото */}
        {isContain && work.type === "image" && (
          <img
            src={work.image}
            aria-hidden
            className="absolute inset-0 z-0 h-full w-full scale-110 object-cover blur-2xl brightness-75"
          />
        )}
        {isContain && work.type === "video" && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-muted to-secondary" />
        )}

        {work.type === "video" ? (
          <video
            src={work.image}
            muted
            loop
            playsInline
            preload="metadata"
            onMouseEnter={(event) => event.currentTarget.play()}
            onMouseLeave={(event) => {
              event.currentTarget.pause();
              event.currentTarget.currentTime = 0;
            }}
            className={foregroundClasses}
          />
        ) : (
          <img
            src={work.image}
            alt={work.title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = "/works/placeholder.svg";
            }}
            className={foregroundClasses}
          />
        )}
        {work.type === "video" && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/10 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
            <span className="rounded-full bg-white/85 p-3 shadow-sm">
              <Play className="h-5 w-5 fill-current text-foreground" />
            </span>
          </div>
        )}
        {work.is3d && (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary backdrop-blur-sm">
            3D
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </figure>
  );
}
