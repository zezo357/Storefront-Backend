import { Product, productStore } from '../products';

describe('product Store', (): void => {
  const productStoreObject = new productStore();
  let newProduct: Product = {
    id: -1,
    name: 'test',
    price: 999,
  };

  it('index is working', async (): Promise<void> => {
    expect(await productStoreObject.index()).toEqual([]);
  });

  it('insert is working', async (): Promise<void> => {
    newProduct.id = await (await productStoreObject.create(newProduct)).id;
    expect(await productStoreObject.index()).toEqual([newProduct]);
  });

  it('show is working', async (): Promise<void> => {
    expect(await productStoreObject.show(1)).toEqual(newProduct);
  });

  it('delete is working', async (): Promise<void> => {
    await productStoreObject.delete(newProduct.id);
    expect(await productStoreObject.index()).toEqual([]);
  });
});
