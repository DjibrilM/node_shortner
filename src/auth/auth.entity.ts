import {
  Unique,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Url } from 'src/urls/url.entity';

@Entity()
@Unique(['email']) // Ensure email field is unique
export class Users extends BaseEntity {
  @BeforeInsert()
  genarate() {
    this.id = uuidv4();
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, name: 'email' })
  email: string;

  @Column()
  password: string;

  @Column()
  profile: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Url, (urlEntity) => urlEntity.owner,{nullable:true})
  urls: Url[];

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
