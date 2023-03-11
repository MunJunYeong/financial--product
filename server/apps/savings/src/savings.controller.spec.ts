import { Test, TestingModule } from '@nestjs/testing';
import { SavingsController } from './savings.controller';
import { SavingsService } from './savings.service';

describe('SavingsController', () => {
  let savingsController: SavingsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SavingsController],
      providers: [SavingsService],
    }).compile();

    savingsController = app.get<SavingsController>(SavingsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(savingsController.getHello()).toBe('Hello World!');
    });
  });
});
