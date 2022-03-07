import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_test,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let client: Pool;
if (ENV == 'dev') {
  console.log(ENV);
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else {
  console.log(ENV);
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_test,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
export default client;
