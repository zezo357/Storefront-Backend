import { User, userStore } from '../users';

describe('users Store', (): void => {
  const userStoreObject = new userStore();


  const newUser: User = {
    id: 1,
    first_name: 'test',
    last_name: 'test',
    username: 'test',
    password: 'testQUEW',
  };
 
  it('index is working', async (): Promise<void> => {
    expect(await userStoreObject.index()).toEqual([]);
  });

  it('insert is working', async (): Promise<void> => {
    await userStoreObject.insert(newUser);
    expect(await userStoreObject.index()).toEqual([jasmine.objectContaining({
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.username,
      })]);
  });

  it('show is working', async (): Promise<void> => {
    expect(await userStoreObject.show(1)).toEqual(jasmine.objectContaining({
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.username,
      }));
  });

  
  it('authenticate is right password', async (): Promise<void> => {
    expect( (await userStoreObject.authenticate(newUser.username,newUser.password)) !=null).toEqual(true);
   
  });
  it('authenticate is wrong password', async (): Promise<void> => {
    expect(await userStoreObject.authenticate(newUser.username,"lasdj")).toEqual(null);
  });

  it('delete is working', async (): Promise<void> => {
    await userStoreObject.delete(newUser.id);
    expect(await userStoreObject.index()).toEqual([]);
  });
});
