import { DataSource, Repository } from 'typeorm';
import { BankAccountTypeOrmRepository } from '../infra/db/bank-account-typeorm.repository';
import { BankAccountSchema } from '../infra/db/bank-account.schema';
import { BankAccountService } from './bank-account.service';

describe('BankAccountService Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchema>;
  let repository: BankAccountTypeOrmRepository;
  let bankAccountService: BankAccountService;

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
    bankAccountService = new BankAccountService(repository);
  });

  it('Should create a new bank account', async () => {
    await bankAccountService.create('12345-12');
    const model = await ormRepo.findOneBy({ account_number: '12345-12' });
    expect(model.id).toBeDefined();
    expect(model.balance).toBe(0);
    expect(model.account_number).toBe('12345-12');
  });
});
