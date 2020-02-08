import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractIdCreateUpdate } from '../util/database/abstractEntityClass';
import { UserAccount } from './UserAccount';
import { UserRoleType } from './UserRoleType';

@Entity({ name: 'user_role' })
export class UserRole extends AbstractIdCreateUpdate {
  @ManyToOne(
    () => UserAccount,
    userAccount => userAccount.id
  )
  @JoinColumn([{ name: 'user_account_id', referencedColumnName: 'id' }])
  userAccount: UserAccount;

  @ManyToOne(
    () => UserRoleType,
    userRoleType => userRoleType.id
  )
  @JoinColumn({ name: 'role_id' })
  userRoleType: UserRoleType;

  @Column({
    default: true,
  })
  active: boolean;
}
