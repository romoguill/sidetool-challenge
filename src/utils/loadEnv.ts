// Used for drizzle-kit. ESM modules prevent to use dotenv.config()
import dotenv from 'dotenv';
dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production.local'
      : '.env.development.local',
});
