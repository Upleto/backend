import { getMaxOptions, generateSalt, hash as argon2Hash, verify, Options } from 'argon2themax';

class Argon2 {
  private options?: Options;
  constructor() {
    this.options = undefined;
  }

  init = async () => {
    this.options = await getMaxOptions();
    return this;
  };

  getDerivedKey({ password, salt }: { password: string | Buffer; salt: Buffer }) {
    return argon2Hash(password, salt, this.options);
  }

  generateSalt = generateSalt;

  generateHash = async (password: string | Buffer) => {
    const salt = await this.generateSalt();
    const hash = await this.getDerivedKey({ password, salt });
    return hash;
  };

  verify = verify;
}

const asyncArgon2 = new Argon2().init;
export default asyncArgon2;
