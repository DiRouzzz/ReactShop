import { jsonApiInstance } from '../api/api-instance';

interface UserDto {
  id: string;
  email: string;
  roleId: string;
  registeredAt: string;
}

interface UpdateUserData {
  roleId: string;
}

export const usersApi = {
  baseKey: 'users',

  getUsers: () =>
    jsonApiInstance<{ data: UserDto[] }>('/api/users', {
      method: 'GET',
    }),

  updateUserRole: (userId: string, data: UpdateUserData) =>
    jsonApiInstance<UserDto>(`/api/users/${userId}`, {
      method: 'PATCH',
      json: data,
    }),

  deleteUser: (userId: string) =>
    jsonApiInstance<{ error: null }>(`/api/users/${userId}`, {
      method: 'DELETE',
    }),
};
