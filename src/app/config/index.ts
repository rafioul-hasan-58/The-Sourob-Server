import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.Bcrypt_Salt_Round,
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expairs_in: process.env.JWT_REFRESH_EXPAIRS_IN,
    jwt_refresh_expairs_in: process.env.JWT_REFRESH_EXPAIRS_IN
  }
}