import { ButtonLink, Container } from '@/components/shared';

export const ProductNotExist = () => {
  return (
    <Container className="flex flex-col items-center justify-center gap-4 mt-20">
      <h1 className="text-4xl font-bold">Продукт не найден</h1>
      <p className="text-lg">Продукт был удален или вы ввели неверный адрес.</p>
      <ButtonLink to="/">Вернуться на главную</ButtonLink>
    </Container>
  );
};
