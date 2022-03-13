import express, { NextFunction, Request, Response } from 'express';
import { User, userStore } from '../models/users';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import {CheckIfStringIsValid,CheckIfNumberIsValid} from "../utils/util";

const userStoreObject = new userStore();
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

    if(!CheckIfNumberIsValid(req.params.id as unknown as number)){
      throw new Error("please provide a id in your request url /id ");
    }

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
  res.send(await userStoreObject.index());
  next();
};

const show = async function (req: Request, res: Response, next: NextFunction) {
  if(!CheckIfNumberIsValid(req.params.id as string)){
    res.status(404);
    res.send("please provide a id, add to url /id");
    return;
  }
  res.send(await userStoreObject.show(req.params.id as unknown as number));
  next();
};

const create = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {

  if(!CheckIfStringIsValid(req.body.first_name as string)){
    res.status(404);
    res.send("please provide a first_name, add to body first_name");
    return;
  }
  if(!CheckIfStringIsValid(req.body.last_name as string)){
    res.status(404);
    res.send("please provide a last_name, add to body last_name");
    return;
  }
  if(!CheckIfStringIsValid(req.body.username as string)){
    res.status(404);
    res.send("please provide a username, add to body username");
    return;
  }
  if(!CheckIfStringIsValid(req.body.password as string)){
    res.status(404);
    res.send("please provide a password, add to body password");
    return;
  }
  //console.log(req.body);
  let newUser: User = {
    id: -1,
    first_name: req.body.first_name as string,
    last_name: req.body.last_name as string,
    username: req.body.username as string,
    password: req.body.password as string,
  };
  newUser = await userStoreObject.create(newUser);
  var token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);
  //console.log(token);
  res.send(token);
  next();
};
const signIn = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {

  if(!CheckIfStringIsValid(req.body.username as string)){
    res.status(404);
    res.send("please provide a username, add to body username");
    return;
  }
  if(!CheckIfStringIsValid(req.body.password as string)){
    res.status(404);
    res.send("please provide a password, add to body password");
    return;
  }
  const user = await userStoreObject.authenticate(
    req.body.username as string,
    req.body.password as string
  );
  if (user == null) {
    res.status(404);
    res.send('wrong username or password');
  } else {
    var token = jwt.sign(user, process.env.TOKEN_SECRET as string);
    res.send(token);
  }
  next();
};
const update = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if(!CheckIfNumberIsValid(req.params.id as unknown as number)){
    res.status(404);
    res.send("please provide a id, add to url /id");
    return;
  }
  if(!CheckIfStringIsValid(req.body.first_name as string)){
    res.status(404);
    res.send("please provide a first_name, add to body first_name");
    return;
  }
  if(!CheckIfStringIsValid(req.body.last_name as string)){
    res.status(404);
    res.send("please provide a last_name, add to body last_name");
    return;
  }
  if(!CheckIfStringIsValid(req.body.username as string)){
    res.status(404);
    res.send("please provide a username, add to body username");
    return;
  }
  if(!CheckIfStringIsValid(req.body.password as string)){
    res.status(404);
    res.send("please provide a new password, add to body password");
    return;
  }
  const newUser: User = {
    id: req.params.id as unknown as number,
    first_name: req.body.first_name as string,
    last_name: req.body.last_name as string,
    username: req.body.username as string,
    password: req.body.password as string,
  };
  res.send(await userStoreObject.update(newUser));
  next();
};

const destroy = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if(!CheckIfNumberIsValid(req.params.id as unknown as number)){
    res.status(404);
    res.send("please provide a id, add to url /id");
    return;
  }

  res.send(await userStoreObject.delete(req.params.id as unknown as number));
  next();
};

let app: express.Router = express.Router();
app.get('/users', bodyParser.json(), index);
app.get('/users/:id', bodyParser.json(), show);
app.post('/users/register', bodyParser.json(), create);
app.post('/users/signIn', bodyParser.json(), signIn);
app.put('/users/:id', bodyParser.json(), tokenVerifier, userIDverify, update);
app.delete(
  '/users/:id',
  bodyParser.json(),
  tokenVerifier,
  userIDverify,
  destroy
);

export default app;
