import { FindOptions } from 'sequelize';
export interface BaseModel {
  id: number;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}

export interface Repository<T> {
  create(values: Partial<T>): Promise<T>;
  findOne(params: FindOptions<T>): Promise<T | null>;
}
