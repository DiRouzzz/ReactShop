import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, User, Shield } from 'lucide-react';
import { ROLE } from '@/constants/role';

interface User {
  id: string;
  email: string;
  roleId: string;
  registeredAt: string;
}

interface UserRowProps {
  user: User;
  onRoleChange: (userId: string, newRoleId: string) => void;
  onDeleteUser: (userId: string) => void;
  isUpdatingRole: boolean;
  isDeleting: boolean;
}

const roleLabels = {
  [ROLE.USER]: 'Пользователь',
  [ROLE.ADMIN]: 'Администратор',
};

const roleIcons = {
  [ROLE.USER]: User,
  [ROLE.ADMIN]: Shield,
};

export const UserRow: React.FC<UserRowProps> = ({
  user,
  onRoleChange,
  onDeleteUser,
  isUpdatingRole,
  isDeleting,
}) => {
  const RoleIcon = roleIcons[user.roleId as keyof typeof roleIcons];

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Select
          value={user.roleId}
          onValueChange={(newRoleId) => onRoleChange(user.id, newRoleId)}
          disabled={isUpdatingRole}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              <div className="flex items-center gap-2">
                {RoleIcon && <RoleIcon size={16} />}
                {roleLabels[user.roleId as keyof typeof roleLabels]}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ROLE.USER}>
              <div className="flex items-center gap-2">
                <User size={16} />
                Пользователь
              </div>
            </SelectItem>
            <SelectItem value={ROLE.ADMIN}>
              <div className="flex items-center gap-2">
                <Shield size={16} />
                Администратор
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {user.registeredAt}
      </td>
      <td className="px-10 py-4 whitespace-nowrap text-sm">
        <Button
          className="hover:bg-red-800"
          variant="destructive"
          size="sm"
          onClick={() => onDeleteUser(user.id)}
          disabled={isDeleting}
        >
          <Trash2 size={16} />
        </Button>
      </td>
    </tr>
  );
};
