import express, { NextFunction, Request, Response } from 'express';
import { User, userStore } from '../models/users';
import bodyParser from 'body-parser';

const bookstoreObject = new userStore();

const app = express.Router();
app.use(bodyParser.json());

app.get(
  '/users',
  async function (req: Request, res: Response, next: NextFunction) {
    
    if (req.query.id != undefined) {
      res.send(await bookstoreObject.show(req.query.id as String));
    } else {
      res.send(await bookstoreObject.index());
    }
    next();
  }
);

app.post(
  '/users',
  async function (req: Request, res: Response, next: NextFunction) {
    const newUser: User = {
      id: '-1',
      first_name:req.query.first_name as string,
      last_name:req.query.last_name as string,
      username: req.query.username as string,
      password: req.query.password as string,
    };
    await bookstoreObject.insert(newUser);
    res.send(await bookstoreObject.index());
    next();
  }
);

app.put(
  '/users',
  async function (req: Request, res: Response, next: NextFunction) {
    const newUser: User = {
        id: req.query.id as string,
        first_name:req.query.first_name as string,
        last_name:req.query.last_name as string,
        username: req.query.username as string,
        password: req.query.password as string,
      };
    res.send(await bookstoreObject.update(newUser));
    next();
  }
);

app.delete(
  '/users',
  async function (req: Request, res: Response, next: NextFunction) {
    res.send(await bookstoreObject.delete(req.query.id as string));
    next();
  }
);

export default app;
