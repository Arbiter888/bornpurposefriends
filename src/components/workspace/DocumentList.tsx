import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { FileText, X } from "lucide-react";

interface Document {
  id: string;
  title: string;
  file_path: string;
  content_type: string;
  created_at: string;
}

interface DocumentListProps {
  documents: Document[];
  onDelete: (id: string, filePath: string) => void;
}

export const DocumentList = ({ documents, onDelete }: DocumentListProps) => {
  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-2 rounded-lg border"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{doc.title}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(doc.id, doc.file_path)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};