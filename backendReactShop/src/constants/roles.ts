export interface IRole {
  ADMIN: string;
  USER: string;
  GUEST: string;
}

export const ROLE: Readonly<IRole> = {
  ADMIN: '0',
  USER: '1',
  GUEST: '2',
};
