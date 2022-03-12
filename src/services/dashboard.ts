import Client from '../database';

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
  async fiveMostExpensiveProducts(): Promise<
    { name: string; price: number; order_order_id: string }[]
  > {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, order_id FROM products order by price Desc LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}
