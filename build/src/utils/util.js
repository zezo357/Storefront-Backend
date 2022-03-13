"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIfNumberIsValid = exports.CheckIfStringIsValid = void 0;
function CheckIfNumberIsValid(number) {
    if (isNaN(number) ||
        number == '' ||
        number == null ||
        number == undefined) {
        return false;
    }
    return true;
}
exports.CheckIfNumberIsValid = CheckIfNumberIsValid;
function CheckIfStringIsValid(string) {
    if (string == '' ||
        string == null ||
        string == undefined) {
        return false;
    }
    return true;
}
exports.CheckIfStringIsValid = CheckIfStringIsValid;
