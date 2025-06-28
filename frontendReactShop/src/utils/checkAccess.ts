import type { Role } from '@/constants/role';

export const checkAccess = (access: Role[], userRole: Role): boolean => {
  if (!userRole) return false;
  return access.includes(userRole);
};
