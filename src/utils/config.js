// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from "dotenv";

dotenv.config();

const { env } = process;

export const PORT = env.port || 5050;
export const environment = env.NODE_ENV || "dev";
export const dbUri = env.DB_URI;
export const mongoUser = env.MONGO_USER;
export const mongoPass = env.MONGO_PASS;
