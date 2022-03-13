import dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';
dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_test,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
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
    port:POSTGRES_PORT as unknown as number,
  });
} else {
  console.log(ENV);
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_test,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port:POSTGRES_PORT as unknown as number,
  });
}
client.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('connected to database');
});
export default client;
