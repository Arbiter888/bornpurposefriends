import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "../ui/use-toast";
import { FileText, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import { DocumentUploader } from "./DocumentUploader";
import { DocumentList } from "./DocumentList";

interface Document {
  id: string;
  title: string;
  file_path: string;
  content_type: string;
  created_at: string;
}

export const KnowledgeBase = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const { toast } = useToast();
  const user = useUser();

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const fetchDocuments = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id)
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

  const handleDelete = async (id: string, filePath: string) => {
    if (!user) return;

    try {
      // First delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Then delete from the database
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document deleted successfully",
      });

      fetchDocuments();
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: "Error deleting document",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <DocumentUploader
          title={title}
          setTitle={setTitle}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          onSuccess={fetchDocuments}
        />
        <DocumentList
          documents={documents}
          onDelete={handleDelete}
        />
      </div>
    </Card>
  );
};