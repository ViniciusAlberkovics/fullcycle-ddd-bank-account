import { DataSource, Repository } from 'typeorm';
import { BankAccountSchema } from './bank-account.schema';
import { BankAccountTypeOrmRepository } from './bank-account-typeorm.repository';
import { BankAccount } from '../../domain/bank-account';

describe('BankAccountTypeOrmRepository Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccountTypeOrmRepository;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [BankAccountSchema],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccountSchema);
    repository = new BankAccountTypeOrmRepository(ormRepo);
  });

  it('Should insert a new bank account', async () => {
    const bankAccount = new BankAccount(10, '123456', '123');
    await repository.insert(bankAccount);
    const model = await ormRepo.findOneBy({ account_number: '123456' });
    expect(model.id).toBe('123');
    expect(model.balance).toBe(10);
    expect(model.account_number).toBe('123456');
  });
});
