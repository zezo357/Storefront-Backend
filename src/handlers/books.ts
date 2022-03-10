import express, { NextFunction, Request, Response } from 'express';
import { Book, bookStore } from '../models/books';
import bodyParser from 'body-parser';
const app = express.Router();
app.use(bodyParser.json());

app.get(
  '/books',
  async function (req: Request, res: Response, next: NextFunction) {
    const bookstoreObject = new bookStore();
    if (req.query.id != undefined) {
      res.send(await bookstoreObject.show(req.query.id as unknown as Number));
    } else {
      res.send(await bookstoreObject.index());
    }
    next();
  }
);

app.post(
  '/books',
  async function (req: Request, res: Response, next: NextFunction) {
    const bookstoreObject = new bookStore();
    const newBook: Book = {
      id: -1,
      title: req.query.title as string,
      author: req.query.author as string,
      total_pages: req.query.total_pages as unknown as Number,
      type: req.query.type as string,
      summary: req.query.summary as string,
    };
    await bookstoreObject.insert(newBook);
    res.send(await bookstoreObject.index());
    next();
  }
);

app.put(
  '/books',
  async function (req: Request, res: Response, next: NextFunction) {
    const bookstoreObject = new bookStore();
    const newBook: Book = {
      id: req.query.id as unknown as Number,
      title: req.query.title as string,
      author: req.query.author as string,
      total_pages: req.query.total_pages as unknown as Number,
      type: req.query.type as string,
      summary: req.query.summary as string,
    };

    res.send(await bookstoreObject.update(newBook));
    next();
  }
);

app.delete(
  '/books',
  async function (req: Request, res: Response, next: NextFunction) {
    const bookstoreObject = new bookStore();
    res.send(await bookstoreObject.delete(req.query.id as unknown as Number));
    next();
    //res.send(await bookstoreObject.index());
  }
);

export default app;
