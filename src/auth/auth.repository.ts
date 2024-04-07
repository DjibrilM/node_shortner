import { config } from 'dotenv';
config();

import { Repository, EntityRepository } from 'typeorm';
import { Users } from './auth.entity';
import { CreateUserDto } from './dto/create_user.dt';
import { uniqueDatabaseConflictErrorCode } from 'src/util/constant';
import { Logger } from '@nestjs/common';
import { createLoggerMessage } from 'src/util/createLoggerMessage';
import { profileImoji } from 'src/util/profileEmojis';
import { Jwt } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Users)
export class AuthRepository extends Repository<Users> {
  async createUsers(UsersData: CreateUserDto): Promise<any> {
    const logger = new Logger();

    const password = await this.createHash(UsersData.password);
    const user = new Users();
    user.email = UsersData.email;
    user.password = password;
    user.profile = profileImoji();

    try {
      const saveUsers: any = await user.save();
      delete saveUsers.password;
      const auth_token = jsonwebtoken.sign(
        {...saveUsers},
        process.env.JSON_WEBTOKEN_SECRET,
      );
      saveUsers.auth_token = auth_token;

      return saveUsers;
    } catch (error) {
      if (+error.code === uniqueDatabaseConflictErrorCode) {
        logger.fatal(
          createLoggerMessage({
            error: error,
            developerMessage: 'trying to create a user with an existing email',
          }),
        );
        throw new ConflictException('user with this email already exist');
      } else {
        logger.error(
          createLoggerMessage({
            error: error,
            developerMessage: 'Failed to create a new user',
          }),
        );
        throw new InternalServerErrorException();
      }
    }
  }

  async createHash(string: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(string, salt);
    return hash;
  }
}
