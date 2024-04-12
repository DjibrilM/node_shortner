import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create_user.dt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { createLoggerMessage } from 'src/util/createLoggerMessage';

const logger = new Logger();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}

  async createUser(user: CreateUserDto) {
    return await this.authRepository.createUsers(user);
  }

  async login(data: LoginDto) {
    const user = await this.authRepository.findOneUser(data.email);

    if (!user) throw new NotFoundException('user not found');

    const comparePassword = await user.comparePassword(data.password);

    if (!comparePassword) {
      // check if the provided password id correct
      delete user.password; //remove the password in the logger
      logger.log({
        message:
          'false creadentials provided. User tried to login with a wrong password',
        user: user,
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    delete user.password;
    const payload = { user };
    const authToken = await this.jwtService.sign(payload);

    return { user, authToken };
  }
}
