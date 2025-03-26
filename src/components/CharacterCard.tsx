
import { Character } from "@/lib/characters";
import { useEffect, useRef, useState } from "react";
import { Phone, MessageSquare, Globe, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CharacterCardProps {
  character: Character;
  onWidgetOpen: () => void;
  isWidgetActive: boolean;
}

const CharacterCard = ({ character, onWidgetOpen, isWidgetActive }: CharacterCardProps) => {
  const [showWidget, setShowWidget] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
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
            const { data, error } = await supabase.storage
              .from('videos')
              .createSignedUrl(videoFilename, 3600); // 1 hour expiration
            
            if (error) {
              console.error("Error fetching video from Supabase:", error);
              setIsVideoError(true);
              return;
            }
            
            if (data?.signedUrl) {
              setVideoUrl(data.signedUrl);
              setIsVideoError(false);
            }
          }
        } catch (error) {
          console.error("Error loading video:", error);
          setIsVideoError(true);
        }
      }
    };

    loadVideoFromSupabase();
  }, [character.gallery?.videos, hasVideo]);

  // Play/pause video on hover
  useEffect(() => {
    if (videoRef.current && isHovering && videoUrl) {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    } else if (videoRef.current && !isHovering) {
      videoRef.current.pause();
    }
  }, [isHovering, videoUrl]);

  useEffect(() => {
    if (!isWidgetActive) {
      setShowWidget(false);
    }
  }, [isWidgetActive]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handlePrayerRequest = () => {
    if (scriptLoaded) {
      console.log("Opening widget for character:", character.name);
      onWidgetOpen();
      setShowWidget(true);
    } else {
      console.warn("Widget script not loaded yet");
    }
  };

  const handleBibleStudy = () => {
    navigate(`/workspace/${character.id}`);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    setIsVideoError(false);
  };

  const handleVideoError = () => {
    console.error("Error loading video for character:", character.name);
    setIsVideoError(true);
  };

  const getCurrentName = () => {
    if (currentLanguage === "en") return character.name;
    return character.translations?.[currentLanguage]?.name || character.name;
  };

  const getCurrentRole = () => {
    if (currentLanguage === "en") return character.role;
    return character.translations?.[currentLanguage]?.role || character.role;
  };

  const getCurrentDescription = () => {
    if (currentLanguage === "en") return character.description;
    return character.translations?.[currentLanguage]?.description || character.description;
  };

  const getCurrentWidgetId = () => {
    if (currentLanguage === "en") return character.widgetId;
    return character.translations?.[currentLanguage]?.widgetId || character.widgetId;
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="relative group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-2xl"
        style={{
          height: 'auto',
          fontFamily: 'Tomorrow'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative">
          {hasVideo && videoUrl && !isVideoError ? (
            <div className="relative w-full">
              <video
                ref={videoRef}
                className={`w-full h-full object-cover rounded-t-2xl ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                loop
                playsInline
                muted={isMuted}
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
                  alt={getCurrentName()}
                  className="w-full h-full object-contain rounded-t-2xl absolute top-0 left-0"
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
              alt={getCurrentName()}
              className="w-full h-full object-contain rounded-t-2xl"
              loading="lazy"
            />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold text-white">{getCurrentName()}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCurrentLanguage("en")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentLanguage("ko")}>
                    한국어
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400">{getCurrentRole()}</span>
            </div>
            <p className="text-gray-300 text-sm">{getCurrentDescription()}</p>
          </div>

          <div className="flex gap-2 w-full">
            <Button
              onClick={handlePrayerRequest}
              className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl px-2 text-xs sm:text-sm whitespace-normal h-auto py-2"
            >
              <Phone className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {currentLanguage === "ko" ? `${getCurrentName()}에게 전화` : `Call ${getCurrentName()}`}
              </span>
            </Button>
            <Button
              onClick={handleBibleStudy}
              className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl px-2 text-xs sm:text-sm whitespace-normal h-auto py-2"
            >
              <MessageSquare className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {currentLanguage === "ko" ? `${getCurrentName()}와 채팅` : `Chat with ${getCurrentName()}`}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {showWidget && scriptLoaded && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div 
            className="relative bg-black rounded-lg p-4 shadow-2xl"
            style={{ width: '300px' }}
          >
            <button 
              onClick={() => setShowWidget(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              ×
            </button>
            <div 
              dangerouslySetInnerHTML={{
                __html: `<elevenlabs-convai agent-id="${getCurrentWidgetId()}"></elevenlabs-convai>`
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterCard;
