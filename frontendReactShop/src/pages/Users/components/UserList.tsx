import React from 'react';
import { UserRow } from './UserRow';
import { toast } from 'sonner';
import { useDeleteUser, useUpdateUserRole } from '@/entities/users';

interface User {
  id: string;
  email: string;
  roleId: string;
  registeredAt: string;
}

interface UsersListProps {
  users: User[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const updateUserRole = useUpdateUserRole();
  const deleteUser = useDeleteUser();

  const handleRoleChange = (userId: string, newRoleId: string) => {
    updateUserRole.mutate({ userId, roleId: newRoleId });
  };

  const handleDeleteUser = (userId: string) => {
    toast('Удаление пользователя', {
      description: 'Вы уверены, что хотите удалить этого пользователя?',
      action: {
        label: 'Удалить',
        onClick: () => {
          deleteUser.mutate(userId, {
            onSuccess: () => {
              toast.success('Пользователь успешно удален');
            },
            onError: () => {
              toast.error('Ошибка при удалении пользователя');
            },
          });
        },
      },
      cancel: {
        label: 'Отмена',
        onClick: () => {
          toast.dismiss();
        },
      },
      duration: Infinity,
    });
  };

  return (
    <>
      {users?.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          onRoleChange={handleRoleChange}
          onDeleteUser={handleDeleteUser}
          isUpdatingRole={updateUserRole.isPending}
          isDeleting={deleteUser.isPending}
        />
      ))}
    </>
  );
};
