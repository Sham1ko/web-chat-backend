import { config } from 'dotenv';
config();
export const MONGO_DB = {
  dbName: process.env.DB_NAME || 'webchat',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 27017,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
  get uri() {
    return `mongodb://${this.host}:${this.port}/${this.dbName}`;
  },
};
