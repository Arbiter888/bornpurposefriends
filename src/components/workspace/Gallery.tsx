
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryProps {
  videos?: string[];
  images?: string[];
  characterId: string;
}

export const Gallery = ({ videos, images, characterId }: GalleryProps) => {
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    const loadVideosFromSupabase = async () => {
      if (videos && videos.length > 0) {
        setLoading(true);
        const urlMap: Record<string, string> = {};
        
        for (const videoFilename of videos) {
          try {
            // Skip YouTube shorts as they're handled differently
            if (videoFilename.includes('youtube.com') || videoFilename.includes('youtu.be')) {
              urlMap[videoFilename] = videoFilename;
              continue;
            }
            
            const { data, error } = await supabase.storage
              .from('videos')
              .createSignedUrl(videoFilename, 3600); // 1 hour expiration
            
            if (error) {
              console.error(`Error fetching video ${videoFilename}:`, error);
              continue;
            }
            
            if (data?.signedUrl) {
              urlMap[videoFilename] = data.signedUrl;
            }
          } catch (error) {
            console.error(`Error processing video ${videoFilename}:`, error);
          }
        }
        
        setVideoUrls(urlMap);
        setLoading(false);
      }
    };

    loadVideosFromSupabase();
  }, [videos]);

  // Play/pause video on hover
  useEffect(() => {
    if (hoveredVideo && videoRefs.current[hoveredVideo]) {
      console.log("Playing gallery video:", hoveredVideo);
      videoRefs.current[hoveredVideo]?.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
    
    // Pause all other videos
    Object.entries(videoRefs.current).forEach(([key, videoElement]) => {
      if (key !== hoveredVideo && videoElement) {
        videoElement.pause();
      }
    });
  }, [hoveredVideo]);

  // Convert YouTube Shorts URL to embed URL
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('/shorts/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1`;
  };

  const handleMouseEnter = (videoKey: string) => {
    console.log("Mouse enter for gallery video:", videoKey);
    setHoveredVideo(videoKey);
  };

  const handleMouseLeave = () => {
    console.log("Mouse leave for gallery video");
    setHoveredVideo(null);
  };

  if ((!videos?.length && !images?.length) || loading) {
    return null;
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Gallery</h3>
      <ScrollArea className="h-[300px] w-full rounded-md">
        <div className="space-y-4">
          {videos?.map((video, index) => {
            const videoUrl = videoUrls[video];
            
            if (!videoUrl) return null;
            
            if (video.includes('youtube.com') || video.includes('youtu.be')) {
              // Handle YouTube video
              return (
                <div key={`video-${index}`} className="relative aspect-video w-full">
                  <iframe
                    src={getEmbedUrl(video)}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }
            
            // Handle local video from Supabase
            return (
              <div 
                key={`video-${index}`} 
                className="relative aspect-video w-full hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => handleMouseEnter(video)}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={el => videoRefs.current[video] = el}
                  className="w-full h-full rounded-lg"
                  controls
                  src={videoUrl}
                  preload="auto"
                  loop
                  muted
                  autoPlay={hoveredVideo === video}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          })}
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
