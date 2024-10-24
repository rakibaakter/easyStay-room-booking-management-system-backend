import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {

  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  bcryptSaltRound : process.env.BCRYPT_SALT_ROUNDS,
  jwtAccessToken : process.env.JWT_ACCESS_TOKEN
};