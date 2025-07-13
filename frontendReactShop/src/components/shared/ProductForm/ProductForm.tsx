import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { toast } from 'sonner';
import { useCreateProduct, useUpdateProduct } from '@/entities/products';
import { uploadImages } from '@/entities/api/upload-image';
import { ImageUploader, type ImageFile } from './components';
import { ButtonSpinner } from '../ButtonSpinner';

export interface Product {
  id?: string;
  name: string;
  brand: string;
  typeProduct: 'MAN' | 'WOMAN';
  price: number;
  sizes: string[] | string;
  description?: string;
  features?: string[] | string;
  brandHistory?: string;
  image?: string[];
}

interface ProductFormProps {
  defaultValues?: Product;
}

export const ProductForm = ({ defaultValues }: ProductFormProps) => {
  const { register, handleSubmit } = useForm<Product>({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          sizes: Array.isArray(defaultValues.sizes)
            ? defaultValues.sizes.join(', ')
            : defaultValues.sizes || '',
          features: Array.isArray(defaultValues.features)
            ? defaultValues.features.join(', ')
            : defaultValues.features || '',
        }
      : undefined,
  });
  const { mutateAsync: createProduct, isPending: isCreatePending } =
    useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdatePending } =
    useUpdateProduct();

  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    defaultValues?.image || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!defaultValues;

  const onSubmit = async (data: Product) => {
    // Дополнительная проверка, чтобы предотвратить множественные отправки
    if (isCreatePending || isUpdatePending || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newImageUrls =
        imageFiles.length > 0
          ? await uploadImages(imageFiles.map((img) => img.file))
          : [];

      const allImages = [...existingImages, ...newImageUrls];

      const payload: Product = {
        ...data,
        sizes:
          typeof data.sizes === 'string'
            ? data.sizes.split(',').map((s) => s.trim())
            : data.sizes,
        features:
          typeof data.features === 'string'
            ? data.features.split(',').map((f) => f.trim())
            : data.features,
        image: allImages,
      };

      if (isEditing && defaultValues?.id) {
        const response = await updateProduct({
          id: defaultValues.id,
          payload,
        });
        toast.success('Товар успешно обновлен!');
        navigate(`/product/${response.data.id}`);
      } else {
        const response = await createProduct(payload);
        toast.success('Товар успешно сохранен!');
        navigate(`/product/${response.data.id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при сохранении товара');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-xl mx-auto mt-[50px]"
    >
      <Input {...register('name')} placeholder="Название" required />
      <Input {...register('brand')} placeholder="Бренд" required />
      <select
        className="border border-gray-300 rounded-md p-2"
        {...register('typeProduct')}
        defaultValue={defaultValues?.typeProduct || 'MAN'}
      >
        <option value="MAN">Мужской</option>
        <option value="WOMAN">Женский</option>
      </select>

      <Input {...register('price')} type="number" placeholder="Цена" required />
      <Input {...register('sizes')} placeholder="Размеры (через запятую)" />
      <Textarea {...register('description')} placeholder="Описание" />
      <Textarea
        {...register('features')}
        placeholder="Особенности (через запятую)"
      />
      <Textarea {...register('brandHistory')} placeholder="История бренда" />

      <ImageUploader
        existingImages={existingImages}
        onImagesChange={setExistingImages}
        onNewImagesChange={setImageFiles}
        imageFiles={imageFiles}
      />

      <Button
        className="flex w-[300px] mx-auto"
        type="submit"
        disabled={isCreatePending || isUpdatePending || isSubmitting}
      >
        {isCreatePending || isUpdatePending || isSubmitting ? (
          <>
            <ButtonSpinner />
            Сохранение...
          </>
        ) : (
          <>{isEditing ? 'Обновить' : 'Создать'} товар</>
        )}
      </Button>
    </form>
  );
};
