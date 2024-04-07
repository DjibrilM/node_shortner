import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { Users } from './auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
