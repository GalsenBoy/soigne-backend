import { Test, TestingModule } from '@nestjs/testing';
import { MedecinController } from './medecin.controller';
import { MedecinService } from './medecin.service';
import { MedecinMock } from './mocks/medecin.mock';
import { MedecinServiceMock } from './mocks/medecin.service.mock';
import { Medecin } from './medecin.entity';

describe('MedecinController', () => {
  let controller: MedecinController;
  let service: MedecinService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedecinController],
      providers: [{ provide: MedecinService, useClass: MedecinServiceMock }],
    }).compile();

    controller = module.get<MedecinController>(MedecinController);
    service = module.get<MedecinService>(MedecinService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMedecins', () => {
    it('should return an array of medecins', () => {
      expect(controller.getMedecins()).resolves.toEqual(MedecinMock);
    });
    it('should return an empty array if no medecin is found', async () => {
      expect(await controller.getMedecins()).toEqual([]);
    });
  });

  describe('createMedecin', () => {
    it('should create a medecin and return it', async () => {
      const medecinData: Medecin = {
        id: "1",
        lastName: "Doe",
        firstName: "John",
        specialite: "Cardiologue",
        matricule: "123456",
      };
      jest.spyOn(service, 'createMedecin').mockResolvedValueOnce(MedecinMock[0]);
      expect(await controller.createMedecin(medecinData)).toEqual(MedecinMock[0]);
    });
  });

  describe('limitMedecinsWithFiveSejours', () => {
    it('should call limitMedecinsWithFiveSejours method of service and return medecins', async () => {
      const medecinData: Medecin[] = [
        {
          id: "1",
          lastName: "Doe",
          firstName: "John",
          specialite: "Cardiologue",
          matricule: "123456",
        }
      ];

      jest.spyOn(service, 'limitMedecinsWithFiveSejours').mockResolvedValueOnce(medecinData);
      expect(await controller.limitMedecinsWithFiveSejours()).toEqual(medecinData);
    });
  });
});
