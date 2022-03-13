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
var index_1 = __importDefault(require("../../index"));
var supertest_1 = __importDefault(require("supertest"));
var users_1 = require("../../models/users");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var request = (0, supertest_1.default)(index_1.default);
describe('users endpoint responses', function () {
    var userStoreObject = new users_1.userStore();
    var token_that_got_returned = '';
    var newUser = {
        id: -1,
        first_name: 'test',
        last_name: 'test',
        username: 'test2',
        password: 'testQUEW',
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); });
    it('getting users endpoint (index)', function (done) {
        request.get("/users").end(function (_err, res) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            //check the response status
                            expect(res.status).toBe(200);
                            _b = (_a = expect(res.body)).toEqual;
                            return [4 /*yield*/, userStoreObject.index()];
                        case 1:
                            _b.apply(_a, [_c.sent()]);
                            done();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    it('getting users endpoint (Create)', function (done) {
        request
            .post("/users/register")
            .send(newUser)
            .end(function (_err, res) {
            return __awaiter(this, void 0, void 0, function () {
                var token, decodedToken, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            //check the response status
                            expect(res.status).toBe(200);
                            token = res.text;
                            token_that_got_returned = token;
                            try {
                                jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                                decodedToken = jsonwebtoken_1.default.decode(token);
                                //console.log(decodedToken);
                                newUser.id = decodedToken.id;
                                //console.log(newUser.id);
                                expect(true).toEqual(true);
                            }
                            catch (_c) {
                                expect('INVALID TOKEN').toEqual('false');
                            }
                            _a = expect;
                            return [4 /*yield*/, userStoreObject.show(newUser.id)];
                        case 1:
                            _a.apply(void 0, [_b.sent()]).toEqual(jasmine.objectContaining({
                                id: newUser.id,
                                first_name: newUser.first_name,
                                last_name: newUser.last_name,
                                username: newUser.username,
                            }));
                            done();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    it('getting users endpoint (signIn)', function (done) {
        request
            .post("/users/signIn")
            .send(newUser)
            .end(function (_err, res) {
            //check the response status
            expect(res.status).toBe(200);
            //console.log(res.text);
            var token = res.text;
            token_that_got_returned = token;
            try {
                jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                var decodedToken = jsonwebtoken_1.default.decode(token);
                //console.log(decodedToken);
                newUser.id = decodedToken.id;
                //console.log(newUser.id);
                expect(true).toEqual(true);
            }
            catch (_a) {
                expect('INVALID TOKEN').toEqual('false');
            }
            done();
        });
    });
    it('getting users endpoint (show)', function (done) {
        request
            .get("/users/".concat(newUser.id))
            .end(function (_err, res) {
            return __awaiter(this, void 0, void 0, function () {
                var ShownUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            //check the response status
                            expect(res.status).toBe(200);
                            return [4 /*yield*/, userStoreObject.show(newUser.id)];
                        case 1:
                            ShownUser = _a.sent();
                            expect(res.body).toEqual(jasmine.objectContaining({
                                id: ShownUser.id,
                                first_name: ShownUser.first_name,
                                last_name: ShownUser.last_name,
                                username: ShownUser.username,
                            }));
                            done();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    it('getting users endpoint (update)', function (done) {
        request
            .put("/users/".concat(newUser.id))
            .send({
            first_name: 'the unknown ',
            last_name: 'can be known',
            username: 'if only we',
            password: 'try',
        })
            .set({ Authorization: token_that_got_returned })
            .end(function (_err, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            //console.log(res.text);
                            //check the response status
                            expect(res.status).toBe(200);
                            return [4 /*yield*/, userStoreObject.show(newUser.id)];
                        case 1:
                            newUser = _a.sent();
                            expect(res.body).toEqual(jasmine.objectContaining({
                                id: newUser.id,
                                first_name: newUser.first_name,
                                last_name: newUser.last_name,
                                username: newUser.username,
                            }));
                            done();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    it('getting users endpoint (delete)', function (done) {
        request
            .delete("/users/".concat(newUser.id))
            .set({ Authorization: token_that_got_returned })
            .end(function (_err, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    //check the response status
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual(jasmine.objectContaining({
                        id: newUser.id,
                        first_name: newUser.first_name,
                        last_name: newUser.last_name,
                        username: newUser.username,
                    }));
                    done();
                    return [2 /*return*/];
                });
            });
        });
    });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); });
});
