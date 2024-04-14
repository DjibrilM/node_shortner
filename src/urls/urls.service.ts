import { BadRequestException, Get, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { validateUrl } from 'src/util/validateUrl';
import { UrlRepository } from './url.repository';
import { CreateUrlDto } from './dto/createUrlDto';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(UrlRepository)
    private urlRepository: UrlRepository,
  ) {}

  async createUrl(data: CreateUrlDto, ownerId: string) {
    const confirmUrl = validateUrl(data.url); //check if the provided ir is correct
    if (!confirmUrl) throw new BadRequestException('invalid ur providede');
    const uniqueIdentifier = nanoid(10);
    const constructUrl =
      process.env.BACKEND_ORGIN + '/' + data.title + '/' + uniqueIdentifier;

    const url = await this.urlRepository.creatUrl({
      owner: ownerId,
      url: data.url,
      shortUrl: constructUrl,
      description: data.description,
      identifier: uniqueIdentifier,
    });

    return url;
  }

  async findUserUrls({ userId }) {
    return await this.urlRepository.findUserUrls(userId);
  }
}
