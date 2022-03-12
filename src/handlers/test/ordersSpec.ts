import app from '../../index';
import supertest from 'supertest';
import { User, userStore } from '../../models/users';
import { Order, orderStore } from '../../models/orders';
import { Product, productStore } from '../../models/products';
import jwt from 'jsonwebtoken';
const request = supertest(app);


describe('orders endpoint responses', (): void => {
    const orderStoreObject = new orderStore();
    const userStoreObject = new userStore();
    const productStoreObject = new productStore();
    let token_that_got_returned:string;
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
        await request
        .post(`/users/register`)
        .send(newUser)
        .end(async function (_err, res: supertest.Response) {
            const token:string= res.text as string;
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
          token_that_got_returned=token;
        });

      //over riding with new user id
      newOrder = {
        id: -1,
        status: 'open',
        user_id: newUser.id,
      };
      //add new product
      testProduct = await productStoreObject.create(testProduct);
    });

  it('getting orders endpoint (index)', (done: DoneFn): void => {
    request.get(`/orders`).end(async function (_err, res: supertest.Response) {
      //check the response status
      expect(res.status).toBe(200);
      expect(res.body).toEqual(await orderStoreObject.index());
      done();
    });
  });

  it('getting orders endpoint (Create)', (done: DoneFn): void => {
    request
      .post(`/orders/register`)
      .send(newUser)
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        //console.log(res.text);
        let token = res.text as string;
        token_that_got_returned=token;
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
        token_that_got_returned=token;
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
      .put(`/users`)
      .send({
        id: newUser.id,
        first_name: 'the unknown ',
        last_name: 'can be known',
        username: 'if only we',
        password: 'try',
      }).set({'Authorization':token_that_got_returned})
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
      .delete(`/users`)
      .send({id:newUser.id})
      .set({'Authorization':token_that_got_returned})
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
