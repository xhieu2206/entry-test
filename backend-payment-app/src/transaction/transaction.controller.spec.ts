import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('TransactionController', () => {
  let controller: TransactionController;
  const mockTransactionService = {};
  const mockHttpService = {};
  const mockConfigService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService, HttpService, ConfigService],
    })
      .overrideProvider(TransactionService)
      .useValue(mockTransactionService)
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it(`should be defined`, () => {
    expect(controller).toBeDefined();
  });
});
