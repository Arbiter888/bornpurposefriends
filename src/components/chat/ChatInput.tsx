import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Database, FileText } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent, documentId?: string) => void;
  disabled?: boolean;
  useKnowledgeBase: boolean;
  onToggleKnowledgeBase: () => void;
}

export const ChatInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  disabled,
  useKnowledgeBase,
  onToggleKnowledgeBase 
}: ChatInputProps) => {
  const [selectedDocument, setSelectedDocument] = useState<string>();
  const [documents, setDocuments] = useState<any[]>([]);
  const [showDocuments, setShowDocuments] = useState(false);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching documents",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setDocuments(data || []);
  };

  useEffect(() => {
    if (showDocuments) {
      fetchDocuments();
    }
  }, [showDocuments]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(e, selectedDocument);
    setSelectedDocument(undefined);
    setShowDocuments(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1 flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
          disabled={disabled}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setShowDocuments(!showDocuments)}
          title="Reference a document"
        >
          <FileText className="h-4 w-4" />
        </Button>
        {showDocuments && (
          <Select
            value={selectedDocument}
            onValueChange={(value) => {
              setSelectedDocument(value);
              const doc = documents.find(d => d.id === value);
              if (doc) {
                toast({
                  title: "Document Selected",
                  description: `Referenced document: ${doc.title}`,
                });
              }
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a document" />
            </SelectTrigger>
            <SelectContent>
              {documents.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Toggle
          pressed={useKnowledgeBase}
          onPressedChange={onToggleKnowledgeBase}
          className="px-3"
          title="Use Knowledge Base"
        >
          <Database className={`h-4 w-4 ${useKnowledgeBase ? 'text-primary' : 'text-muted-foreground'}`} />
        </Toggle>
      </div>
      <Button type="submit" disabled={disabled}>Send</Button>
    </form>
  );
};