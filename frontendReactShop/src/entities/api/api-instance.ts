const getBaseUrl = () => {
  // Если есть переменная окружения, используем её
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // В продакшене (когда нет порта в URL)
  if (typeof window !== 'undefined' && window.location.port === '') {
    // Используем тот же хост, но порт 3000
    return `${window.location.protocol}//${window.location.hostname}:3000`;
  }

  // В разработке используем относительный URL
  return '';
};

const BASE_URL = getBaseUrl();

// Отладочная информация
console.log('API Base URL:', BASE_URL);
console.log('Current location:', window.location.href);

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

  const fullUrl = `${BASE_URL}${url}`;
  console.log('Making API request to:', fullUrl);

  const result = await fetch(fullUrl, {
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
