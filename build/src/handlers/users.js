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
var users_1 = require("../models/users");
var body_parser_1 = __importDefault(require("body-parser"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var util_1 = require("../utils/util");
var userStoreObject = new users_1.userStore();
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
        if (!(0, util_1.CheckIfNumberIsValid)(req.params.id)) {
            throw new Error('please provide a id in your request url /id ');
        }
        if (decodedToken.id !== parseInt(req.params.id)) {
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
        var _a, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = res).send;
                    return [4 /*yield*/, userStoreObject.index()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    res.status(404);
                    res.json(error_1);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var show = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(0, util_1.CheckIfNumberIsValid)(req.params.id)) {
                        res.status(404);
                        res.send('please provide a id, add to url /id');
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _b = (_a = res).send;
                    return [4 /*yield*/, userStoreObject.show(req.params.id)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _c.sent();
                    res.status(404);
                    res.json(error_2);
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var create = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var newUser, token, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.first_name)) {
                        res.status(404);
                        res.send('please provide a first_name, add to body first_name');
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.last_name)) {
                        res.status(404);
                        res.send('please provide a last_name, add to body last_name');
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.username)) {
                        res.status(404);
                        res.send('please provide a username, add to body username');
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.password)) {
                        res.status(404);
                        res.send('please provide a password, add to body password');
                        return [2 /*return*/];
                    }
                    newUser = {
                        id: -1,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        password: req.body.password,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userStoreObject.create(newUser)];
                case 2:
                    newUser = _a.sent();
                    token = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET);
                    //console.log(token);
                    res.send(token);
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.status(404);
                    res.json(error_3);
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var signIn = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, token, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //console.log(req.body);
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.username)) {
                        res.status(404);
                        res.send('please provide a username, add to body username');
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.password)) {
                        res.status(404);
                        res.send('please provide a password, add to body password');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userStoreObject.authenticate(req.body.username, req.body.password)];
                case 2:
                    user = _a.sent();
                    if (user == null) {
                        res.status(404);
                        res.send('wrong username or password');
                    }
                    else {
                        token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
                        res.send(token);
                    }
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    res.status(404);
                    res.json(error_4);
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var update = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var newUser, _a, _b, error_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(0, util_1.CheckIfNumberIsValid)(req.params.id)) {
                        res.status(404);
                        res.send('please provide a id, add to url /id');
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.first_name)) {
                        res.status(404);
                        res.send('please provide a first_name, add to body first_name');
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.last_name)) {
                        res.status(404);
                        res.send('please provide a last_name, add to body last_name');
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.username)) {
                        res.status(404);
                        res.send('please provide a username, add to body username');
                        return [2 /*return*/];
                    }
                    if (!(0, util_1.CheckIfStringIsValid)(req.body.password)) {
                        res.status(404);
                        res.send('please provide a new password, add to body password');
                        return [2 /*return*/];
                    }
                    newUser = {
                        id: req.params.id,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        password: req.body.password,
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _b = (_a = res).send;
                    return [4 /*yield*/, userStoreObject.update(newUser)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _c.sent();
                    res.status(404);
                    res.json(error_5);
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var destroy = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, error_6;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(0, util_1.CheckIfNumberIsValid)(req.params.id)) {
                        res.status(404);
                        res.send('please provide a id, add to url /id');
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _b = (_a = res).send;
                    return [4 /*yield*/, userStoreObject.delete(req.params.id)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _c.sent();
                    res.status(404);
                    res.json(error_6);
                    return [2 /*return*/];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var app = express_1.default.Router();
app.get('/users', body_parser_1.default.json(), index);
app.get('/users/:id', body_parser_1.default.json(), show);
app.post('/users/register', body_parser_1.default.json(), create);
app.post('/users/signIn', body_parser_1.default.json(), signIn);
app.put('/users/:id', body_parser_1.default.json(), tokenVerifier, userIDverify, update);
app.delete('/users/:id', body_parser_1.default.json(), tokenVerifier, userIDverify, destroy);
exports.default = app;
