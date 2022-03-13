import app from '../../index';
import supertest from 'supertest';
import { User, userStore } from '../../models/users';
import { Order, orderStore } from '../../models/orders';
import { Product, productStore } from '../../models/products';
import jwt from 'jsonwebtoken';
const request = supertest(app);


describe('products endpoint responses', (): void => {
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
    });

  it('getting products endpoint (index)', (done: DoneFn): void => {
    request.get(`/products`).end(async function (_err, res: supertest.Response) {
      //check the response status
      expect(res.status).toBe(200);
      expect(res.body).toEqual(await productStoreObject.index());
      done();
    });
  });

  it('getting products endpoint (Create)', (done: DoneFn): void => {

    request
      .post(`/products`)
      .send({
        user_id: newUser.id,
        name: newProduct.name, 
        price: newProduct.price
    })
    .set({'Authorization':token_that_got_returned})
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        //console.log(res.body);
        newProduct.id=res.body.id;
        expect(res.body).toEqual(
          await productStoreObject.show(newProduct.id)
        );

        done();
      });
  });

  it('getting products endpoint (show)', (done: DoneFn): void => {
    request
      .get(`/products/${newProduct.id}`)
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            await productStoreObject.show(newProduct.id)
        );
        done();
      });
  });

  
  it('getting products endpoint (update)', (done: DoneFn): void => {
    request
      .put(`/products/${newProduct.id}`)
      .send({
        user_id: newUser.id,
        name: "new test", 
        price: 550000
      }).set({'Authorization':token_that_got_returned})
      .end(async function (_err, res: supertest.Response) {
        //console.log(res.body);
        //check the response status
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
          jasmine.objectContaining({
            id: newProduct.id,
            name: "new test", 
            price: 550000
          
    })
        );

        newProduct = await productStoreObject.show(newProduct.id);
        expect(newProduct).toEqual(
          jasmine.objectContaining({
            id: newProduct.id,
            name: "new test", 
            price: 550000
          })
        );
       
        done();
      });
  });

  it('getting products endpoint (delete)', (done: DoneFn): void => {
    request
      .delete(`/products/${newProduct.id}`)
      .send({
        user_id: newUser.id,
      })
      .set({'Authorization':token_that_got_returned})
      .end(async function (_err, res: supertest.Response) {
        //check the response status
        expect(res.status).toBe(200);
        expect(await productStoreObject.index()).toEqual([]);
        done();
      });
  });

 
  afterAll(async (): Promise<void> => {
    request
    
    const postRes =await request
    .delete(`/users/${newUser.id}`)
    .set({'Authorization':token_that_got_returned});

        //check the response status
        expect(postRes.status).toBe(200);
        expect(postRes.body).toEqual(
        jasmine.objectContaining({
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.username,
        })
        );
});
  
});
