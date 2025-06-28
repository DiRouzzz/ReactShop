import { useQuery } from '@tanstack/react-query';
import { usersApi } from './usersApi';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getUsers,
  });
};
