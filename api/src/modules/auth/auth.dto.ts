import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

import { IUser } from '../user/user.interface';

import { AccessToken } from './auth.interface';

export class SignInPayload {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly password: string;
}

export class SignInRes implements AccessToken {
  @ApiProperty({ description: 'User access token' })
  readonly access_token: string;
}

export class SignUpPayload {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  // @MinLength(8)
  // @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  readonly password: string;
}

export class SignUpRes
  implements Omit<IUser, 'id' | 'password' | 'updated_at' | 'deleted_at'>
{
  @ApiProperty({ description: 'User email' })
  readonly email: string;

  @ApiProperty({ description: 'User name' })
  readonly name: string;

  @ApiProperty({ description: 'User creation date' })
  readonly created_at: Date;
}
