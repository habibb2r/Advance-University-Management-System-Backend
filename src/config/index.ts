import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db: process.env.DB_URL,
  bcrypt_salt: process.env.BCRYPT_SALT,
  default_password: process.env.DEFAULT_PASSWORD,
};
