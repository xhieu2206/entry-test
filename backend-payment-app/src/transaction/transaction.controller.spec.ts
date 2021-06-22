import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { HttpService } from '@nestjs/common';

describe('TransactionController', () => {
  let controller: TransactionController;
  const mockTransactionService = {};
  let httpService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService, HttpService],
    })
      .overrideProvider(TransactionService)
      .useValue(mockTransactionService)
      .overrideProvider(HttpService)
      .useValue(httpService)
      .compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it(`should create a new transaction successfully`);
});
