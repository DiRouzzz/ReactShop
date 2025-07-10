// Определяем базовый URL в зависимости от окружения
const getBaseUrl = () => {
  // Если есть переменная окружения, используем её
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // В продакшене (когда нет localhost в URL)
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    return 'http://backend:3000';
  }
  
  // В разработке
  return 'http://localhost:3000';
};

const BASE_URL = getBaseUrl();

class ApiError extends Error {
  constructor(public response: Response) {
    super('ApiError:' + response.status);
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown }
) => {
  let headers = init?.headers ?? {};

  if (init?.json) {
    headers = {
      'Content-Type': 'application/json',
      ...headers,
    };

    init.body = JSON.stringify(init.json);
  }

  const result = await fetch(`${BASE_URL}${url}`, {
    ...init,
    headers,
    credentials: 'include',
  });

  if (!result.ok) {
    throw new ApiError(result);
  }

  const data = (await result.json()) as Promise<T>;

  return data;
};
