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
  BCRYPT_PASSWORD,
  SALT_ROUNDS
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
client.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('connected to database');
});
export default client;
