import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, ChevronDown, ChevronUp, CalendarPlus } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  characterImage?: string;
  characterName?: string;
}

export const ChatMessage = ({ role, content, characterImage, characterName }: ChatMessageProps) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const messageLength = 300;
  const shouldTruncate = content.length > messageLength;
  const displayContent = shouldTruncate && !isExpanded 
    ? content.slice(0, messageLength) + "..."
    : content;
  const user = useUser();

  const handleAddToPlanner = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add to planner",
        variant: "destructive"
      });
      return;
    }

    try {
      const taskTitle = content.slice(0, 50) + (content.length > 50 ? '...' : '');
      
      const { data: existingTasks, error: fetchError } = await supabase
        .from('tasks')
        .select('id')
        .eq('user_id', user.id)
        .eq('title', taskTitle)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingTasks) {
        toast({
          title: "Already in Planner",
          description: "This scripture is already in your study planner",
          variant: "default"
        });
        return;
      }

      const { error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          title: taskTitle,
          description: content,
          status: 'todo'
        });

      if (error) throw error;
      
      toast({
        title: "Added to Bible Study Planner",
        description: "The scripture has been added to your study planner",
      });
    } catch (error) {
      console.error('Error adding to planner:', error);
      toast({
        title: "Error",
        description: "Failed to add to planner. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSaveMessage = () => {
    const event = new CustomEvent('saveMessage', { 
      detail: { 
        title: `Saved message from ${role === 'assistant' ? characterName : 'you'}`,
        description: content
      } 
    });
    window.dispatchEvent(event);
    
    toast({
      title: "Message Saved",
      description: "The message has been added to your saved messages",
    });
  };

  return (
    <div className={`flex gap-3 ${role === 'assistant' ? 'flex-row' : 'flex-row-reverse'} animate-fade-up`}>
      <Avatar>
        <AvatarImage src={role === 'assistant' ? characterImage : undefined} />
        <AvatarFallback>
          {role === 'assistant' ? characterName?.[0] : 'You'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        {role === 'assistant' && (
          <p className="text-sm font-semibold text-foreground/70">{characterName}</p>
        )}
        <div
          className={`rounded-lg p-4 ${
            role === 'assistant'
              ? 'bg-[#9b87f5] text-white'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          <div 
            className="prose max-w-none"
            style={{ 
              fontFamily: 'Arial, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}
          >
            {displayContent}
          </div>
          {shouldTruncate && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 flex items-center gap-2 text-white hover:text-white/90"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Read more
                </>
              )}
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {role === 'assistant' && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-[#9b87f5] hover:text-white transition-colors"
              onClick={handleAddToPlanner}
            >
              <CalendarPlus className="w-4 h-4" />
              Add to Bible Study Planner
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleSaveMessage}
          >
            <BookmarkPlus className="w-4 h-4" />
            Save Message
          </Button>
        </div>
      </div>
    </div>
  );
};