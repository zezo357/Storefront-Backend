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
    const testQuantity:number =1;
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
    let newProduct: Product = {
      id: -1,
      name: 'test',
      price: 999,
    };
  
    beforeAll(async function () {
      const postRes =await request
        .post(`/users/register`)
        .send(newUser);

        const token:string= postRes.text as string;
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
        

      //over riding with new user id
      newOrder = {
        id: -1,
        status: 'open',
        user_id: newUser.id,
      };
      //add new product
      newProduct = await productStoreObject.create(newProduct);
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
      .post(`/orders/`)
      .send({
        status: newOrder.status,
        user_id: newUser.id,
    })
    .set({'Authorization':token_that_got_returned})
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        //console.log(res.body);
        newOrder.id=res.body.id;
        expect(res.body).toEqual(
          await orderStoreObject.show(newOrder.id)
        );

        done();
      });
  });

  it('getting orders endpoint (show)', (done: DoneFn): void => {
    request
      .get(`/orders/${newOrder.id}`)
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
          await orderStoreObject.show(newOrder.id)
        );
        done();
      });
  });

  it('getting orders endpoint (Add product)', (done: DoneFn): void => {
    request
      .post(`/orders/add_product/${newOrder.id}`)
      .send({
      
        testQuantity:testQuantity,
        product_id: newProduct.id,
        user_id: newUser.id,
    })
    .set({'Authorization':token_that_got_returned})
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        //console.log(res.body);
        expect(res.body).toEqual(
          jasmine.objectContaining({
            quantity: testQuantity,
            order_id: newOrder.id,
            product_id: newProduct.id
          })
        );
        //check if same product exists in the order after it has been added
        expect((await orderStoreObject.get_products_ids(newOrder.id)).map(a => a.product_id)).toContain(
          res.body.product_id
        );
        done();
      });
  });
  it('getting orders endpoint (Remove product)', (done: DoneFn): void => {
    request
      .post(`/orders/remove_product/${newOrder.id}`)
      .send({
        product_id: newProduct.id,
        user_id: newUser.id,
    })
    .set({'Authorization':token_that_got_returned})
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        //console.log(res.body);
        expect(res.body).toEqual(
          jasmine.objectContaining({
            quantity: testQuantity,
            order_id: newOrder.id,
            product_id: newProduct.id
          })
        );
        //check if same product exists in the order after it has been added
        expect((await orderStoreObject.get_products_ids(newOrder.id)).map(a => a.product_id)).toEqual(
          []
        );
        done();
      });
  });
  
  it('getting orders endpoint (update)', (done: DoneFn): void => {
    request
      .put(`/orders/${newOrder.id}`)
      .send({
        user_id: newUser.id,
        status: 'closed',
      }).set({'Authorization':token_that_got_returned})
      .end(async function (_err, res: supertest.Response) {
          //console.log(res.text);
        //check the response status
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
          jasmine.objectContaining({
            id: newOrder.id,
            status:'closed',
            user_id:newUser.id
          })
        );
        newOrder = await orderStoreObject.show(newOrder.id);
        expect(newOrder).toEqual(
          jasmine.objectContaining({
            id: newOrder.id,
            status:'closed',
            user_id:newUser.id

          })
        );
       
        done();
      });
  });

  it('getting users endpoint (delete)', (done: DoneFn): void => {
    request
      .delete(`/orders/${newOrder.id}`)
      .send({
        user_id: newUser.id,
      })
      .set({'Authorization':token_that_got_returned})
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        expect(await orderStoreObject.index()).toEqual([]);
        done();
      });
  });
  afterAll(async (): Promise<void> => {});
});
