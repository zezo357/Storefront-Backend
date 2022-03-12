import express, { NextFunction, Request, Response } from 'express';
import { User, userStore } from '../models/users';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
const userStoreObject = new userStore();
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
  res.send(await userStoreObject.index());
  next();
};

const show = async function (req: Request, res: Response, next: NextFunction) {
  res.send(await userStoreObject.show(req.query.id as unknown as number));
  next();
};

const create = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUser: User = {
    id: -1,
    first_name: req.query.first_name as string,
    last_name: req.query.last_name as string,
    username: req.query.username as string,
    password: req.query.password as string,
  };
  await userStoreObject.create(newUser);
  var token = jwt.sign({ newUser }, process.env.TOKEN_SECRET as string);
  res.send(token);
  next();
};
const signin = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await userStoreObject.authenticate(
    req.query.username as string,
    req.query.password as string
  );
  if (user == null) {
    res.status(404);
    res.send('wrong username or password');
  } else {
    var token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
    res.send(token);
  }
  next();
};
const update = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newUser: User = {
    id: req.query.id as unknown as number,
    first_name: req.query.first_name as string,
    last_name: req.query.last_name as string,
    username: req.query.username as string,
    password: req.query.password as string,
  };
  res.send(await userStoreObject.update(newUser));
  next();
};

const destroy = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send(await userStoreObject.delete(req.query.id as unknown as number));
  next();
};

let app: express.Router = express.Router();
app.get('/users', index, bodyParser.json());
app.get('/users/:id', show, bodyParser.json());
app.post('/users', create, bodyParser.json());
app.post('/users/signin', signin, bodyParser.json());
app.put('/users/', tokenVerifier, userIDverify, update, bodyParser.json());
app.delete(
  '/users/:id',
  tokenVerifier,
  userIDverify,
  destroy,
  bodyParser.json()
);

export default app;
