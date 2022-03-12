import express, { Request, Response } from 'express';
import cors from 'cors';
import usersRoutes from './handlers/users';
const app: express.Application = express();
const address: string = 'localhost:3000';

/*
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));*/
const router = express.Router();
router.use('/', (req: express.Request, res: express.Response, next): void => {
  console.log(`${req.path} Was visited`);
  next();
});

app.use('/', router);

app.use('/', usersRoutes);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
