import { Role } from '../../roles/role.enum';
import { Sejour } from '../sejour.entity';

/**
 * Données de mock pour un séjour.
 * Simule un séjour type pour les tests.
 */
export const mockSejourItem: Sejour = {
  id: '1', // ID du séjour (peut être un UUID dans votre cas)
  dateEntree: new Date('2019-01-01'), // Date d'entrée du séjour
  dateSortie: new Date('2019-01-01'), // Date de sortie du séjour
  user: { // Informations sur l'utilisateur associé au séjour
    id: '1', // ID de l'utilisateur
    lastName: 'Doe', // Nom de famille de l'utilisateur
    firstName: 'John', // Prénom de l'utilisateur
    email: 'bob@gmail.com', // Email de l'utilisateur
    zipCode: '75000', // Code postal de l'utilisateur
    role: 'user' as Role, // Rôle de l'utilisateur (ici, un utilisateur standard)
    password: '123456', // Mot de passe de l'utilisateur (à hacher en production !)
    sejours: [],
    avis: [],
  },
  motif: 'Consultation', // Motif du séjour
  specialite: 'Cardiologie', // Spécialité médicale concernée par le séjour
};

/**
 * Tableau de données de mock pour plusieurs séjours.
 * Contient initialement un seul séjour (`mockSejourItem`).
 * Vous pouvez ajouter d'autres séjours à ce tableau pour vos tests.
 */
export const mockSejourArray: Sejour[] = [mockSejourItem];
