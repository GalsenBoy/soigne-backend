import { Test, TestingModule } from '@nestjs/testing';
import { SejourController } from './sejour.controller';
import { SejourMock } from './mocks/sejour.mock';
import { SejourServiceMock } from './mocks/sejour.service.mock';
import { SejourService } from './sejour.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

describe('SejourController', () => {
  let controller: SejourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SejourController],
      providers: [{ provide: SejourService, useClass: SejourServiceMock }],
    }).overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }).compile();

    controller = module.get<SejourController>(SejourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSejours', () => {
    it('should return a list of sejours', async () => {
      expect(await controller.getSejours()).toEqual(SejourMock);
    });
  });
});
