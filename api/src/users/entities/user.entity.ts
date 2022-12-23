import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ACCOUNT_TYPE } from '../../utils/enums';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
    length: 200,
    nullable: false,
  })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 200, nullable: false })
  password: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'account_type',
    type: 'enum',
    enum: ACCOUNT_TYPE,
    default: ACCOUNT_TYPE.CLIENT,
    nullable: false,
  })
  accountType: ACCOUNT_TYPE;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  updatedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log('User inserted:', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated:', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed:', this);
  }
}
