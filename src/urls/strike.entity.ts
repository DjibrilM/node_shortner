import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Url } from './url.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Strike extends BaseEntity {
  @BeforeInsert()
  genarate() {
    this.id = uuidv4();
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  countryCode: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  regionName: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true, type: 'float' })
  lat: number;

  @Column({ nullable: true, type: 'float' })
  lon: number;

  @Column({ nullable: true })
  timezone: string;

  @ManyToOne(() => Url, (url) => url.strikes)
  url: Url;
}
