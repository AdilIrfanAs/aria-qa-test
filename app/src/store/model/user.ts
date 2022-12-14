export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  is_validated?: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
