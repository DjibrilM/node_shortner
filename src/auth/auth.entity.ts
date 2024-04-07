import {
  Unique,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
}
