import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface GalleryProps {
  videos?: string[];
  images?: string[];
  characterId: string;
}

export const Gallery = ({ videos, images, characterId }: GalleryProps) => {
  // Convert YouTube Shorts URL to embed URL
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('/shorts/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1`;
  };

  if (!videos?.length && !images?.length) {
    return null;
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Gallery</h3>
      <ScrollArea className="h-[300px] w-full rounded-md">
        <div className="space-y-4">
          {videos?.map((video, index) => (
            <div key={`video-${index}`} className="relative aspect-video w-full">
              <iframe
                src={getEmbedUrl(video)}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
          {images?.map((image, index) => (
            <img
              key={`image-${index}`}
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full rounded-lg"
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};