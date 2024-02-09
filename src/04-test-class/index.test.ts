import { getBankAccount } from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(0).getBalance()).toEqual(0);
    expect(getBankAccount(100).getBalance()).toEqual(100);
    expect(getBankAccount(-100500).getBalance()).toEqual(-100500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(0).withdraw(1)).toThrowError();
    expect(() => getBankAccount(100).withdraw(101)).toThrowError();
    expect(() => getBankAccount(-100500).withdraw(100501)).toThrowError();
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(0).transfer(1, getBankAccount(0)),
    ).toThrowError();
    expect(() =>
      getBankAccount(300).transfer(500, getBankAccount(1000)),
    ).toThrowError();
    expect(() =>
      getBankAccount(-100500).transfer(100501, getBankAccount(100000)),
    ).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(600);
    expect(() => account.transfer(600, account)).toThrowError();
  });

  test('should deposit money', () => {
    expect(getBankAccount(0).deposit(100).getBalance()).toEqual(100);
    expect(getBankAccount(-1000).deposit(100).getBalance()).toEqual(-900);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(100).withdraw(50).getBalance()).toEqual(50);
  });

  test('should transfer money', () => {
    expect(
      getBankAccount(100).transfer(50, getBankAccount(0)).getBalance(),
    ).toEqual(50);
    expect(
      getBankAccount(0).transfer(-500, getBankAccount(100)).getBalance(),
    ).toEqual(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(50).mockReturnValueOnce(1);
    expect(await getBankAccount(0).fetchBalance()).toEqual(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(50).mockReturnValueOnce(1);
    const account = getBankAccount(100);
    const balance = account.getBalance();
    expect(await account.synchronizeBalance()).not.toEqual(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(50).mockReturnValueOnce(0);
    const account = getBankAccount(100);
    await expect(account.synchronizeBalance()).rejects.toThrowError();
  });
});
