import { DashboardQueries } from '../dashboard';
import { Product, productStore } from '../../models/products';
import { Order, orderStore } from '../../models/orders';
import { User, userStore } from '../../models/users';
describe('Dashboard Queries', (): void => {
    const productStoreObject = new productStore();
    const DashboardQueriesObject = new DashboardQueries();
    const orderStoreObject = new orderStore();
    const userStoreObject = new userStore();
    let registeredProducts:Product[]=[];
    let registeredOrders:Order[]=[];
    let registeredUsers:User[]=[];
    let MostExpensiveProducts:Product[]=[];
    let productsInOrders:{name: string, price: number, order_id: number }[]=[];
    let productsInOrdersWithProductIDs:{name: string, price: number, order_id: number,product_id: number}[]=[];
    const count:number =5;
    const random_prices=Array.from({length: count*1}, () => Math.floor(Math.random() * 100000));
    beforeAll(async function () {
    
        //// 1-create random product prices
        for(let i = 0; i < random_prices.length; i++){
            registeredProducts.push(await productStoreObject.create({id:-1, price: random_prices[i],name:'test'}));
        }
        registeredProducts.sort((a,b) => b.price-a.price);
        MostExpensiveProducts=registeredProducts.slice(0,count);
        ////end of 1
        //// 2-create random users
        for(let i = 0; i < random_prices.length; i++){
            const userString:string=`user ${random_prices[i]}`;
            registeredUsers.push(await userStoreObject.create(
            {id:-1,
                first_name:userString,
                last_name:userString,
                username: userString,
                password:userString
                }
            ));
        }
        ////end of 2
        //// 3-create random orders
        for(let i = 0; i < random_prices.length; i++){
            let userId:number =registeredUsers[Math.floor(Math.random() * random_prices.length)].id;
            //console.log(userId);
            registeredOrders.push(await orderStoreObject.create(
                {id:-1,
                    status:"open",
                    user_id: userId
                    }
                ));
        }
        ////end of 3
                //// 4-insert random products to orders
                for(let i = 0; i < random_prices.length; i++){
                    const indexOrder=Math.floor(Math.random() * random_prices.length)
                    const indexProduct=Math.floor(Math.random() * random_prices.length)
                    const orderID:number =registeredOrders[indexOrder].id;
                    const productID:number =registeredProducts[indexProduct].id;
                    //console.log(userId); 
                    productsInOrders.push({
                        name:registeredProducts[indexProduct].name,
                        price:registeredProducts[indexProduct].price,
                        order_id:orderID,
                    }
                    )
                    productsInOrdersWithProductIDs.push({
                        name:registeredProducts[indexProduct].name,
                        price:registeredProducts[indexProduct].price,
                        product_id:registeredProducts[indexProduct].id,
                        order_id:orderID,
                    }
                    )
                    await orderStoreObject.add_product(1,orderID,productID);
                   
                }
                ////end of 4

    });
      

  it(`MostExpensiveProducts: should return ${count} most expensive products`, async (): Promise<void> => {
    expect(await DashboardQueriesObject.MostExpensiveProducts(count)).toEqual(MostExpensiveProducts);
  });

  it('productsInOrders: should return products that exist in orders', async (): Promise<void> => {
      const productsInOrdersQuery:{name: string; price: number; order_id: number }[]=await DashboardQueriesObject.productsInOrders();
      productsInOrdersQuery.sort((a,b) => b.price-a.price);
      productsInOrders.sort((a,b) => b.price-a.price);
    expect(productsInOrdersQuery).toEqual(productsInOrders);
  });
  
  afterAll(async function () {    
    for(let i = 0; i < productsInOrdersWithProductIDs.length; i++){
        await orderStoreObject.remove_product(productsInOrdersWithProductIDs[i].order_id,productsInOrdersWithProductIDs[i].product_id);
    }
    for(let i = 0; i < registeredOrders.length; i++){
        await orderStoreObject.delete(registeredOrders[i].id);
    }
    for(let i = 0; i < registeredUsers.length; i++){
        await userStoreObject.delete(registeredUsers[i].id);
    }
    for(let i = 0; i < registeredProducts.length; i++){
        await productStoreObject.delete(registeredProducts[i].id);
    }
    




});
});
