import { Medecin } from '../medecin.entity';

/**
 * Données de mock pour un médecin.
 * Simule un médecin type pour les tests.
 */
export const mockMedecinItem: Medecin = {
  id: '1', // ID du médecin (peut être un UUID dans votre cas)
  lastName: 'Dupont', // Nom de famille du médecin
  firstName: 'Jean', // Prénom du médecin
  specialite: 'Cardiologie', // Spécialité du médecin
  matricule: '123456', // Matricule unique du médecin
  sejours: [], // Tableau vide car le médecin n'a pas encore de séjours associés
  avis: [], // Tableau vide car le médecin n'a pas encore d'avis associés
};

/**
 * Tableau de données de mock pour plusieurs médecins.
 * Contient initialement un seul médecin (`mockMedecinItem`).
 * Vous pouvez ajouter d'autres médecins à ce tableau pour vos tests.
 */
export const mockMedecinArray: Medecin[] = [mockMedecinItem];
