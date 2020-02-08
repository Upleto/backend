import { createConnection } from 'typeorm';
import shortUuid from 'short-uuid';
import asyncArgon2 from '../argon2/asyncArgon2';
import { UserAccount } from '../../entity/UserAccount';
import { PasswordHashFunctions } from '../../entity/enum';
import { UserRoleType } from '../../entity/UserRoleType';
import { UserRole } from '../../entity/UserRole';
import { Roles } from '../../entity/enum';

const shortTranslator = shortUuid();
const argon2Async = asyncArgon2();

const main = async () => {
  const connection = await createConnection().catch(console.error);
  if (!connection) {
    return;
  }
  const argon2 = await argon2Async;
  // connection.synchronize();
  const hash1 = await argon2.generateHash('testPassword');
  // const salt2 = await generateSalt();
  // const hash2 = await argon2Hash('testOutcome', salt2, options);
  // const match1 = await verify(hash1, 'test');
  // const match2 = await verify(hash2, 'min');
  // const match3 = await verify(hash1, 'testPassword');
  // const match4 = await verify(hash1, 'testOutcome');
  // const match5 = await verify(hash2, 'testOutcome');
  // console.log(match1, match2, match3, match4, match5);
  // console.log(hash1.split('$'));
  // console.log(hash2.split('$'));
  const userAccount = new UserAccount();
  const userRole = new UserRole();
  userAccount.email = 'test@gmail.com';
  userAccount.userName = 'test';
  userAccount.derivedKey = hash1;
  userAccount.passwordHashFunction = PasswordHashFunctions.Argon2;
  userAccount.uuid = shortTranslator.new();
  userAccount.userRoles = [userRole];
  userRole.active = true;
  // await connection.manager.save(userAccount);
  // const userAccountRepository = connection.getRepository(UserAccount);
  // const userRoleTypeRepository = connection.getRepository(UserRole);
  // const userAccount = (await userAccountRepository.find({ userName: 'test' }))[0];
  // const match1 = await verify(userAccount.derivedKey, 'hello');
  // const match2 = await verify(userAccount.derivedKey, 'testPassword');
  // console.log(match1, match2);

  const userRoleTypeRepository = connection.getRepository(UserRoleType);
  const promiseAll = Object.values(Roles).map(async role => {
    const userRoleType = new UserRoleType();
    userRoleType.role = role;
    userRoleType.description = role;
    await userRoleTypeRepository.save(userRoleType);
  });
  await Promise.all(promiseAll);
  const visitorRole = await userRoleTypeRepository.findOne({ role: Roles.visitor });
  console.log(visitorRole?.updatedAt);
  if (!visitorRole) {
    return;
  }
  userRole.userRoleType = visitorRole;
  userRole.userAccount = userAccount;
  // userAccountRepository.save(userAccount);
  await connection.manager.save(userAccount);
  await connection.manager.save(userRole);
};

main();
