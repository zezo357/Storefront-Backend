function CheckIfNumberIsValid(number: any): boolean {
  if (isNaN(number) || number == '' || number == null || number == undefined) {
    return false;
  }

  return true;
}
function CheckIfStringIsValid(string: any): boolean {
  if (string == '' || string == null || string == undefined) {
    return false;
  }

  return true;
}

export { CheckIfStringIsValid, CheckIfNumberIsValid };
