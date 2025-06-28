export const ROLE = {
  ADMIN: '0',
  USER: '1',
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
