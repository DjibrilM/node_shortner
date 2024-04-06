import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/create/user')
  async creatUser(@Body() body: CreateUserDto) {
    return await this.authService.createUser(body);
  }
}
