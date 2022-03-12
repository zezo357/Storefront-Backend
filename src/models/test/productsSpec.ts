import { Product, productStore } from '../products';

describe('Product Store', (): void => {
  const productStoreObject = new productStore();
  let newProduct: Product = {
    id: -1,
    name: 'test',
    price: 999,
  };

  it('Index', async (): Promise<void> => {
    expect(await productStoreObject.index()).toEqual([]);
  });

  it('Create', async (): Promise<void> => {
    newProduct.id = await (await productStoreObject.create(newProduct)).id;
    expect(await productStoreObject.index()).toEqual([newProduct]);
  });

  it('Show', async (): Promise<void> => {
    expect(await productStoreObject.show(1)).toEqual(newProduct);
  });

  it('Delete', async (): Promise<void> => {
    await productStoreObject.delete(newProduct.id);
    expect(await productStoreObject.index()).toEqual([]);
  });
});
