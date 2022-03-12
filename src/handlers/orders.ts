import express, { NextFunction, Request, Response } from 'express';
import { Order, orderStore } from '../models/orders';
import { User } from '../models/users';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
const orderStoreObject = new orderStore();
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
  _id: Number;
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
  res.send(await orderStoreObject.index());
  next();
};

const show = async function (req: Request, res: Response, next: NextFunction) {
  res.send(await orderStoreObject.show(req.query.id as unknown as Number));
  next();
};

const create = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newOrder: Order = {
    id: -1,
    status: 'created',
    user_id: req.query.user_id as unknown as Number,
  };
  res.send(await orderStoreObject.create(newOrder));
  next();
};

const update = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newOrder: Order = {
    id: req.query.id as unknown as Number,
    status: req.query.status as string,
    user_id: req.query.user_id as unknown as Number,
  };
  res.send(await orderStoreObject.update(newOrder));
  next();
};
const add_product = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(
    await orderStoreObject.add_product(
      req.query.quantity as unknown as Number,
      req.query.order_id as unknown as Number,
      req.query.product_id as unknown as Number
    )
  );
  next();
};

const destroy = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(await orderStoreObject.delete(req.query.id as unknown as Number));
  next();
};

let app: express.Router = express.Router();
app.get('/orders', index, bodyParser.json());
app.get('/orders/:id', show, bodyParser.json());
app.post('/orders', create, bodyParser.json());
app.post('/orders', add_product, bodyParser.json());
app.put('/orders/:id/products', tokenVerifier, update, bodyParser.json());
app.delete('/orders/:id', tokenVerifier, destroy, bodyParser.json());

export default app;
