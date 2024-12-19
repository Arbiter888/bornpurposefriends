import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Link, Youtube, Trash2 } from "lucide-react";
import type { Resource } from "@/utils/resourceUtils";

interface ResourceListProps {
  resources: Resource[];
  onDelete: (id: string) => void;
}

export const ResourceList = ({ resources, onDelete }: ResourceListProps) => {
  return (
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
              onClick={() => onDelete(resource.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};