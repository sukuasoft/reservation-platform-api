import dotenv from 'dotenv';
dotenv.config();


export const envConfig = {
    APP_KEY: process.env.APP_KEY ?? '',
    PORT: process.env.PORT ?? 3000,
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    ENV_MODE: process.env.ENV_MODE ?? 'production',

}