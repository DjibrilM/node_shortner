import { Injectable, Res } from '@nestjs/common';
import { Redirect } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(@Res() response: Response) {
    return response.redirect(
      'https://docs.nestjs.com/techniques/configuration',
    );
  }
}
