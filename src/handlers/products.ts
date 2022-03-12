import express, { NextFunction, Request, Response } from 'express';
import { Product, productStore } from '../models/products';
import { User } from '../models/users';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
const productStoreObject = new productStore();
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

interface JwtPayload {
  _id: number;
}

const userIDverify = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const user: User = {
    id: parseInt(req.params.id),
    username: req.body.username,
    password: req.body.password,
    first_name: '',
    last_name: '',
  };
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const { _id } = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as JwtPayload;

    if (_id !== user.id) {
      throw new Error('User id does not match!');
    }
  } catch (err) {
    res.status(401);
    res.json(err);
    return;
  }
};

const index = async function (req: Request, res: Response, next: NextFunction) {
  res.send(await productStoreObject.index());
  next();
};

const show = async function (req: Request, res: Response, next: NextFunction) {
  res.send(await productStoreObject.show(req.query.id as unknown as number));
  next();
};

const create = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUser: Product = {
    id: -1,
    name: req.query.name as string,
    price: req.query.price as unknown as number,
  };
  await productStoreObject.create(newUser);
  var token = jwt.sign({ newUser }, process.env.TOKEN_SECRET as string);
  res.send(token);
  next();
};

const update = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newProduct: Product = {
    id: req.query.id as unknown as number,
    name: req.query.name as string,
    price: req.query.price as unknown as number,
  };
  res.send(await productStoreObject.update(newProduct));
  next();
};

const destroy = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(await productStoreObject.delete(req.query.id as unknown as number));
  next();
};

let app: express.Router = express.Router();
app.get('/products', index, bodyParser.json());
app.get('/products/:id', show, bodyParser.json());
app.post('/products', create, bodyParser.json());
app.put('/products/', tokenVerifier, update, bodyParser.json());
app.delete('/products/:id', tokenVerifier, destroy, bodyParser.json());

export default app;
