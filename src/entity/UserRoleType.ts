import { Entity, Column, UpdateDateColumn } from 'typeorm';
import { Roles } from './enum';
import { AbstractIdUpdate } from '../util/database/abstractEntityClass';

@Entity({ name: 'user_role_type' })
export class UserRoleType extends AbstractIdUpdate {
  @Column({
    type: 'enum',
    enum: Roles,
  })
  role: Roles;

  @Column()
  description: string;
}
