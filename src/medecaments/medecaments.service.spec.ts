import { Test, TestingModule } from '@nestjs/testing';
import { MedecamentsService } from './medecaments.service';

describe('MedecamentsService', () => {
  let service: MedecamentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedecamentsService],
    }).compile();

    service = module.get<MedecamentsService>(MedecamentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
