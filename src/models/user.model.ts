export interface User {
  id: string;
  name: string;
  nif: string | null;
  email: string;
  type: string;
  balance: number;
  password: string;
}
