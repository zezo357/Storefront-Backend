import { User, userStore } from '../users';

describe('Users Store', (): void => {
  const userStoreObject = new userStore();

  let newUser: User = {
    id: -1,
    first_name: 'test',
    last_name: 'test',
    username: 'test2',
    password: 'testQUEW',
  };
  let exceptedUserObject: jasmine.ObjectContaining<{
    id: Number;
    first_name: string;
    last_name: string;
    username: string;
  }> = jasmine.objectContaining({
    id: newUser.id,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    username: newUser.username,
  });
  it('Index', async (): Promise<void> => {
    expect(await userStoreObject.index()).toEqual([]);
  });

  it('Create', async (): Promise<void> => {
    newUser.id = await (await userStoreObject.create(newUser)).id;
    exceptedUserObject = jasmine.objectContaining({
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
    });
    expect(await userStoreObject.index()).toEqual([exceptedUserObject]);
  });

  it('Show', async (): Promise<void> => {
    expect(await userStoreObject.show(newUser.id)).toEqual(exceptedUserObject);
  });

  it('Authenticate with right password', async (): Promise<void> => {
    expect(
      (await userStoreObject.authenticate(
        newUser.username,
        newUser.password
      )) != null
    ).toEqual(true);
  });
  it('Authenticate with wrong password', async (): Promise<void> => {
    expect(
      await userStoreObject.authenticate(newUser.username, 'wrong password')
    ).toEqual(null);
  });

  it('Delete', async (): Promise<void> => {
    await userStoreObject.delete(newUser.id);
    expect(await userStoreObject.index()).toEqual([]);
  });
});
