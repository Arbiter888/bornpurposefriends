import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, Youtube, Plus } from "lucide-react";
import { validateYouTubeUrl } from "@/utils/resourceUtils";

interface ResourceFormProps {
  onSubmit: (title: string, url: string, type: 'link' | 'youtube') => Promise<void>;
}

export const ResourceForm = ({ onSubmit }: ResourceFormProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<'link' | 'youtube'>('link');

  const handleSubmit = async () => {
    await onSubmit(title, url, type);
    setTitle("");
    setUrl("");
  };

  return (
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
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};