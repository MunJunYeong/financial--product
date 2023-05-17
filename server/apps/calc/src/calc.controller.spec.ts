import { Test, TestingModule } from '@nestjs/testing';
import { CalcController } from './calc.controller';
import { CalcService } from './calc.service';

describe('CalcController', () => {
  let calcController: CalcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CalcController],
      providers: [CalcService],
    }).compile();

    calcController = app.get<CalcController>(CalcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(calcController.getHello()).toBe('Hello World!');
    });
  });
});
