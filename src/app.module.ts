import 'reflect-metadata';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { typeOrmCOnfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UrlsModule } from './urls/urls.module';
config();


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmCOnfig),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '3d',
      },
    }),

    AuthModule,
    UrlsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
