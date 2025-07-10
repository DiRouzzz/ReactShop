const getBaseUrl = () => {
  // Если есть переменная окружения, используем её
  if (import.meta.env.VITE_API_URL) {
    console.log('Using VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }

  // Принудительно для продакшена (когда хост не localhost)
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost'
  ) {
    const url = `${window.location.protocol}//${window.location.hostname}:3000`;
    console.log('Using production URL:', url);
    return url;
  }

  // В разработке используем относительный URL
  console.log('Using development URL (empty string)');
  return '';
};

const BASE_URL = getBaseUrl();

// Отладочная информация
console.log('API Base URL:', BASE_URL);
console.log('Current location:', window.location.href);
console.log('Hostname:', window.location.hostname);
console.log('Port:', window.location.port);
console.log(
  'Hostname === localhost:',
  window.location.hostname === 'localhost'
);

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
