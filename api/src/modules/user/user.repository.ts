import { Injectable } from '@nestjs/common';
import { FindOptions, Transaction } from 'sequelize';

import { BaseRepository } from '../sequelize/sequelize.class';
import { Repository } from '../sequelize/sequelize.interface';

import { IUser } from './user.interface';
import User from './user.model';

@Injectable()
export class UserRepository implements Repository<IUser> {
  protected readonly baseRepository: BaseRepository<User>;
  constructor() {
    this.baseRepository = new BaseRepository(User);
  }

  create(values: Partial<IUser>, transaction?: Transaction): Promise<IUser> {
    return this.baseRepository.create(values, transaction);
  }

  findOne(params: FindOptions<IUser>): Promise<IUser | null> {
    return this.baseRepository.findOne(params);
  }
}

export default UserRepository;
