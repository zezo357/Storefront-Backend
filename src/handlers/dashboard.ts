import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboardRoutes = (app: express.Application) => {
  app.get('/products_in_orders', productsInOrders),
    app.get('/highest_five_products', fiveMostExpensiveProducts);
};

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};

const fiveMostExpensiveProducts = async (_req: Request, res: Response) => {
  const products = await dashboard.MostExpensiveProducts(5);
  res.json(products);
};

export default dashboardRoutes;
