import { BankAccount } from './bank-account';

describe('BankAccount unit test', () => {
  it('Should create a bank account', () => {
    const bankAccount = new BankAccount(100, '12345', '123');
    expect(bankAccount.id).toBe('123');
    expect(bankAccount.balance).toBe(100);
    expect(bankAccount.account_number).toBe('12345');
  });

  it('Should debit an account', () => {
    const bankAccount = new BankAccount(100, '12345', '123');
    bankAccount.debit(50);
    expect(bankAccount.balance).toBe(50);
  });

  it('Should credit an account', () => {
    const bankAccount = new BankAccount(100, '12345', '123');
    bankAccount.credit(50);
    expect(bankAccount.balance).toBe(150);
  });
});
