import { useState, useRef, useEffect } from "react";
import { Button } from "./UiButton";
import { Card, CardContent } from "./UiCard";
import { Input } from "./UiInput";
import { Label } from "./UiLabel";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "../helpers/useToast";
import { apiRequest } from "../helpers/queryClient";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  category?: string;
  label?: string;
  className?: string;
}

export function ImageUploader({ value, onChange, category = "general", label = "Image", className }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Sync preview with external value changes (e.g., when editing existing records)
  useEffect(() => {
    setPreviewUrl(value);
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (JPEG, PNG, GIF, WebP)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Ask the server for an upload slot, then send the file straight to storage.
      const slotRes = await apiRequest("POST", "/api/uploads", {
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        category,
      });
      const slot = (await slotRes.json()) as { presignedUrl: string; headers: Record<string, string>; url: string };
      const put = await fetch(slot.presignedUrl, { method: "PUT", headers: slot.headers, body: file });
      if (!put.ok) {
        throw new Error("Upload failed");
      }
      const result = { url: slot.url };
      
      setPreviewUrl(result.url);
      onChange(result.url);

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>
      
      {previewUrl ? (
        <Card>
          <CardContent className="p-4">
            <div className="relative group">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemove}
                data-testid="button-remove-image"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
            id={`image-upload-${category}`}
            data-testid="input-image-file"
          />
          <Label htmlFor={`image-upload-${category}`}>
            <Card className="cursor-pointer hover-elevate">
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      <p className="text-sm text-muted-foreground">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <div className="p-4 rounded-full bg-accent">
                        <ImageIcon className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Click to upload an image</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, GIF, WEBP up to 5MB
                        </p>
                      </div>
                      <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                        <Upload className="h-4 w-4 mr-2" />
                        Select File
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>
      )}
    </div>
  );
}
