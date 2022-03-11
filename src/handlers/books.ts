import express, { NextFunction, Request, Response } from 'express';
import { Book, bookStore } from '../models/books';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const tokenVerifier = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
};

const index = async function (req: Request, res: Response, next: NextFunction) {
  const bookstoreObject = new bookStore();
  try {
    if (req.query.id != undefined) {
      res.send(await bookstoreObject.show(req.query.id as unknown as Number));
      console.log('showing book by id');
    } else {
      res.send(await bookstoreObject.index());
      console.log('showing all books ');
    }
    next();
  } catch (err) {
    next(err);
    return;
  }
};

const create = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookstoreObject = new bookStore();
    const newBook: Book = {
      id: -1,
      title: req.query.title as string,
      author: req.query.author as string,
      total_pages: req.query.total_pages as unknown as Number,
      type: req.query.type as string,
      summary: req.query.summary as string,
    };
    await bookstoreObject.create(newBook);
    res.send(await bookstoreObject.index());
    next();
  } catch (err) {
    next(err);
    return;
  }
};

const update = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
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
  } catch (err) {
    next(err);
    return;
  }
};

const destroy = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookstoreObject = new bookStore();
    res.send(await bookstoreObject.delete(req.query.id as unknown as Number));
    next();
  } catch (err) {
    next(err);
    return;
  }
  //res.send(await bookstoreObject.index());
};
let app: express.Router = express.Router();
app.get('/books', index, bodyParser.json(), errorHandler);
app.post('/books', tokenVerifier, create, bodyParser.json(), errorHandler);
app.put('/books', tokenVerifier, update, bodyParser.json(), errorHandler);
app.delete('/books', tokenVerifier, destroy, bodyParser.json(), errorHandler);

export default app;
