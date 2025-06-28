import { H2 } from './H2';

export const Error = ({ error }: { error: string }) => {
  return (
    <>
      <H2 className="mr-40 ml-40">Ошибка</H2>
      <div className="flex flex-col items-center">{error}</div>
    </>
  );
};
