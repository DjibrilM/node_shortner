import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { createPreRenderedHmtlPage } from './util/preRenderedHmtlRespinse';
const requestIp = require('request-ip');

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get(':titile/:identifier')
  async Redirect(@Req() request: Request, @Res() response: Response) {
    return this.appService.createStrike(request, response);
  }
}

//   //  window.location.href = 'https://www.youtube.com/watch?v=LDMY7qtOPiI';
