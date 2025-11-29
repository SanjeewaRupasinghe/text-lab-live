import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { uploadImage } from '@/lib/api';

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  maxSize?: number; // in MB
  requiredDimensions?: { width: number; height: number };
}

export const ImageUpload = ({ 
  value, 
  onChange, 
  maxSize = 5,
  requiredDimensions = { width: 1000, height: 1000 }
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const isValid = 
          img.width === requiredDimensions.width && 
          img.height === requiredDimensions.height;
        
        if (!isValid) {
          setError(
            `Image must be exactly ${requiredDimensions.width}x${requiredDimensions.height}px. ` +
            `Your image is ${img.width}x${img.height}px.`
          );
        }
        resolve(isValid);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate dimensions
    const isValidDimensions = await validateImage(file);
    if (!isValidDimensions) {
      return;
    }

    // Upload image
    try {
      setUploading(true);
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  }, [maxSize, onChange, requiredDimensions]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    disabled: uploading
  });

  const removeImage = () => {
    onChange(null);
    setError(null);
  };

  return (
    <div className="space-y-2">
      {!value ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-1">
            {isDragActive ? 'Drop the image here' : 'Drag & drop an image, or click to select'}
          </p>
          <p className="text-xs text-muted-foreground">
            Required: {requiredDimensions.width}x{requiredDimensions.height}px, Max {maxSize}MB
          </p>
          {uploading && <p className="text-sm text-primary mt-2">Uploading...</p>}
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border">
          <img 
            src={value} 
            alt="Feature" 
            className="w-full h-64 object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
