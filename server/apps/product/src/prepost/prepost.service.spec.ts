import { Test, TestingModule } from '@nestjs/testing';
import { PrepostService } from './prepost.service';

describe('PrepostService', () => {
  let service: PrepostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrepostService],
    }).compile();

    service = module.get<PrepostService>(PrepostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
