import { Test, TestingModule } from '@nestjs/testing';
import { PrepostController } from './prepost.controller';
import { PrepostService } from './prepost.service';

describe('PrepostController', () => {
  let controller: PrepostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrepostController],
      providers: [PrepostService],
    }).compile();

    controller = module.get<PrepostController>(PrepostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
