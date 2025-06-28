import { toBase64 } from '@/utils/to-base64';

export const uploadImages = async (images: File[]) => {
  const API_KEY = import.meta.env.VITE_IMGBB_KEY;

  const uploadedUrls: string[] = [];

  for (const file of images) {
    const formData = new FormData();
    formData.append('image', await toBase64(file));

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Ошибка загрузки изображения');
    }

    const data = await res.json();
    uploadedUrls.push(data.data.url);
  }

  return uploadedUrls;
};
