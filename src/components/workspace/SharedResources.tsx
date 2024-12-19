import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "../ui/use-toast";
import { Link, Youtube, Plus, Trash2 } from "lucide-react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'link' | 'youtube';
}

export const SharedResources = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<'link' | 'youtube'>('link');
  const [resources, setResources] = useState<Resource[]>([]);
  const { toast } = useToast();
  const user = useUser();

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleAddResource = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add resources",
        variant: "destructive"
      });
      return;
    }

    if (!title || !url) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (type === 'youtube' && !validateYouTubeUrl(url)) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          title: title,
          description: url,
          status: type
        })
        .select()
        .single();

      if (error) throw error;

      setResources([...resources, {
        id: data.id,
        title: data.title,
        url: data.description,
        type: data.status as 'link' | 'youtube'
      }]);

      setTitle("");
      setUrl("");

      toast({
        title: "Success",
        description: `${type === 'youtube' ? 'YouTube video' : 'Link'} added successfully`,
      });
    } catch (error) {
      console.error('Error adding resource:', error);
      toast({
        title: "Error",
        description: "Failed to add resource",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setResources(resources.filter(resource => resource.id !== id));
      toast({
        title: "Success",
        description: "Resource deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Shared Resources
        </h3>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Resource title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border-blue-200 focus:border-blue-400"
            />
            <Button
              variant="outline"
              onClick={() => setType(type === 'link' ? 'youtube' : 'link')}
              className="min-w-[100px] border-blue-200 hover:border-blue-400"
            >
              {type === 'link' ? <Link className="w-4 h-4 mr-2" /> : <Youtube className="w-4 h-4 mr-2" />}
              {type === 'link' ? 'Link' : 'YouTube'}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder={type === 'youtube' ? 'YouTube URL' : 'Website URL'}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border-blue-200 focus:border-blue-400"
            />
            <Button
              onClick={handleAddResource}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[200px] w-full rounded-md border border-blue-100 bg-white/50 backdrop-blur-sm">
          <div className="p-4 space-y-3">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white border border-blue-100 hover:border-blue-300 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  {resource.type === 'youtube' ? (
                    <Youtube className="w-4 h-4 text-red-500" />
                  ) : (
                    <Link className="w-4 h-4 text-blue-500" />
                  )}
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-blue-600 truncate max-w-[200px]"
                  >
                    {resource.title}
                  </a>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(resource.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};