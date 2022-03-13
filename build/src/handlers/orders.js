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
var express_1 = __importDefault(require("express"));
var orders_1 = require("../models/orders");
var body_parser_1 = __importDefault(require("body-parser"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var orderStoreObject = new orders_1.orderStore();
var tokenVerifier = function (req, res, next) {
    try {
        var token = req.headers.authorization;
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
var userIDverify = function (req, res, next) {
    try {
        var token = req.headers.authorization;
        var decodedToken = jsonwebtoken_1.default.decode(token);
        if (decodedToken.id !== parseInt(req.body.user_id)) {
            throw new Error('User id does not match!');
        }
        next();
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
};
var index = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res).send;
                    return [4 /*yield*/, orderStoreObject.index()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
var show = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res).send;
                    return [4 /*yield*/, orderStoreObject.show(parseInt(req.params.order_id))];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
var create = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var newOrder, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    newOrder = {
                        id: -1,
                        status: 'open',
                        user_id: req.body.user_id,
                    };
                    _b = (_a = res).send;
                    return [4 /*yield*/, orderStoreObject.create(newOrder)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
var update = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var newOrder, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    newOrder = {
                        id: req.params.order_id,
                        status: req.body.status,
                        user_id: req.body.user_id,
                    };
                    _b = (_a = res).send;
                    return [4 /*yield*/, orderStoreObject.update(newOrder)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
var add_product = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res).send;
                    return [4 /*yield*/, orderStoreObject.add_product(req.body.testQuantity, parseInt(req.params.order_id), req.body.product_id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
var remove_product = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res).send;
                    return [4 /*yield*/, orderStoreObject.remove_product(parseInt(req.params.order_id), req.body.product_id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
var destroy = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res).send;
                    return [4 /*yield*/, orderStoreObject.delete(req.params.order_id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
var app = express_1.default.Router();
app.get('/orders', body_parser_1.default.json(), index);
app.get('/orders/:order_id', body_parser_1.default.json(), show);
app.post('/orders/', body_parser_1.default.json(), tokenVerifier, userIDverify, create);
app.post('/orders/add_product/:order_id', body_parser_1.default.json(), tokenVerifier, userIDverify, add_product);
app.post('/orders/remove_product/:order_id', body_parser_1.default.json(), tokenVerifier, userIDverify, remove_product);
app.put('/orders/:order_id', body_parser_1.default.json(), tokenVerifier, userIDverify, update);
app.delete('/orders/:order_id', body_parser_1.default.json(), tokenVerifier, userIDverify, destroy);
exports.default = app;
