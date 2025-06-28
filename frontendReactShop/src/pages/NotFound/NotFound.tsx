import { ButtonLink, Container } from '@/components/shared';

export const NotFound = () => {
  return (
    <Container className="flex flex-col items-center justify-center gap-4 mt-20">
      <h1 className="text-4xl font-bold">404 - Страница не найдена</h1>
      <p className="text-lg">
        К сожалению, запрашиваемая вами страница не существует.
      </p>
      <ButtonLink to="/">Вернуться на главную</ButtonLink>
    </Container>
  );
};
