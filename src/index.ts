import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { book, bookstore } from './models/books';
dotenv.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});
client.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('connected to database');
});
const app: express.Application = express();
const address: string = 'localhost:3000';

app.use(bodyParser.json());

app.get('/index', async function (req: Request, res: Response) {
  const bookstoreObject = new bookstore();
  res.send(await bookstoreObject.index());
});
app.get('/insert', async function (req: Request, res: Response) {
  const bookstoreObject = new bookstore();
  const newBook: book = {
    id: -1,
    title: 'test',
    author: 'test',
    total_pages: 10,
    type: 'test',
    summary: 'test',
  };
  await bookstoreObject.insert(newBook);
  res.send(await bookstoreObject.index());
});

app.get('/delete', async function (req: Request, res: Response) {
  const bookstoreObject = new bookstore();
  const newBook: book = {
    id: -1,
    title: 'test',
    author: 'test',
    total_pages: 10,
    type: 'test',
    summary: 'test',
  };
  await bookstoreObject.delete(newBook);
  res.send(await bookstoreObject.index());
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default client;
