import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() response: Response) {
    return response.redirect(
      'https://docs.nestjs.com/techniques/configuration',
    );
  }
}
