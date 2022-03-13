import { CheckIfStringIsValid, CheckIfNumberIsValid } from '../util';

describe('util tests', (): void => {
  it('valid string input undefined return false', (): void => {
    expect(CheckIfStringIsValid(undefined)).toEqual(false);
  });

  it('valid string input empty return false', (): void => {
    expect(CheckIfStringIsValid('')).toEqual(false);
  });

  it('valid string input null return false', (): void => {
    expect(CheckIfStringIsValid(null)).toEqual(false);
  });

  it('valid string input test return true', (): void => {
    expect(CheckIfStringIsValid('test')).toEqual(true);
  });

  it('valid number input empty return false', (): void => {
    expect(CheckIfNumberIsValid('')).toEqual(false);
  });

  it('valid number input undefined return false', (): void => {
    expect(CheckIfNumberIsValid(undefined)).toEqual(false);
  });
  it('valid number input null return false', (): void => {
    expect(CheckIfNumberIsValid(null)).toEqual(false);
  });
  it('valid number input NaN return false', (): void => {
    expect(CheckIfNumberIsValid(NaN)).toEqual(false);
  });
  it('valid number input "100" return true', (): void => {
    expect(CheckIfNumberIsValid('100')).toEqual(true);
  });
  it('valid number input 100 return true', (): void => {
    expect(CheckIfNumberIsValid(100)).toEqual(true);
  });
});
