import express, { NextFunction, Request, Response } from 'express';
import { Product, productStore } from '../models/products';
import { User } from '../models/users';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { CheckIfStringIsValid, CheckIfNumberIsValid } from '../utils/util';

const productStoreObject = new productStore();
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

const index = async function (req: Request, res: Response, next: NextFunction) {
  try {
res.send(await productStoreObject.index());
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
  
};

const show = async function (req: Request, res: Response, next: NextFunction) {
  if (!CheckIfNumberIsValid(req.params.id as unknown as number)) {
    res.status(404);
    res.send('please provide a id, add to url /id');
    return;
  }

  try {
 res.send(await productStoreObject.show(req.params.id as unknown as number));
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
  if (!CheckIfStringIsValid(req.body.name as string)) {
    res.status(404);
    res.send('please provide a name, add to body name');
    return;
  }
  if (!CheckIfNumberIsValid(req.body.price as unknown as number)) {
    res.status(404);
    res.send('please provide a price, add to body price');
    return;
  }
  const newProduct: Product = {
    id: -1,
    name: req.body.name as string,
    price: req.body.price as unknown as number,
  };

  try {
 res.send(await productStoreObject.create(newProduct));
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
  //console.log(newProduct)
 
};

const update = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!CheckIfNumberIsValid(req.params.id as string)) {
    res.status(404);
    res.send('please provide a id, add to url /id');
    return;
  }
  if (!CheckIfStringIsValid(req.body.name as string)) {
    res.status(404);
    res.send('please provide a name, add to body name');
    return;
  }
  if (!CheckIfNumberIsValid(req.body.price as unknown as number)) {
    res.status(404);
    res.send('please provide a price, add to body price');
    return;
  }
  const newProduct: Product = {
    id: req.params.id as unknown as number,
    name: req.body.name as string,
    price: req.body.price as unknown as number,
  };
  try {
 res.send(await productStoreObject.update(newProduct));
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
  if (!CheckIfNumberIsValid(req.params.id as string)) {
    res.status(404);
    res.send('please provide a id, add to url /id');
    return;
  }
  try {
res.send(await productStoreObject.delete(req.params.id as unknown as number));
  next();
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
  
};

let app: express.Router = express.Router();
app.get('/products', bodyParser.json(), index);
app.get('/products/:id', bodyParser.json(), show);
app.post('/products', bodyParser.json(), tokenVerifier, create);
app.put('/products/:id', bodyParser.json(), tokenVerifier, update);
app.delete('/products/:id', bodyParser.json(), tokenVerifier, destroy);

export default app;
