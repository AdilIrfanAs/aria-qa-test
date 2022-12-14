import { Global, Module } from '@nestjs/common';

import UserRepository from './user.repository';
import { UserService } from './user.service';

@Global()
@Module({
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
