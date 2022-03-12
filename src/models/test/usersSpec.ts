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
    id: number;
    first_name: string;
    last_name: string;
    username: string;
  }> = jasmine.objectContaining({
    id: newUser.id,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    username: newUser.username,
  });

  let updatedUser: User;

  it('Index: should contain empty list', async (): Promise<void> => {
    expect(await userStoreObject.index()).toEqual([]);
  });

  it('Create: should add User and index return list of 1 user', async (): Promise<void> => {
    newUser.id = await (await userStoreObject.create(newUser)).id;
    exceptedUserObject = jasmine.objectContaining({
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
    });
    expect(await userStoreObject.index()).toEqual([exceptedUserObject]);
  });

  it('Show: should show user details', async (): Promise<void> => {
    expect(await userStoreObject.show(newUser.id)).toEqual(exceptedUserObject);
  });

  it('Authenticate with right password should return user', async (): Promise<void> => {
    expect(
      (await userStoreObject.authenticate(
        newUser.username,
        newUser.password
      )) != null
    ).toEqual(true);
  });
  it('Authenticate with wrong password should return null', async (): Promise<void> => {
    expect(
      await userStoreObject.authenticate(newUser.username, 'wrong password')
    ).toEqual(null);
  });

  it('Update: should update user details', async (): Promise<void> => {
    updatedUser= {
      id: newUser.id,
      first_name: 'the unknown ',
      last_name: 'can be known',
      username: 'if only we',
      password: 'try',
    };
    exceptedUserObject = jasmine.objectContaining({
      id: updatedUser.id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      username: updatedUser.username,
    });
    await userStoreObject.update(updatedUser)
    expect(await userStoreObject.show(updatedUser.id)).toEqual(exceptedUserObject);
  });

  it('Authenticate with old right password should return null', async (): Promise<void> => {
    expect(
      (await userStoreObject.authenticate(
        newUser.username,
        newUser.password
      )) == null
    ).toEqual(true);
  });

  it('Authenticate with new right password should return user', async (): Promise<void> => {
    expect(
      (await userStoreObject.authenticate(
        updatedUser.username,
        updatedUser.password
      )) != null
    ).toEqual(true);
  });

  it('Delete: removes user and check if index return empty list', async (): Promise<void> => {
    await userStoreObject.delete(newUser.id);
    expect(await userStoreObject.index()).toEqual([]);
  });
});
