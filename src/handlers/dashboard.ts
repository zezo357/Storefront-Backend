import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboardRoutes = (app: express.Application) => {
  app.get('/products_in_orders', productsInOrders),
    app.get('/highest_five_products/:count', fiveMostExpensiveProducts);
};

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};

const fiveMostExpensiveProducts = async (req: Request, res: Response) => {
  const products = await dashboard.MostExpensiveProducts(req.params.count as unknown as number);
  res.json(products);
};

export default dashboardRoutes;
