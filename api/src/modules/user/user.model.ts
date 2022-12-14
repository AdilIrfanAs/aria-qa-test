import { Column, DataType, Table } from 'sequelize-typescript';

import { BaseModel } from '../sequelize/sequelize.class';

import { IUser } from './user.interface';

@Table({ tableName: 'user' })
export class User extends BaseModel<User> implements IUser {
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_validated?: boolean;
}

export default User;
