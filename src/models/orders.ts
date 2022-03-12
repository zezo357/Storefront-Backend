import client from '../database';

export type Order = {
  id: Number;
  status: String;
  user_id: Number;
};

export class orderStore {
  updateOrder(oldorder: Order, neworder: Order): Order {
    let temporder: Order = oldorder;
    for (const [key, value] of Object.entries(temporder)) {
      const temp = neworder[key as keyof Order];
      if (
        temp != null &&
        temp != undefined &&
        temp != temporder[key as keyof Order]
      ) {
        console.log(
          'key:',
          key,
          '|||| old value:',
          value,
          '|||| new value:',
          temp
        );
        temporder[key as keyof Order] = temp as Number & String;
      }
    }

    return temporder;
  }
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM Orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cant index Order ${err}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO Orders (status, user_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.status, order.user_id]);
      //const sql = `INSERT INTO orders (title, author, total_pages,type,summary) VALUES ('${order.title}', '${order.author}', ${order.total_pages},'${order.type}', '${order.summary}')`;
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant insert Order ${err}`);
    }
  }
  async add_product(
    quantity: Number,
    order_id: Number,
    product_id: Number
  ): Promise<void> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [order_id]);

      const order = result.rows[0];

      if (order.status !== 'open') {
        throw new Error(
          `Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, order_id, product_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${product_id} to order ${order_id}: ${err}`
      );
    }
  }
  async delete(id: Number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant delete order ${err}`);
    }
  }

  async show(id: Number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length != 0) {
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
    throw new Error(`no orders found with that id ${id}`);
  }
  async update(newOrder: Order): Promise<Order> {
    let oldOrder: Order = await this.show(newOrder.id);
    newOrder = this.updateOrder(oldOrder, newOrder);
    try {
      const conn = await client.connect();
      const sql = `Update orders set status='${newOrder.status}', user_id=${newOrder.user_id}   WHERE id=($1) `;
      //console.log(sql);
      //const sql = 'Update set title FROM  orders WHERE id=($1)';
      const result = await conn.query(sql, [newOrder.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant Update order ${err}`);
    }
  }
}
