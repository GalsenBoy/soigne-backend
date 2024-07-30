import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { Sejour } from '../sejour.entity';
import { SejourService } from '../sejour.service';
import { mockSejourArray } from '../mocks/sejour.data.mock';
import { Medecin } from '../../medecin/medecin.entity';
import { MockSejourRepository } from '../mocks/sejour.repository.mock';
import { MockMedecinRepository } from '../../medecin/mocks/medecin.repository.mock';

// Description de la suite de tests pour le service SejourService
describe('SejourService', () => {
  let sejourService: SejourService; // Instance du service à tester
  let sejourRepository: MockSejourRepository; // Mock du repository Sejour

  beforeEach(async () => {
    // Configuration du module de test NestJS
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SejourService, // Le service à tester
        {
          provide: getRepositoryToken(Sejour), // Injection du mock pour le repository Sejour
          useClass: MockSejourRepository,
        },
        {
          provide: getRepositoryToken(Medecin), // Injection du mock pour le repository Medecin (si nécessaire)
          useClass: MockMedecinRepository,
        },
      ],
    }).compile();

    // Récupération des instances du service et du mock du repository
    sejourService = module.get<SejourService>(SejourService);
    sejourRepository = module.get<MockSejourRepository>(getRepositoryToken(Sejour));
  });

  // Test de la création d'un nouveau séjour
  it('should create a new sejour', async () => {
    // Données de test pour un nouveau séjour
    const sejourData: Partial<Sejour> = {
      dateEntree: new Date('2024-07-15'),
      dateSortie: new Date('2024-07-20'),
      motif: 'Consultation',
      specialite: 'Cardiologie',
    };

    // Appel de la méthode createSejour du service
    const createdSejour = await sejourService.createSejour(sejourData);

    // Vérifications
    expect(createdSejour).toBeDefined(); // Le séjour créé ne doit pas être undefined
    expect(createdSejour.dateSortie).toBe(sejourData.dateSortie); // La date de sortie doit correspondre aux données fournies
  });

  // Test de la non-création d'un séjour avec une date de fin antérieure à la date de début
  it('should not create a sejour with end date before start date', async () => {
    // Données de test avec une date de fin antérieure à la date de début
    const sejourData: Partial<Sejour> = {
      dateEntree: new Date('2024-07-20'),
      dateSortie: new Date('2024-07-15'),
    };

    // Appel de la méthode createSejour du service (devrait lever une erreur)
    const createdSejour = await sejourService.createSejour(sejourData);

    // Vérification que la date d'entrée est bien postérieure à la date de sortie
    expect(createdSejour.dateEntree.getTime()).toBeGreaterThan(
      createdSejour.dateSortie.getTime(),
    );
  });
});
