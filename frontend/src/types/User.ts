export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
  accountBalance: number;
  token: string;
  password?: string;
}
