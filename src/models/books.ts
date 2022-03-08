import client from '../database';

export type book = {
  id: String;
  title: String;
  author: String;
  total_pages: String;
  type: String;
  summary: String;
};

export class bookstore {
  updateBook(oldBook: book, newBook: book): book {
    let tempBook: book = oldBook;
    for (const [key, value] of Object.entries(tempBook)) {
      const temp = newBook[key as keyof book];
      if (
        temp != null &&
        temp != undefined &&
        temp != tempBook[key as keyof book]
      ) {
        console.log(
          'key:',
          key,
          '|||| old value:',
          value,
          '|||| new value:',
          temp
        );
        tempBook[key as keyof book] = temp;
      }
    }

    return tempBook;
  }
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
        'INSERT INTO books (title, author, total_pages, summary,type) VALUES($1, $2, $3, $4,$5) RETURNING *';
      const result = await conn.query(sql, [
        book.title,
        book.author,
        book.total_pages,
        book.summary,
        book.type,
      ]);
      //const sql = `INSERT INTO books (title, author, total_pages,type,summary) VALUES ('${book.title}', '${book.author}', ${book.total_pages},'${book.type}', '${book.summary}')`;
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant insert book ${err}`);
    }
  }
  async delete(id: String): Promise<book> {
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

  async show(id: String): Promise<book> {
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
  async update(newBook: book): Promise<book> {
    let oldBook: book = await this.show(newBook.id);
    newBook = this.updateBook(oldBook, newBook);
    try {
      const conn = await client.connect();
      const sql = `Update books set title='${newBook.title}', author='${newBook.author}', total_pages=${newBook.total_pages},type='${newBook.type}',summary='${newBook.summary}'   WHERE id=($1) `;
      //console.log(sql);
      //const sql = 'Update set title FROM  books WHERE id=($1)';
      const result = await conn.query(sql, [newBook.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cant Update book ${err}`);
    }
  }
}
