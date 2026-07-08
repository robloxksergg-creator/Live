export interface WorkItem {
  id: string;
  title: string;
  image: string;
  type: "image" | "video";
  aspect: "portrait" | "landscape" | "square";
  is3d?: boolean;
}

/**
 * Чтобы добавить новую работу — просто кинь файл в src/assets/works:
 *   - картинку (png / jpg / jpeg / webp), или
 *   - видео (mp4 / webm)
 * Больше ничего трогать не нужно: файл появится в галерее автоматически,
 * в алфавитном порядке по имени файла.
 *
 * Если для конкретного файла хочется задать своё название или отключить
 * бейдж "3D" — допиши правило в OVERRIDES ниже (ключ — имя файла с расширением).
 */
const OVERRIDES: Record<string, Partial<Pick<WorkItem, "title" | "is3d" | "aspect">>> = {
  // "kat.png": { title: "Котик", is3d: false },
};

const VIDEO_EXTENSIONS = new Set(["mp4", "webm"]);

const imageModules = import.meta.glob<{ default: string }>(
  "/src/assets/works/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

const videoModules = import.meta.glob<{ default: string }>(
  "/src/assets/works/*.{mp4,webm}",
  { eager: true },
);

const modules = { ...imageModules, ...videoModules };

function titleFromFilename(filename: string) {
  const withoutExt = filename.replace(/\.[^/.]+$/, "");
  const spaced = withoutExt.replace(/[_-]+/g, " ").trim();
  return spaced.length > 0 ? spaced : "Работа";
}

function extensionOf(filename: string) {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export const works: WorkItem[] = Object.entries(modules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, "ru"))
  .map(([path, mod], index) => {
    const filename = path.split("/").pop() ?? `work-${index}`;
    const override = OVERRIDES[filename] ?? {};
    const type: WorkItem["type"] = VIDEO_EXTENSIONS.has(extensionOf(filename))
      ? "video"
      : "image";

    return {
      id: String(index + 1),
      title: override.title ?? titleFromFilename(filename),
      image: mod.default,
      type,
      aspect: override.aspect ?? "landscape",
      is3d: override.is3d ?? true,
    };
  });