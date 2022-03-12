import client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
};

export class productStore {
  updateProduct(oldProduct: Product, newProduct: Product): Product {
    let tempProduct: Product = oldProduct;
    for (const [key, value] of Object.entries(tempProduct)) {
      const temp = newProduct[key as keyof Product];
      if (
        temp != null &&
        temp != undefined &&
        temp != tempProduct[key as keyof Product]
      ) {
        console.log(
          'key:',
          key,
          '|||| old value:',
          value,
          '|||| new value:',
          temp
        );
        tempProduct[key as keyof Product] = temp as number & string;
      }
    }

    return tempProduct;
  }
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cant index products ${err}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [product.name, product.price]);
      //const sql = `INSERT INTO products (title, author, total_pages,type,summary) VALUES ('${product.title}', '${product.author}', ${product.total_pages},'${product.type}', '${product.summary}')`;
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant insert product ${err}`);
    }
  }
  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant delete product ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length != 0) {
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
    throw new Error(`no products found with that id ${id}`);
  }
  async update(newProduct: Product): Promise<Product> {
    let oldProduct: Product = await this.show(newProduct.id);
    newProduct = this.updateProduct(oldProduct, newProduct);
    try {
      const conn = await client.connect();
      const sql = `Update products set name='${newProduct.name}', price=${newProduct.price}   WHERE id=($1) `;
      //console.log(sql);
      //const sql = 'Update set title FROM  products WHERE id=($1)';
      const result = await conn.query(sql, [newProduct.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant Update product ${err}`);
    }
  }
}
