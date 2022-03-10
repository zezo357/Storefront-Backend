import { Book, bookStore } from '../books';

describe('books Store', (): void => {
  const bookstoreObject = new bookStore();
  const newBook: Book = {
    id: '1',
    title: 'test',
    author: 'test',
    total_pages: '10',
    type: 'test',
    summary: 'test',
  };
  /*
  it('should have an index method', () => {
    expect(bookstoreObject.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(bookstoreObject.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(bookstoreObject.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(bookstoreObject.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(bookstoreObject.delete).toBeDefined();
  });
*/
  it('index is working', async (): Promise<void> => {
    expect(await bookstoreObject.index()).toEqual([]);
  });

  it('insert is working', async (): Promise<void> => {
    await bookstoreObject.insert(newBook);
    expect(await bookstoreObject.index()).toEqual([newBook]);
  });

  it('show is working', async (): Promise<void> => {
    expect(await bookstoreObject.show('1')).toEqual(newBook);
  });

  it('delete is working', async (): Promise<void> => {
    await bookstoreObject.delete('1');
    expect(await bookstoreObject.index()).toEqual([]);
  });
});
