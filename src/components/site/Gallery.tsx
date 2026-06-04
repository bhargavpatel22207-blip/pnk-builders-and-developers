import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useGallery } from "@/lib/gallery";
import { SectionHeading } from "./SectionHeading";
  
export function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { data = [] } = useGallery();

  const items = data;

  return (
    <section id="gallery" className="bg-gradient-hero py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          light
          eyebrow="Gallery"
          title="Moments From Our Sites"
          subtitle="Explore photos from our ongoing and completed projects, interiors and structural work."
        />
        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((g: any, i) => (
  <motion.button
    key={`${g.id}-${i}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                onClick={() => setLightbox(g.image_url)}
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <img
  src={g.image_url}
  alt={g.title || "Gallery Image"}
  loading="lazy"
  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
/>
                <div className="absolute inset-0 grid place-items-center bg-deep-2/0 transition-colors group-hover:bg-deep-2/50">
                  <ZoomIn className="size-7 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] grid place-items-center bg-deep-2/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button aria-label="Close" className="absolute right-5 top-5 text-primary-foreground">
              <X className="size-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={lightbox}
              alt="Project"
              className="max-h-[85vh] max-w-full rounded-xl shadow-elegant"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
