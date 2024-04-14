import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

export const typeOrmCOnfig: TypeOrmModuleOptions = {
  retryDelay: 4000,
  autoLoadEntities: true,
  type: process.env.DATABASE_TYPE as any,
  port: +process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USER_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
