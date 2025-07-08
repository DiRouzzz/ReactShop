import { jsonApiInstance } from '../api/api-instance';

interface UserDto {
  id: string;
  email: string;
  roleId: string;
  registeredAt: string;
}

export const authApi = {
  baseKey: 'user',
  register: (data: { email: string; password: string }) =>
    jsonApiInstance('/api/auth/register', {
      method: 'POST',
      json: data,
    }),

  verify: async (data: { email: string; code: string }) => {
    const response = await jsonApiInstance<{
      user?: UserDto;
      error: string | null;
    }>('/api/auth/verify', {
      method: 'POST',
      json: data,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  },

  resend: (data: { email: string }) =>
    jsonApiInstance('/api/auth/resend', {
      method: 'POST',
      json: data,
    }),

  loginUser: async ({
    data,
  }: {
    data: { email: string; password: string };
  }) => {
    const response = await jsonApiInstance<{
      user?: UserDto;
      error: string | null;
    }>('/api/auth/login', {
      method: 'POST',
      json: data,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  },

  logout: () => {
    return jsonApiInstance<{ error: null }>('/api/auth/logout', {
      method: 'POST',
    });
  },
};
