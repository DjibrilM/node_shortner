import { Injectable, Res } from '@nestjs/common';
import { UrlRepository } from './urls/url.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { StrikeRepository } from './urls/strike.repository';
import { Request, Response } from 'express';
const requestIp = require('request-ip');
import { createPreRenderedHtmlPage } from './util/preRenderedHmtlRespinse';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UrlRepository)
    private urlRepository: UrlRepository,

    @InjectRepository(StrikeRepository)
    private strikeRepository: StrikeRepository,
  ) {}

  async getUrl(shortUrl: string) {
    const url = await this.urlRepository.findUrlByShortUrl(shortUrl);
    // const createStrike = await this.strikeRepository.createStrike()
    return url;
  }

  async createStrike(request: Request, response: Response) {
    const shorturl = request.url;

    const splitShorturl = shorturl.split('/');

    const urlUniqueIdentifier = splitShorturl[splitShorturl.length - 1];

    const url = await this.getUrl(urlUniqueIdentifier); //get the url(findOne({where:{uniqueIdentifier}}))

    const visitorIpAddress = requestIp.getClientIp(request);

    const createStrike = this.strikeRepository.createStrike(
      url,
      visitorIpAddress,
    ); // create s trike report

    return response.send(createPreRenderedHmtlPage(url.metadas, url.title));
  }
}
