"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
describe('util tests', function () {
    it('valid string input undefined return false', function () {
        expect((0, util_1.CheckIfStringIsValid)(undefined)).toEqual(false);
    });
    it('valid string input empty return false', function () {
        expect((0, util_1.CheckIfStringIsValid)("")).toEqual(false);
    });
    it('valid string input null return false', function () {
        expect((0, util_1.CheckIfStringIsValid)(null)).toEqual(false);
    });
    it('valid string input test return true', function () {
        expect((0, util_1.CheckIfStringIsValid)("test")).toEqual(true);
    });
    it('valid number input empty return false', function () {
        expect((0, util_1.CheckIfNumberIsValid)("")).toEqual(false);
    });
    it('valid number input undefined return false', function () {
        expect((0, util_1.CheckIfNumberIsValid)(undefined)).toEqual(false);
    });
    it('valid number input null return false', function () {
        expect((0, util_1.CheckIfNumberIsValid)(null)).toEqual(false);
    });
    it('valid number input NaN return false', function () {
        expect((0, util_1.CheckIfNumberIsValid)(NaN)).toEqual(false);
    });
    it('valid number input "100" return true', function () {
        expect((0, util_1.CheckIfNumberIsValid)('100')).toEqual(true);
    });
    it('valid number input 100 return true', function () {
        expect((0, util_1.CheckIfNumberIsValid)(100)).toEqual(true);
    });
});
