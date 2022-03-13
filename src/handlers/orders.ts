import express, { NextFunction, Request, Response } from 'express';
import { Order, orderStore } from '../models/orders';
import { User } from '../models/users';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { CheckIfStringIsValid, CheckIfNumberIsValid } from '../utils/util';

const orderStoreObject = new orderStore();
const verifyUserID = (
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
    if (!CheckIfNumberIsValid(req.body.user_id as unknown as number)) {
      throw new Error('please provide a user_id in your request body');
    }

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
  try {
res.send(await orderStoreObject.index());
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
  
};

const show = async function (req: Request, res: Response, next: NextFunction) {
  if (!CheckIfNumberIsValid(req.params.order_id as unknown as number)) {
    res.status(404);
    res.send("please provide a order_id add to your url '/order_id'");
    return;
  }
  try {
 res.send(
    await orderStoreObject.show(
      parseInt(req.params.order_id) as unknown as number
    )
  );
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
 
};

const create = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!CheckIfNumberIsValid(req.body.user_id as unknown as number)) {
    res.status(404);
    res.send('please provide a user_id, add to body user_id');
    return;
  }

  if (!CheckIfStringIsValid(req.body.status as unknown as number)) {
    res.status(404);
    res.send('please provide a status, add to body status');
    return;
  }

  const newOrder: Order = {
    id: -1,
    status: req.body.status as string,
    user_id: req.body.user_id as unknown as number,
  };

  try {
res.send(await orderStoreObject.create(newOrder));
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
  
};

const update = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!CheckIfNumberIsValid(req.params.order_id as unknown as number)) {
    res.status(404);
    res.send('please provide a order_id, add to url /order_id');
    return;
  }

  if (!CheckIfNumberIsValid(req.body.user_id as unknown as number)) {
    res.status(404);
    res.send('please provide a user_id, add to body user_id');
    return;
  }

  if (!CheckIfStringIsValid(req.body.status as unknown as number)) {
    res.status(404);
    res.send('please provide a status, add to body status');
    return;
  }

  const newOrder: Order = {
    id: req.params.order_id as unknown as number,
    status: req.body.status as string,
    user_id: req.body.user_id as unknown as number,
  };

  try {
res.send(await orderStoreObject.update(newOrder));
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
  
};
const add_product = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!CheckIfNumberIsValid(req.params.order_id as unknown as number)) {
    res.status(404);
    res.send('please provide a order_id, add to url /order_id');
    return;
  }

  if (!CheckIfNumberIsValid(req.body.product_id as unknown as number)) {
    res.status(404);
    res.send('please provide a product_id, add to body product_id');
    return;
  }

  if (!CheckIfNumberIsValid(req.body.quantity as unknown as number)) {
    res.status(404);
    res.send('please provide a quantity, add to body quantity');
    return;
  }
  try {
  res.send(
    await orderStoreObject.add_product(
      req.body.quantity as unknown as number,
      parseInt(req.params.order_id) as unknown as number,
      req.body.product_id as unknown as number
    )
  );
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }

};
const remove_product = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!CheckIfNumberIsValid(req.params.order_id as unknown as number)) {
    res.status(404);
    res.send('please provide a order_id, add to url /order_id');
    return;
  }

  if (!CheckIfNumberIsValid(req.body.product_id as unknown as number)) {
    res.status(404);
    res.send('please provide a product_id, add to body product_id');
    return;
  }
  try {
 res.send(
    await orderStoreObject.remove_product(
      parseInt(req.params.order_id) as unknown as number,
      req.body.product_id as unknown as number
    )
  );
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
 
};

const destroy = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!CheckIfNumberIsValid(req.params.order_id as unknown as number)) {
    res.status(404);
    res.send('please provide a order_id, add to url /order_id');
    return;
  }
  try {
res.send(
    await orderStoreObject.delete(req.params.order_id as unknown as number)
  );
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
  
};

let app: express.Router = express.Router();
app.get('/orders', bodyParser.json(), index);
app.get('/orders/:order_id', bodyParser.json(), show);
app.post('/orders/', bodyParser.json(), tokenVerifier, userIDverify, create);
app.post(
  '/orders/add_product/:order_id',
  bodyParser.json(),
  tokenVerifier,
  userIDverify,
  add_product
);
app.post(
  '/orders/remove_product/:order_id',
  bodyParser.json(),
  tokenVerifier,
  userIDverify,
  remove_product
);
app.put(
  '/orders/:order_id',
  bodyParser.json(),
  tokenVerifier,
  userIDverify,
  update
);
app.delete(
  '/orders/:order_id',
  bodyParser.json(),
  tokenVerifier,
  userIDverify,
  destroy
);

export default app;
