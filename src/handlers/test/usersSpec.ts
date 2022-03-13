import app from '../../index';
import supertest from 'supertest';
import { User, userStore } from '../../models/users';
import jwt from 'jsonwebtoken';
const request = supertest(app);

describe('users endpoint responses', (): void => {
  const userStoreObject = new userStore();
  let token_that_got_returned: string = '';
  let newUser: User = {
    id: -1,
    first_name: 'test',
    last_name: 'test',
    username: 'test2',
    password: 'testQUEW',
  };

  beforeAll(async (): Promise<void> => {
    //creating test user just to be sure to check next id
    //newUser = await userStoreObject.create(newUser);
    //await userStoreObject.delete(newUser.id);
  });

  it('getting users endpoint (index)', (done: DoneFn): void => {
    request.get(`/users`).end(async function (_err, res: supertest.Response) {
      //check the response status
      expect(res.status).toBe(200);
      expect(res.body).toEqual(await userStoreObject.index());
      done();
    });
  });

  it('getting users endpoint (Create)', (done: DoneFn): void => {
    request
      .post(`/users/register`)
      .send(newUser)
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        //console.log(res.text);
        let token = res.text as string;
        token_that_got_returned = token;
        try {
          jwt.verify(token, process.env.TOKEN_SECRET as string);
          const decodedToken = jwt.decode(token) as User;
          //console.log(decodedToken);
          newUser.id = decodedToken.id;
          //console.log(newUser.id);
          expect(true).toEqual(true);
        } catch {
          expect('INVALID TOKEN').toEqual('false');
        }

        expect(await userStoreObject.show(newUser.id)).toEqual(
          jasmine.objectContaining({
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            username: newUser.username,
          })
        );

        done();
      });
  });
  it('getting users endpoint (signIn)', (done: DoneFn): void => {
    request
      .post(`/users/signIn`)
      .send(newUser)
      .end(function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        //console.log(res.text);
        let token = res.text as string;
        token_that_got_returned = token;
        try {
          jwt.verify(token, process.env.TOKEN_SECRET as string);
          const decodedToken = jwt.decode(token) as User;
          //console.log(decodedToken);
          newUser.id = decodedToken.id;
          //console.log(newUser.id);
          expect(true).toEqual(true);
        } catch {
          expect('INVALID TOKEN').toEqual('false');
        }
        done();
      });
  });

  it('getting users endpoint (show)', (done: DoneFn): void => {
    request
      .get(`/users/${newUser.id}`)
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        const ShownUser: User = await userStoreObject.show(newUser.id);
        expect(res.body).toEqual(
          jasmine.objectContaining({
            id: ShownUser.id,
            first_name: ShownUser.first_name,
            last_name: ShownUser.last_name,
            username: ShownUser.username,
          })
        );
        done();
      });
  });
  it('getting users endpoint (update)', (done: DoneFn): void => {
    request
      .put(`/users/${newUser.id}`)
      .send({
        first_name: 'the unknown ',
        last_name: 'can be known',
        username: 'if only we',
        password: 'try',
      })
      .set({ Authorization: token_that_got_returned })
      .end(async function (_err, res: supertest.Response) {
        //console.log(res.text);
        //check the response status
        expect(res.status).toBe(200);
        newUser = await userStoreObject.show(newUser.id);
        expect(res.body).toEqual(
          jasmine.objectContaining({
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            username: newUser.username,
          })
        );
        done();
      });
  });

  it('getting users endpoint (delete)', (done: DoneFn): void => {
    request
      .delete(`/users/${newUser.id}`)
      .set({ Authorization: token_that_got_returned })
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
          jasmine.objectContaining({
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            username: newUser.username,
          })
        );
        done();
      });
  });
  afterAll(async (): Promise<void> => {});
});
