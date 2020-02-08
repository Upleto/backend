import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { PasswordHashFunctions } from './enum';
import { AbstractIdCreateUpdate } from '../util/database/abstractEntityClass';
import { UserRole } from './UserRole';

@Entity({ name: 'user_account' })
export class UserAccount extends AbstractIdCreateUpdate {
  @PrimaryColumn({
    length: 36,
    unique: true,
  })
  uuid: string;

  @Column({
    length: 100,
    name: 'user_name',
    unique: true,
  })
  userName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    name: 'derived_key',
  })
  derivedKey: string;

  @Column({
    type: 'enum',
    enum: PasswordHashFunctions,
    default: PasswordHashFunctions.Argon2,
  })
  passwordHashFunction: PasswordHashFunctions;

  @OneToMany(
    () => UserRole,
    userRole => userRole.id
  )
  userRoles: [UserRole];
}
