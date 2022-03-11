import client from '../database';

export type Book = {
  id: Number;
  title: String;
  author: String;
  total_pages: Number;
  type: String;
  summary: String;
};

export class bookStore {
  updateBook(oldBook: Book, newBook: Book): Book {
    let tempBook: Book = oldBook;
    for (const [key, value] of Object.entries(tempBook)) {
      const temp = newBook[key as keyof Book];
      if (
        temp != null &&
        temp != undefined &&
        temp != tempBook[key as keyof Book]
      ) {
        console.log(
          'key:',
          key,
          '|||| old value:',
          value,
          '|||| new value:',
          temp
        );
        tempBook[key as keyof Book] = temp as Number & String;
      }
    }

    return tempBook;
  }
  async index(): Promise<Book[]> {
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
  async insert(book: Book): Promise<void> {
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
  async delete(id: Number): Promise<Book> {
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

  async show(id: Number): Promise<Book> {
    try {
      const sql = 'SELECT * FROM books WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length != 0) {
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
    throw new Error(`no books found with that id ${id}`);
  }
  async update(newBook: Book): Promise<Book> {
    let oldBook: Book = await this.show(newBook.id);
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
