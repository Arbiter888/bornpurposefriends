import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";

interface DocumentUploaderProps {
  title: string;
  setTitle: (title: string) => void;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
  onSuccess: () => void;
}

export const DocumentUploader = ({
  title,
  setTitle,
  isUploading,
  setIsUploading,
  onSuccess,
}: DocumentUploaderProps) => {
  const { toast } = useToast();
  const user = useUser();

  const extractTextContent = async (file: File): Promise<string> => {
    console.log('Starting text extraction for file:', file.name);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const { data, error } = await supabase.functions.invoke('extract-text', {
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (error) {
        console.error('Text extraction failed:', error);
        throw error;
      }
      
      console.log('Text extraction response:', data);
      return data.text || '';
    } catch (error) {
      console.error('Error during text extraction:', error);
      throw error;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || !e.target.files[0]) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    console.log('Starting file upload for:', file.name, 'Type:', file.type);

    try {
      // First extract text content from the file
      console.log('Extracting text content...');
      const textContent = await extractTextContent(file);
      console.log('Text content extracted successfully');
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      // Upload the original file to storage
      console.log('Uploading file to storage...');
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      console.log('File uploaded successfully, creating database record...');
      // Create the document record with extracted text content
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          title: title || file.name,
          file_path: filePath,
          content_type: file.type,
          content: textContent,
          user_id: user.id
        });

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw dbError;
      }

      console.log('Document processed successfully');
      toast({
        title: "Success",
        description: "Document uploaded and processed successfully",
      });

      setTitle("");
      onSuccess();
    } catch (error: any) {
      console.error('Upload process error:', error);
      toast({
        title: "Error uploading document",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Document title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="relative">
        <Input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileUpload}
          disabled={isUploading}
          accept=".txt,.pdf,.doc,.docx"
        />
        <Button variant="outline" disabled={isUploading}>
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};