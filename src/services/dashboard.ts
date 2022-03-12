import client from '../database';
import {Product} from '../models/products';
export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<{ name: string; price: number; order_id: number }[]
  > {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        'SELECT name, price, order_id FROM products as product INNER JOIN order_products ON product.id = order_products.product_id';


        const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
  async MostExpensiveProducts(count: number): Promise<Product[]> 
   {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        `SELECT name, price, id FROM products order by price Desc LIMIT ${count}`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products: ${err}`);
    }
  }
}
