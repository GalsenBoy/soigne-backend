import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { Medecament } from '../../medecaments/medecament.entity';
import { MockMedecamentRepository } from '../../medecaments/mocks/medecament.repository.mock';
import { Medecin } from '../../medecin/medecin.entity';
import { mockMedecinArray } from '../../medecin/mocks/medecin.data.mock';
import { MockMedecinRepository } from '../../medecin/mocks/medecin.repository.mock';
import { MockPrescriptionRepository } from '../../prescription/mocks/prescription.repository.mock';
import { Prescription } from '../../prescription/prescription.entity';
import { mockSejourItem } from '../../sejour/mocks/sejour.data.mock';
import { MockSejourRepository } from '../../sejour/mocks/sejour.repository.mock';
import { Sejour } from '../../sejour/sejour.entity';
import { mockUserItem } from '../../user/mocks/user.data.mock';
import { User } from '../../user/user.entity';
import { Avis } from '../avis.entity';
import { AvisService } from '../avis.service';
import { MockAvisRepository } from '../mocks/avis.repository.mock';

// Données de test pour un avis
const mockAvisData: DeepPartial<Avis> = {
  description: "Très bon séjour, médecin à l'écoute.",
};

// Données de test pour une prescription
const mockPrescriptionData: DeepPartial<Prescription> = {
  date: new Date(),
};

// Données de test pour un médicament
const mockMedecamentData: DeepPartial<Medecament> = {
  medicament: 'Doliprane',
  posologie: '1g/jour',
};

// Suite de tests pour le service AvisService
describe('AvisService', () => {
  let avisService: AvisService; // Instance du service à tester
  let sejourRepository: MockSejourRepository; // Mock du repository Sejour
  let medecinRepository: MockMedecinRepository; // Mock du repository Medecin
  let prescriptionRepository: MockPrescriptionRepository; // Mock du repository Prescription
  let medecamentRepository: MockMedecamentRepository; // Mock du repository Medecament

  // Configuration avant chaque test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvisService, // Le service à tester
        { provide: getRepositoryToken(Avis), useClass: MockAvisRepository }, // Injection du mock pour AvisRepository
        { provide: getRepositoryToken(Sejour), useClass: MockSejourRepository }, // Injection du mock pour SejourRepository
        { provide: getRepositoryToken(Medecin), useClass: MockMedecinRepository }, // Injection du mock pour MedecinRepository
        {
          provide: getRepositoryToken(Prescription),
          useClass: MockPrescriptionRepository,
        }, // Injection du mock pour PrescriptionRepository
        { provide: getRepositoryToken(Medecament), useClass: MockMedecamentRepository }, // Injection du mock pour MedecamentRepository
      ],
    }).compile();

    // Récupération des instances du service et des mocks des repositories
    avisService = module.get<AvisService>(AvisService);
    sejourRepository = module.get<MockSejourRepository>(getRepositoryToken(Sejour));
    medecinRepository = module.get<MockMedecinRepository>(getRepositoryToken(Medecin));
    prescriptionRepository = module.get<MockPrescriptionRepository>(
      getRepositoryToken(Prescription),
    );
    medecamentRepository = module.get<MockMedecamentRepository>(
      getRepositoryToken(Medecament),
    );
  });

  // Test de création d'un avis avec prescription
  it('should create an avis with prescription', async () => {
    const medecin = mockMedecinArray[0]; // Récupère le premier médecin mocké
    const sejour = mockSejourItem; // Récupère le séjour mocké
    const user = mockUserItem; // Récupère l'utilisateur mocké

    // Prépare les données de prescription avec un médicament
    const prescriptionData = {
      ...mockPrescriptionData,
      medecament: [mockMedecamentData],
    };

    // Mock la méthode "findOne" du repository Sejour pour qu'elle renvoie le séjour avec le médecin et l'utilisateur associés
    jest.spyOn(sejourRepository, 'findOne').mockResolvedValue({
      ...mockSejourItem,
      medecin,
      user,
    });

    // Appelle la méthode createAvisWithPrescription du service
    const createdAvis = await avisService.createAvisWithPrescription(
      mockAvisData as Avis,
      sejour.id.toString(),
      medecin.id.toString(),
      prescriptionData as Prescription, // Cast en Prescription pour correspondre au type attendu
    );

    // Vérifications :
    expect(createdAvis).toBeDefined(); // L'avis a été créé
    expect(createdAvis.id).toBeDefined(); // L'avis a un ID
    expect(createdAvis.description).toBe(mockAvisData.description); // La description est correcte
    expect(createdAvis.medecin.id).toBe(medecin.id); // Le médecin est associé
    expect(createdAvis.sejour.id).toBe(sejour.id); // Le séjour est associé
    expect(createdAvis.user.id).toBe(user.id); // L'utilisateur est associé
    expect(createdAvis.prescription).toBeDefined(); // La prescription a été créée
    expect(createdAvis.prescription.medecament).toHaveLength(1); // Un médicament est associé à la prescription
  });
});
