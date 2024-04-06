import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { typeOrmCOnfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
config();

@Module({
  imports: [TypeOrmModule.forRoot({ ...typeOrmCOnfig }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
