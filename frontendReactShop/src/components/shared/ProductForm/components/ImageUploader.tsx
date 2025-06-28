import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface ImageUploaderProps {
  existingImages?: string[];
  onImagesChange: (newImages: string[]) => void;
  onNewImagesChange: (newImages: ImageFile[]) => void;
  imageFiles: ImageFile[];
}

export const ImageUploader = ({
  existingImages = [],
  onImagesChange,
  onNewImagesChange,
  imageFiles,
}: ImageUploaderProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: ImageFile[] = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      }));
      onNewImagesChange([...imageFiles, ...newFiles]);
    }
  };

  const removeImage = (id: string) => {
    const image = imageFiles.find((img) => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
    onNewImagesChange(imageFiles.filter((img) => img.id !== id));
  };

  const removeExistingImage = (index: number) => {
    onImagesChange(existingImages.filter((_, i) => i !== index));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newArray = [...imageFiles];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    onNewImagesChange(newArray);
  };

  const moveExistingImage = (fromIndex: number, toIndex: number) => {
    const newArray = [...existingImages];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    onImagesChange(newArray);
  };

  return (
    <div className="space-y-4">
      <Input
        className="cursor-pointer"
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
      />
      {existingImages.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Существующие изображения:</h3>
          <div className="grid grid-cols-3 gap-2">
            {existingImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Изображение ${index + 1}`}
                  className="w-full h-24 object-cover rounded border"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 rounded-[2px] group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => moveExistingImage(index, index - 1)}
                      className="bg-blue-500 text-white p-1 rounded text-xs cursor-pointer w-6 h-8 hover:bg-blue-800"
                    >
                      ↑
                    </Button>
                  )}
                  {index < existingImages.length - 1 && (
                    <Button
                      type="button"
                      onClick={() => moveExistingImage(index, index + 1)}
                      className="bg-blue-500 text-white p-1 rounded text-xs w-6 h-8 hover:bg-blue-800"
                    >
                      ↓
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="bg-red-500 text-white p-1 rounded text-xs w-6 h-8 hover:bg-red-800"
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {imageFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Новые изображения:</h3>
          <div className="grid grid-cols-3 gap-2">
            {imageFiles.map((image, index) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.preview}
                  alt={`Новое изображение ${index + 1}`}
                  className="w-full h-24 object-cover rounded border"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 rounded-[2px] group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      className="bg-blue-500 text-white p-1 rounded text-xs cursor-pointer w-6 h-8 hover:bg-blue-800"
                    >
                      ↑
                    </Button>
                  )}
                  {index < imageFiles.length - 1 && (
                    <Button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      className="bg-blue-500 text-white p-1 rounded text-xs w-6 h-8 hover:bg-blue-800"
                    >
                      ↓
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="bg-red-500 text-white p-1 rounded text-xs w-6 h-8 hover:bg-red-800"
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
