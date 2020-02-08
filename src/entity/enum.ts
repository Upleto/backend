export enum PasswordHashFunctions {
  BCRYPT = 'Bcrypt',
  SCRYPT = 'Scrypt',
  Argon2 = 'Argon2',
}

export enum Roles {
  visitor = 'visitor',
  admin = 'admin',
  tenant = 'tenant',
  landlord = 'landlord',
}
