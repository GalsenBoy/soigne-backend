import { Test, TestingModule } from '@nestjs/testing';
import { SejourController } from './sejour.controller';

describe('SejourController', () => {
  let controller: SejourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SejourController],
    }).compile();

    controller = module.get<SejourController>(SejourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
