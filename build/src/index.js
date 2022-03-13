"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
var products_1 = __importDefault(require("./handlers/products"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var app = (0, express_1.default)();
var address = 'localhost:3000';
/*
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));*/
if (process.env.ENV == 'dev') {
    var router = express_1.default.Router();
    router.use('/', function (req, res, next) {
        console.log("".concat(req.path, " Was visited"));
        next();
    });
    app.use('/', router);
}
app.use('/', dashboard_1.default);
app.use('/', orders_1.default);
app.use('/', products_1.default);
app.use('/', users_1.default);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
