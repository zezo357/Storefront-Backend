import express, { Request, Response } from 'express';
import { CheckIfStringIsValid, CheckIfNumberIsValid } from '../utils/util';

import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  try {
const products = await dashboard.productsInOrders();
  res.json(products);
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
  
};

const fiveMostExpensiveProducts = async (req: Request, res: Response) => {
  if (!CheckIfNumberIsValid(req.params.count as unknown as number)) {
    res.status(404);
    res.send("please provide a count, add to your url '/count'");
    return;
  }
  try {
const products = await dashboard.MostExpensiveProducts(
    req.params.count as unknown as number
  );
  res.json(products);
  } catch (error) {
    res.status(404);
    res.json(error);
    return;
  }
  
};

let app: express.Router = express.Router();
app.get('/products_in_orders', productsInOrders),
  app.get('/highest_five_products/:count', fiveMostExpensiveProducts);

export default app;
