import { book, bookstore } from '../books';

describe('books Store', (): void => {
  const bookstoreObject = new bookstore();
  const newBook: book = {
    id: 1,
    title: 'test',
    author: 'test',
    total_pages: 10,
    type: 'test',
    summary: 'test',
  };
  it('index is working', async (): Promise<void> => {
    expect(await bookstoreObject.index()).toEqual([]);
  });

  it('insert is working', async (): Promise<void> => {

    await bookstoreObject.insert(newBook);
    expect(await bookstoreObject.index()).toEqual([newBook]);
  });

  it('show is working', async (): Promise<void> => {
    expect(await bookstoreObject.show(1)).toEqual(newBook);
  });

  it('delete is working', async (): Promise<void> => {
    await bookstoreObject.delete(1);
    expect(await bookstoreObject.index()).toEqual([]);
  });
});
