import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTrigger } from "../components/UiDialog";
import { Skeleton } from "../components/UiSkeleton";
import { Button } from "../components/UiButton";
import { Camera } from "lucide-react";
import type { GalleryImage } from "../helpers/siteSchema";

const categories = [
  { value: "all", label: "All Photos" },
  { value: "general", label: "General" },
  { value: "services", label: "Services" },
  { value: "events", label: "Events" },
  { value: "community", label: "Community" },
  { value: "youth", label: "Youth" },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-serif font-bold mb-4" data-testid="text-gallery-heading">
                Photo Gallery
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Moments of worship, fellowship, and community at DCLM East Midlands
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  data-testid={`button-category-${category.value}`}
                  className="toggle-elevate"
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            ) : filteredImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <div 
                        className="aspect-square overflow-hidden rounded-lg cursor-pointer group relative"
                        data-testid={`gallery-image-${image.id}`}
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                          <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white font-medium text-sm truncate">{image.title}</p>
                            <p className="text-white/70 text-xs capitalize">{image.category}</p>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden">
                      <div className="relative">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-auto max-h-[80vh] object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                          <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                          {image.description && (
                            <p className="text-white/80 mt-1">{image.description}</p>
                          )}
                          <p className="text-white/60 text-sm mt-2 capitalize">{image.category}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2" data-testid="text-no-gallery-images">
                  {selectedCategory === "all" ? "No Photos Yet" : `No ${categories.find(c => c.value === selectedCategory)?.label} Photos`}
                </h3>
                <p className="text-muted-foreground">
                  {selectedCategory === "all" 
                    ? "Check back soon for photos from our services and events!"
                    : "Try selecting a different category or check back later."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
