import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountRepository } from '../@core/domain/bank-account.repository';
import { BankAccountService } from '../@core/domain/bank-account.service';
import { BankAccountTypeOrmRepository } from '../@core/infra/db/bank-account-typeorm.repository';
import { DataSource } from 'typeorm';
import { BankAccountSchema } from '../@core/infra/db/bank-account.schema';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './bank-accounts.service';

describe('BankAccountsController', () => {
  let controller: BankAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          logging: false,
          entities: [BankAccountSchema],
        }),
        TypeOrmModule.forFeature([BankAccountSchema]),
      ],
      controllers: [BankAccountsController],
      providers: [
        BankAccountsService,
        {
          provide: BankAccountTypeOrmRepository,
          useFactory: (dataSource: DataSource) => {
            return new BankAccountTypeOrmRepository(
              dataSource.getRepository(BankAccountSchema),
            );
          },
          inject: [getDataSourceToken()],
        },
        {
          provide: BankAccountService,
          useFactory: (repo: BankAccountRepository) => {
            return new BankAccountService(repo);
          },
          inject: [BankAccountTypeOrmRepository],
        },
      ],
    }).compile();

    controller = module.get<BankAccountsController>(BankAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
