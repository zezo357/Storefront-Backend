"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var products_1 = require("../../models/products");
var orders_1 = require("../../models/orders");
var users_1 = require("../../models/users");
var index_1 = __importDefault(require("../../index"));
var supertest_1 = __importDefault(require("supertest"));
var dashboard_1 = require("../../services/dashboard");
var dashboard = new dashboard_1.DashboardQueries();
var request = (0, supertest_1.default)(index_1.default);
describe('Dashboard Routes responses', function () {
    var productStoreObject = new products_1.productStore();
    var orderStoreObject = new orders_1.orderStore();
    var userStoreObject = new users_1.userStore();
    var registeredProducts = [];
    var registeredOrders = [];
    var registeredUsers = [];
    var MostExpensiveProducts = [];
    var productsInOrders = [];
    var productsInOrdersWithProductIDs = [];
    var count = 5;
    var random_prices = Array.from({ length: count * 1 }, function () {
        return Math.floor(Math.random() * 100000);
    });
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, _a, _b, i, userString, _c, _d, i, userId, _e, _f, i, indexOrder, indexProduct, orderID, productID;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        i = 0;
                        _g.label = 1;
                    case 1:
                        if (!(i < random_prices.length)) return [3 /*break*/, 4];
                        _b = (_a = registeredProducts).push;
                        return [4 /*yield*/, productStoreObject.create({
                                id: -1,
                                price: random_prices[i],
                                name: 'test',
                            })];
                    case 2:
                        _b.apply(_a, [_g.sent()]);
                        _g.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        registeredProducts.sort(function (a, b) { return b.price - a.price; });
                        MostExpensiveProducts = registeredProducts.slice(0, count);
                        i = 0;
                        _g.label = 5;
                    case 5:
                        if (!(i < random_prices.length)) return [3 /*break*/, 8];
                        userString = "user ".concat(random_prices[i]);
                        _d = (_c = registeredUsers).push;
                        return [4 /*yield*/, userStoreObject.create({
                                id: -1,
                                first_name: userString,
                                last_name: userString,
                                username: userString,
                                password: userString,
                            })];
                    case 6:
                        _d.apply(_c, [_g.sent()]);
                        _g.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8:
                        i = 0;
                        _g.label = 9;
                    case 9:
                        if (!(i < random_prices.length)) return [3 /*break*/, 12];
                        userId = registeredUsers[Math.floor(Math.random() * random_prices.length)].id;
                        //console.log(userId);
                        _f = (_e = registeredOrders).push;
                        return [4 /*yield*/, orderStoreObject.create({
                                id: -1,
                                status: 'open',
                                user_id: userId,
                            })];
                    case 10:
                        //console.log(userId);
                        _f.apply(_e, [_g.sent()]);
                        _g.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 9];
                    case 12:
                        i = 0;
                        _g.label = 13;
                    case 13:
                        if (!(i < random_prices.length)) return [3 /*break*/, 16];
                        indexOrder = Math.floor(Math.random() * random_prices.length);
                        indexProduct = Math.floor(Math.random() * random_prices.length);
                        orderID = registeredOrders[indexOrder].id;
                        productID = registeredProducts[indexProduct].id;
                        //console.log(userId);
                        productsInOrders.push({
                            name: registeredProducts[indexProduct].name,
                            price: registeredProducts[indexProduct].price,
                            order_id: orderID,
                        });
                        productsInOrdersWithProductIDs.push({
                            name: registeredProducts[indexProduct].name,
                            price: registeredProducts[indexProduct].price,
                            product_id: registeredProducts[indexProduct].id,
                            order_id: orderID,
                        });
                        return [4 /*yield*/, orderStoreObject.add_product(1, orderID, productID)];
                    case 14:
                        _g.sent();
                        _g.label = 15;
                    case 15:
                        i++;
                        return [3 /*break*/, 13];
                    case 16: return [2 /*return*/];
                }
            });
        });
    });
    it("MostExpensiveProducts: should return ".concat(count, " most expensive products"), function (done) {
        request
            .get("/highest_five_products/".concat(count))
            .end(function (_err, res) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            //check the response status
                            expect(res.status).toBe(200);
                            _b = (_a = expect(res.body)).toEqual;
                            return [4 /*yield*/, dashboard.MostExpensiveProducts(count)];
                        case 1:
                            _b.apply(_a, [_c.sent()]);
                            done();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    it('productsInOrders: should return products that exist in orders', function (done) {
        request
            .get("/products_in_orders/")
            .end(function (_err, res) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            //check the response status
                            expect(res.status).toBe(200);
                            _b = (_a = expect(res.body)).toEqual;
                            return [4 /*yield*/, dashboard.productsInOrders()];
                        case 1:
                            _b.apply(_a, [_c.sent()]);
                            done();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    afterAll(function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < productsInOrdersWithProductIDs.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, orderStoreObject.remove_product(productsInOrdersWithProductIDs[i].order_id, productsInOrdersWithProductIDs[i].product_id)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < registeredOrders.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, orderStoreObject.delete(registeredOrders[i].id)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8:
                        i = 0;
                        _a.label = 9;
                    case 9:
                        if (!(i < registeredUsers.length)) return [3 /*break*/, 12];
                        return [4 /*yield*/, userStoreObject.delete(registeredUsers[i].id)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 9];
                    case 12:
                        i = 0;
                        _a.label = 13;
                    case 13:
                        if (!(i < registeredProducts.length)) return [3 /*break*/, 16];
                        return [4 /*yield*/, productStoreObject.delete(registeredProducts[i].id)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        i++;
                        return [3 /*break*/, 13];
                    case 16: return [2 /*return*/];
                }
            });
        });
    });
});
