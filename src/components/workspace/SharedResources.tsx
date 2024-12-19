import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { useUser } from "@supabase/auth-helpers-react";
import { ResourceForm } from "./ResourceForm";
import { ResourceList } from "./ResourceList";
import { fetchUserResources, addResource, deleteResource, validateYouTubeUrl } from "@/utils/resourceUtils";
import type { Resource } from "@/utils/resourceUtils";

export const SharedResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const { toast } = useToast();
  const user = useUser();

  useEffect(() => {
    if (user) {
      loadResources();
    }
  }, [user]);

  const loadResources = async () => {
    if (!user) return;
    
    try {
      const resources = await fetchUserResources(user.id);
      setResources(resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast({
        title: "Error",
        description: "Failed to load resources",
        variant: "destructive"
      });
    }
  };

  const handleAddResource = async (title: string, url: string, type: 'link' | 'youtube') => {
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
      const newResource = await addResource(user.id, title, url, type);
      setResources([...resources, newResource]);
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
      await deleteResource(id);
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
        <ResourceForm onSubmit={handleAddResource} />
        <ResourceList resources={resources} onDelete={handleDelete} />
      </div>
    </Card>
  );
};