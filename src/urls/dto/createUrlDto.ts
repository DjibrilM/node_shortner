import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  title:string
}
