// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from "dotenv";

dotenv.config();

const { env } = process;

export const PORT = env.port || 5050;
export const environment = env.NODE_ENV || "development";
export const dbUri = env.DB_URI;
