import { Product, productStore } from '../products';

describe('Product Store', (): void => {
  const productStoreObject = new productStore();
  let newProduct: Product = {
    id: -1,
    name: 'test',
    price: 999,
  };

  it('Index: should contain empty list', async (): Promise<void> => {
    expect(await productStoreObject.index()).toEqual([]);
  });

  it('Create: should add product and index return list of 1 product', async (): Promise<void> => {
    newProduct.id = await (await productStoreObject.create(newProduct)).id;
    expect(await productStoreObject.index()).toEqual([newProduct]);
  });

  it('Show: shows Product details', async (): Promise<void> => {
    expect(await productStoreObject.show(newProduct.id)).toEqual(newProduct);
  });

  it('Update: changes name and price of product', async (): Promise<void> => {
    let updatedProduct: Product = {
      id: newProduct.id,
      name: 'the new test',
      price: 100,
    };
    await productStoreObject.update(updatedProduct)
    expect(await productStoreObject.show(updatedProduct.id)).toEqual(updatedProduct);
  });

  it('Delete: removes product and check if index return empty list', async (): Promise<void> => {
    await productStoreObject.delete(newProduct.id);
    expect(await productStoreObject.index()).toEqual([]);
  });
});
