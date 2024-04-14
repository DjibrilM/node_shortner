import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { CreateUrlDto } from './dto/createUrlDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlService: UrlsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createUrl(@Body() body: CreateUrlDto, @Req() request: any) {
    const user = request.user;
    return await this.urlService.createUrl(body, user.id);
  }

  @Get('user/all')
  @UseGuards(AuthGuard)
  async getUrls(@Req() request: any) {
    const user = request.user;
    return await this.urlService.findUserUrls(user.id);
  }
}
