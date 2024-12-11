import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Database, FileText } from "lucide-react";
import { FormEvent, useState } from "react";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(e, selectedDocument);
    setSelectedDocument(undefined); // Reset selection after sending
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
          onClick={() => {
            fetchDocuments();
            const fileInput = document.getElementById('documentSelect');
            if (fileInput) {
              fileInput.click();
            }
          }}
          title="Reference a document"
        >
          <FileText className="h-4 w-4" />
        </Button>
        <select
          id="documentSelect"
          className="hidden"
          onChange={(e) => {
            const docId = e.target.value;
            if (docId) {
              setSelectedDocument(docId);
              const doc = documents.find(d => d.id === docId);
              if (doc) {
                toast({
                  title: "Document Selected",
                  description: `Referenced document: ${doc.title}`,
                });
              }
            }
          }}
        >
          <option value="">Select a document</option>
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.title}
            </option>
          ))}
        </select>
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