import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ImageUploadCardProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClear: () => void;
}

export const ImageUploadCard = ({
  onImageSelect,
  selectedImage,
  onClear,
}: ImageUploadCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        handleFile(files[0]);
      }
    },
    [onImageSelect]
  );

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file (jpg, png)");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onClear();
  };

  return (
    <Card className="relative overflow-hidden shadow-neumorphic bg-gradient-card border-border/50">
      <div className="p-8">
        {!preview ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-2xl p-12 text-center transition-all
              ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-border/50 hover:border-primary/50"
              }
            `}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 rounded-full bg-primary/10">
                <Upload className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your clothing image here
                </p>
              </div>
              <label htmlFor="file-upload">
                <Button variant="default" className="cursor-pointer" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileInput}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">
                JPG, PNG • Max 10MB
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain rounded-xl"
            />
            <Button
              onClick={handleClear}
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 rounded-full shadow-lg"
            >
              <X className="h-4 w-4" />
            </Button>
            {selectedImage && (
              <p className="mt-4 text-sm text-muted-foreground text-center">
                {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );
};
