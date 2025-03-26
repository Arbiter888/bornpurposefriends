
import { Character } from "@/lib/characters";
import { Card } from "../ui/card";
import { Phone, Volume2, VolumeX } from "lucide-react";
import { Button } from "../ui/button";
import { AspectRatio } from "../ui/aspect-ratio";
import { useEffect, useState, useRef } from "react";
import { CharacterDetails } from "./CharacterDetails";
import { CharacterTopics } from "./CharacterTopics";
import { CharacterWidget } from "./CharacterWidget";
import { supabase } from "@/integrations/supabase/client";

interface CharacterProfileProps {
  character: Character;
  onQuickCall: () => void;
}

export const CharacterProfile = ({ character, onQuickCall }: CharacterProfileProps) => {
  const [showWidget, setShowWidget] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Check if character has videos
  const hasVideo = character.gallery?.videos && character.gallery.videos.length > 0;

  useEffect(() => {
    const loadScript = () => {
      const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
      
      if (existingScript) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log("Script loaded successfully");
        setScriptLoaded(true);
      };

      script.onerror = (error) => {
        console.error("Script loading error:", error);
        setScriptLoaded(false);
      };
      
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  // Add effect to load video URL from Supabase
  useEffect(() => {
    const loadVideoFromSupabase = async () => {
      if (hasVideo) {
        try {
          const videoFilename = character.gallery?.videos?.[0];
          if (videoFilename) {
            console.log("Loading profile video:", videoFilename, "for character:", character.name);
            
            // Skip if it's a YouTube video
            if (videoFilename.includes('youtube.com') || videoFilename.includes('youtu.be')) {
              setVideoUrl(videoFilename);
              return;
            }
            
            const { data, error } = await supabase.storage
              .from('videos')
              .createSignedUrl(videoFilename, 3600); // 1 hour expiration
            
            if (error) {
              console.error("Error fetching profile video from Supabase:", error);
              setIsVideoError(true);
              return;
            }
            
            if (data?.signedUrl) {
              console.log("Profile video URL loaded successfully for:", character.name);
              setVideoUrl(data.signedUrl);
              setIsVideoError(false);
            }
          }
        } catch (error) {
          console.error("Error loading profile video:", error);
          setIsVideoError(true);
        }
      }
    };

    loadVideoFromSupabase();
  }, [character.gallery?.videos, hasVideo, character.name]);

  const handlePrayerRequest = () => {
    if (scriptLoaded) {
      console.log("Opening prayer request widget for:", character.name);
      setShowWidget(true);
    } else {
      console.warn("Widget script not loaded yet");
    }
  };

  const handleVideoLoaded = () => {
    console.log("Profile video loaded for character:", character.name);
    setIsVideoLoaded(true);
    setIsVideoError(false);
    
    // Try to autoplay the video when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(err => 
        console.error("Failed to autoplay profile video on load:", err)
      );
    }
  };

  const handleVideoError = () => {
    console.error("Error loading profile video for character:", character.name);
    setIsVideoError(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      <Card className="p-6 space-y-6">
        <AspectRatio ratio={3/4} className="bg-muted rounded-lg overflow-hidden relative">
          {hasVideo && videoUrl && !isVideoError ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className={`object-cover w-full h-full object-top ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                loop
                playsInline
                muted={isMuted}
                autoPlay
                onLoadedData={handleVideoLoaded}
                onError={handleVideoError}
                preload="auto"
              >
                <source src={videoUrl} type="video/mp4" />
                {/* Fallback to image if video fails to load */}
                Your browser does not support the video tag.
              </video>
              
              {/* Show image while video is loading */}
              {!isVideoLoaded && (
                <img
                  src={character.image}
                  alt={character.name}
                  className="object-cover w-full h-full object-top absolute top-0 left-0"
                  loading="lazy"
                />
              )}
              
              {/* Sound toggle button */}
              <button 
                onClick={toggleMute}
                className="absolute bottom-3 right-3 bg-black/60 p-1.5 rounded-full text-white hover:bg-black/80 transition-colors z-10"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          ) : (
            <img
              src={character.image}
              alt={character.name}
              className="object-cover w-full h-full object-top"
              loading="lazy"
            />
          )}
        </AspectRatio>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <p className="text-muted-foreground">{character.role}</p>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          onClick={handlePrayerRequest}
        >
          <Phone className="w-4 h-4 mr-2" />
          Prayer Request Call
        </Button>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">About</h3>
            <p className="text-sm text-muted-foreground">{character.description}</p>
          </div>

          <CharacterDetails character={character} />
          <CharacterTopics character={character} />
        </div>
      </Card>

      {showWidget && scriptLoaded && (
        <CharacterWidget 
          widgetId={character.widgetId} 
          onClose={() => setShowWidget(false)} 
        />
      )}
    </>
  );
};
