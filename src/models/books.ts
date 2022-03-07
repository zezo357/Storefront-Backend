import client from '../index';

export type book = {
  id: Number;
  title: String;
  author: String;
  total_pages: Number;
  type: String;
  summary: String;
};

export class bookstore {
  async index(): Promise<book[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM books';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cant index books ${err}`);
    }
  }
  async insert(book: book): Promise<void> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        book.title,
        book.author,
        book.total_pages,
        book.summary,
      ]);
      //const sql = `INSERT INTO books (title, author, total_pages,type,summary) VALUES ('${book.title}', '${book.author}', ${book.total_pages},'${book.type}', '${book.summary}')`;
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant insert book ${err}`);
    }
  }
  async delete(id: number): Promise<book> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM books WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant delete book ${err}`);
    }
  }
  async show(id: string): Promise<book> {
    try {
      const sql = 'SELECT * FROM books WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }
}
