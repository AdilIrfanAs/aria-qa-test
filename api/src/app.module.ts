import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { IssueModule } from './modules/issues/issue.module';
import { SequelizeModule } from './modules/sequelize/sequelize.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule, SequelizeModule, UserModule, IssueModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
