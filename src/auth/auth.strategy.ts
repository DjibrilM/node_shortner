import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from 'dotenv';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create_user.dt';
import { Logger, UnauthorizedException } from '@nestjs/common';
config();

const logger = new Logger();

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: CreateUserDto) {
    const user = this.authRepository.findOneUser(payload.email);
    if (!user) {
        
      logger.warn({
        message: 'one user provided a false jw token',
        tokenPayload: payload,
      });

      throw new UnauthorizedException('False credentials');
    }

    return user;
  }
}
