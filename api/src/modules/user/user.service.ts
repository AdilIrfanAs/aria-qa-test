import { Injectable, Logger } from '@nestjs/common';
import { Transaction, FindOptions } from 'sequelize';

import { IUser } from './user.interface';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  findByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  create(user: Partial<IUser>, transaction?: Transaction) {
    return this.userRepository.create(user, transaction);
  }
}
