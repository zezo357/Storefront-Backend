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
var products_1 = require("../models/products");
var body_parser_1 = __importDefault(require("body-parser"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var util_1 = require("../utils/util");
var productStoreObject = new products_1.productStore();
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
var index = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = res).send;
                    return [4 /*yield*/, productStoreObject.index()];
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
                    if (!(0, util_1.CheckIfNumberIsValid)(req.params.id)) {
                        res.status(404);
                        res.send("please provide a id, add to url /id");
                        return [2 /*return*/];
                    }
                    _b = (_a = res).send;
                    return [4 /*yield*/, productStoreObject.show(req.params.id)];
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
        var newProduct, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.name)) {
                        res.status(404);
                        res.send("please provide a name, add to body name");
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfNumberIsValid)(req.body.price)) {
                        res.status(404);
                        res.send("please provide a price, add to body price");
                        return [2 /*return*/];
                    }
                    newProduct = {
                        id: -1,
                        name: req.body.name,
                        price: req.body.price,
                    };
                    //console.log(newProduct)
                    _b = (_a = res).send;
                    return [4 /*yield*/, productStoreObject.create(newProduct)];
                case 1:
                    //console.log(newProduct)
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
var update = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var newProduct, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(0, util_1.CheckIfNumberIsValid)(req.params.id)) {
                        res.status(404);
                        res.send("please provide a id, add to url /id");
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.name)) {
                        res.status(404);
                        res.send("please provide a name, add to body name");
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfNumberIsValid)(req.body.price)) {
                        res.status(404);
                        res.send("please provide a price, add to body price");
                        return [2 /*return*/];
                    }
                    newProduct = {
                        id: req.params.id,
                        name: req.body.name,
                        price: req.body.price,
                    };
                    _b = (_a = res).send;
                    return [4 /*yield*/, productStoreObject.update(newProduct)];
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
                    if (!(0, util_1.CheckIfNumberIsValid)(req.params.id)) {
                        res.status(404);
                        res.send("please provide a id, add to url /id");
                        return [2 /*return*/];
                    }
                    _b = (_a = res).send;
                    return [4 /*yield*/, productStoreObject.delete(req.params.id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [2 /*return*/];
            }
        });
    });
};
var app = express_1.default.Router();
app.get('/products', body_parser_1.default.json(), index);
app.get('/products/:id', body_parser_1.default.json(), show);
app.post('/products', body_parser_1.default.json(), tokenVerifier, create);
app.put('/products/:id', body_parser_1.default.json(), tokenVerifier, update);
app.delete('/products/:id', body_parser_1.default.json(), tokenVerifier, destroy);
exports.default = app;
