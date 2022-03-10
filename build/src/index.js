"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var books_1 = __importDefault(require("./handlers/books"));
var app = (0, express_1.default)();
var address = 'localhost:3000';
/*
var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));*/
var router = express_1.default.Router();
router.use('/', function (req, res, next) {
    console.log("".concat(req.path, " Was visited"));
    next();
});
app.use('/', router);
app.use('/', books_1.default);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
