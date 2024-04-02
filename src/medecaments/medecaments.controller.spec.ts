import { Test, TestingModule } from '@nestjs/testing';
import { MedecamentsController } from './medecaments.controller';

describe('MedecamentsController', () => {
  let controller: MedecamentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedecamentsController],
    }).compile();

    controller = module.get<MedecamentsController>(MedecamentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
