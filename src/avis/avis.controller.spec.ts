import { Test, TestingModule } from '@nestjs/testing';
import { AvisController } from './avis.controller';
import { AvisServiceMock } from './mocks/avis.service.mocks';
import { AvisService } from './avis.service';
import { avisMocks } from './mocks/avis.mocks';

describe('AvisController', () => {
  let controller: AvisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvisController],
      providers: [{ provide: AvisService, useClass: AvisServiceMock }],
    }).compile();

    controller = module.get<AvisController>(AvisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAvis', () => {
    it('should return an array of avis', async () => {
      expect(controller.getAvis()).resolves.toEqual(avisMocks);

    });
  });
});
