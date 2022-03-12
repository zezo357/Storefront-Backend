import { Order, orderStore } from '../orders';
import { User, userStore } from '../users';
import { Product, productStore } from '../products';
describe('Orders Store', (): void => {
  const orderStoreObject = new orderStore();
  const userStoreObject = new userStore();
  const productStoreObject = new productStore();
  let newUser: User = {
    id: -1,
    first_name: 'test',
    last_name: 'test',
    username: 'test',
    password: 'testQUEW',
  };
  let newOrder: Order = {
    id: -1,
    status: 'open',
    user_id: newUser.id,
  };
  let testProduct: Product = {
    id: -1,
    name: 'test',
    price: 999,
  };

  beforeAll(async function () {
    //creating test user to add new order to
    newUser = await userStoreObject.create(newUser);
    //over riding with new user id
    newOrder = {
      id: -1,
      status: 'open',
      user_id: newUser.id,
    };
    //add new product
    testProduct = await productStoreObject.create(testProduct);
  });

  it('Index: should contain empty list', async (): Promise<void> => {
    expect(await orderStoreObject.index()).toEqual([]);
  });

  it('Create: should add order and index return list of 1 order', async (): Promise<void> => {
    newOrder.id = await (await orderStoreObject.create(newOrder)).id;
    expect(await orderStoreObject.index()).toEqual([newOrder]);
  });

  it('Show: should show order details', async (): Promise<void> => {
    expect(await orderStoreObject.show(newOrder.id)).toEqual(newOrder);
  });

  it('add_product: should add product to order', async (): Promise<void> => {
    expect(
      await orderStoreObject.add_product(1, newOrder.id, testProduct.id)
    ).toEqual(
      jasmine.objectContaining({
        quantity: 1,
        order_id: newOrder.id,
        product_id: testProduct.id,
      })
    );
  });

  it('get_products_ids: should return ids of products in order', async (): Promise<void> => {
    expect(await orderStoreObject.get_products_ids(newOrder.id)).toEqual([
      jasmine.objectContaining({ product_id: testProduct.id }),
    ]);
  });

  it('remove_product: should remove product from order', async (): Promise<void> => {
    await orderStoreObject.remove_product(newOrder.id, testProduct.id);
    expect(await orderStoreObject.get_products_ids(newOrder.id)).toEqual([]);
  });

  it('Update: should change status of order to closed', async (): Promise<void> => {
    let updatedOrder: Order = {
      id: newOrder.id,
      status: 'closed',
      user_id: newUser.id,
    };
    await orderStoreObject.update(updatedOrder);
    expect(await orderStoreObject.show(newOrder.id)).toEqual(updatedOrder);
  });

  it('Delete: should remove order and check if index return empty list', async (): Promise<void> => {
    await orderStoreObject.delete(newOrder.id);
    expect(await orderStoreObject.index()).toEqual([]);
  });

  afterAll(async function () {
    //deleting test user
    await userStoreObject.delete(newUser.id);
    await productStoreObject.delete(testProduct.id);
  });
});
