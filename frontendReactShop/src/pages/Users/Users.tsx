import React from 'react';
import { ROLE } from '@/constants/role';
import { UsersList, UsersTable } from './components';
import { Container, H2, PrivateContent, Spinner } from '@/components/shared';
import { useUsers } from '@/entities/users';

export const Users: React.FC = () => {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <PrivateContent access={[ROLE.ADMIN]}>
      <Container>
        <H2>Управление пользователями</H2>
        <UsersTable>
          <UsersList users={users?.data || []} />
        </UsersTable>
      </Container>
    </PrivateContent>
  );
};
