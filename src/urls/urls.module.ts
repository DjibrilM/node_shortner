import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { UrlRepository } from './url.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { Strike } from './strike.entity';
import { AuthModule } from 'src/auth/auth.module';
import { StrikeRepository } from './strike.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Url, Strike])],
  providers: [UrlsService, UrlRepository, StrikeRepository],
  controllers: [UrlsController],
  exports: [UrlRepository, StrikeRepository],
})
export class UrlsModule {}
