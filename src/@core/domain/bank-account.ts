import { v4 as uuid } from 'uuid';

export class BankAccount {
  readonly id: string;
  balance: number;
  readonly account_number: string;

  constructor(balance: number, account_number: string, id?: string) {
    // regras de negocio
    this.id = id ?? uuid();
    this.balance = balance;
    this.account_number = account_number;
  }

  debit(amount: number): void {
    // regras de negocio
    this.balance -= amount;
  }

  credit(amount: number): void {
    // regras de negocio
    this.balance += amount;
  }
}

type BankAccountProps = {
  balance: number;
  account_number: string;
};

export class BankAccountV2 {
  readonly id: string;

  constructor(public readonly props: BankAccountProps, id?: string) {
    // regras de negocio
    this.id = id ?? uuid();
    this.props = props;
  }

  debit(amount: number): void {
    // regras de negocio
    // if (this.balance - amount < 0) {
    //   throw new Error('Insufficient balance');
    // }
    this.balance -= amount;
  }

  credit(amount: number): void {
    // regras de negocio
    this.balance += amount;
  }

  get balance() {
    return this.props.balance;
  }

  private set balance(value: number) {
    this.props.balance = value;
  }

  get account_number() {
    return this.props.account_number;
  }

  private set account_number(value: string) {
    this.props.account_number = value;
  }
}
