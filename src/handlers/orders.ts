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
    const token = req.headers.authorization as string;
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
    if (decodedToken.id !== parseInt(req.body.user_id)) {
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
  res.send(await orderStoreObject.show(parseInt(req.params.order_id) as unknown as number));
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
    user_id: req.body.user_id as unknown as number,
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
    id: req.params.order_id as unknown as number,
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
      req.body.testQuantity as unknown as number,
      parseInt(req.params.order_id) as unknown as number,
      req.body.product_id as unknown as number
    )
  );
  next();
};
const remove_product = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(
    await orderStoreObject.remove_product(
      parseInt(req.params.order_id) as unknown as number,
      req.body.product_id as unknown as number
    )
  );
  next();
};

const destroy = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(await orderStoreObject.delete(req.params.order_id as unknown as number));
  next();
};

let app: express.Router = express.Router();
app.get('/orders', bodyParser.json(), index);
app.get('/orders/:order_id', bodyParser.json(), show);
app.post('/orders/', bodyParser.json(), tokenVerifier, userIDverify, create);
app.post('/orders/add_product/:order_id', bodyParser.json(), tokenVerifier, userIDverify, add_product);
app.post('/orders/remove_product/:order_id', bodyParser.json(), tokenVerifier, userIDverify, remove_product);
app.put('/orders/:order_id', bodyParser.json(), tokenVerifier, userIDverify, update);
app.delete('/orders/:order_id', bodyParser.json(), tokenVerifier, userIDverify, destroy);

export default app;
