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
    jsonApiInstance<{ data: UserDto[] }>('/users', {
      method: 'GET',
    }),

  updateUserRole: (userId: string, data: UpdateUserData) =>
    jsonApiInstance<UserDto>(`/users/${userId}`, {
      method: 'PATCH',
      json: data,
    }),

  deleteUser: (userId: string) =>
    jsonApiInstance<{ error: null }>(`/users/${userId}`, {
      method: 'DELETE',
    }),
};
