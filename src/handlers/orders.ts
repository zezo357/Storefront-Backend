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


const userIDverify = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {

  try {
    const token = req.headers.authorization as string;
    const decodedToken = jwt.decode(token) as User;
    if (decodedToken.id !== parseInt(req.params.id)) {
      throw new Error('User id does not match!');
    }
    next();
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
  res.send(await orderStoreObject.show(req.params.id as unknown as number));
  next();
};

const create = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newOrder: Order = {
    id: -1,
    status: 'open',
    user_id: req.query.user_id as unknown as number,
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
    id: req.params.id as unknown as number,
    status: req.body.status as string,
    user_id: req.body.user_id as unknown as number,
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
      req.query.quantity as unknown as number,
      req.query.order_id as unknown as number,
      req.query.product_id as unknown as number
    )
  );
  next();
};

const destroy = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(await orderStoreObject.delete(req.params.id as unknown as number));
  next();
};

let app: express.Router = express.Router();
app.get('/orders', bodyParser.json(), index);
app.get('/orders/:id', bodyParser.json(), show);
app.post('/orders', bodyParser.json(), create);
app.post('/orders', bodyParser.json(), add_product);
app.put('/orders/:id', bodyParser.json(), tokenVerifier, userIDverify, update);
app.delete('/orders/:id', bodyParser.json(), tokenVerifier, userIDverify, destroy);

export default app;
