import { Test, TestingModule } from '@nestjs/testing';
import { SejourService } from './sejour.service';

describe('SejourService', () => {
  let service: SejourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SejourService],
    }).compile();

    service = module.get<SejourService>(SejourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
