import {
  Column,
  Entity,
  BeforeInsert,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Meta } from '../util/shared/interfaces';

//user entity
import { Users } from 'src/auth/auth.entity';
import { Strike } from './strike.entity';

@Entity()
export class Url extends BaseEntity {
  @BeforeInsert()
  genarate() {
    this.id = uuidv4();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  shortUrl: string;

  @Column()
  url: string;

  @Column()
  @ManyToOne(() => Users, (userEntity) => userEntity.urls, {
    onDelete: 'CASCADE',
  })
  owner: string;

  @Column()
  urlIdentifier: string;

  @OneToMany(() => Strike, (strike) => strike.url, { nullable: true })
  strikes: Strike[];

  @Column({ nullable: true })
  strikesCount: number;

  @Column({ type: 'json', nullable: true })
  metadas: Meta[];

  @Column()
  title: string;
}
