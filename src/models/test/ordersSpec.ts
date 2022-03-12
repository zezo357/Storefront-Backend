import { Order, orderStore } from '../orders';
import { User, userStore } from '../users';

describe('orders Store', (): void => {
  const orderStoreObject = new orderStore();
  const userStoreObject = new userStore();
  let newUser: User = {
    id: -1,
    first_name: 'test',
    last_name: 'test',
    username: 'test',
    password: 'testQUEW',
  };
  let newOrder: Order = {
    id: -1,
    status: 'test',
    user_id: newUser.id,
  };
  let exceptedOrderObject = jasmine.objectContaining({
    id: newOrder.id,
    status: newOrder.status,
    user_id: newOrder.user_id,
  });
  beforeAll(async function () {
    //creating test user to add new order to
    newUser = await userStoreObject.create(newUser);
    //over riding with new user id
    newOrder = {
      id: -1,
      status: 'test',
      user_id: newUser.id,
    };
  });

  it('index is working', async (): Promise<void> => {
    expect(await orderStoreObject.index()).toEqual([]);
  });

  it('insert is working', async (): Promise<void> => {
    newOrder.id = await (await orderStoreObject.create(newOrder)).id;
    expect(await orderStoreObject.index()).toEqual([newOrder]);
  });

  it('show is working', async (): Promise<void> => {
    expect(await orderStoreObject.show(1)).toEqual(newOrder);
  });

  it('delete is working', async (): Promise<void> => {
    await orderStoreObject.delete(newOrder.id);
    expect(await orderStoreObject.index()).toEqual([]);
  });

  afterAll(async function () {
    //deleting test user
    await userStoreObject.delete(newUser.id);
  });
});
