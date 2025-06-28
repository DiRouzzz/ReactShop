import { useAuth } from '@/app/AuthContext';
import { checkAccess } from '@/utils/checkAccess';
import type { Role } from '@/constants/role';
import { Error } from './Error';
import { ERROR } from '@/constants/error';

interface PrivateContentProps {
  children: React.ReactNode;
  access: Role[];
  serverError?: string | null;
}

export const PrivateContent: React.FC<PrivateContentProps> = ({
  children,
  access,
  serverError = null,
}) => {
  const { userData } = useAuth();

  const accessError = checkAccess(access, userData?.user.roleId as Role)
    ? null
    : ERROR.ACCESS_DENIED;

  const error = serverError || accessError;

  return error ? <Error error={error} /> : children;
};
