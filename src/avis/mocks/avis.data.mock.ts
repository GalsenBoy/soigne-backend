import { Role } from '../../roles/role.enum';
import { Avis } from '../avis.entity';
import { User } from '../../user/user.entity';

/**
 * Données de mock pour un utilisateur associé à un avis.
 * Simule un utilisateur type pour les tests d'avis.
 * Remarque : Le mot de passe est haché pour des raisons de sécurité.
 */
const mockUserForAvis: User = {
  id: 'c55a0eeb-b874-425f-afb7-bb863b092ba6', // ID de l'utilisateur (UUID)
  firstName: 'user', // Prénom de l'utilisateur
  lastName: 'user', // Nom de famille de l'utilisateur
  email: 'user@gmail.com', // Adresse e-mail de l'utilisateur
  password: '$2b$10$wivavuwb1JFMm6DFDHR8/O3w07x2oceFpxLxEX3APjYl0s5JaGNBm', // Mot de passe haché
  zipCode: '12 linandes', // Code postal de l'utilisateur
  role: 'user' as Role, // Rôle de l'utilisateur (ici, un utilisateur standard)
  sejours: [], // Tableau vide, car non utilisé dans le contexte de l'avis
  avis: [], // Tableau vide, car non utilisé dans le contexte de l'avis
};

/**
 * Données de mock pour un avis.
 * Simule un avis type avec ses relations (médecin, utilisateur, séjour, prescription).
 */
const mockAvisArray: Avis[] = [
  {
    id: 'db255d63-43a8-4d02-adda-57c792cd63af', // ID de l'avis (UUID)
    created_at: new Date('2024-04-16T13:01:00.041Z'), // Date de création de l'avis
    description: 'Pas grave', // Description de l'avis

    // Informations sur le médecin associé à l'avis
    medecin: {
      id: '1', // ID du médecin (peut être un UUID)
      lastName: 'Cissokho', // Nom du médecin
      firstName: 'Pierre', // Prénom du médecin
      specialite: 'imagerie', // Spécialité du médecin
      matricule: 'RARPOP', // Matricule du médecin
    },
    user: mockUserForAvis, // Utilisateur ayant rédigé l'avis (référence à mockUserForAvis)

    // Informations sur le séjour associé à l'avis
    sejour: {
      id: '0becf503-f333-4084-afdc-bcae848fb61e', // ID du séjour (UUID)
      dateEntree: new Date('2024-04-16'), // Date d'entrée du séjour
      dateSortie: new Date('2024-04-19'), // Date de sortie du séjour
      motif: 'Mal de tête', // Motif du séjour
      specialite: 'urgences', // Spécialité du séjour
      user: mockUserForAvis, // Utilisateur associé au séjour (référence à mockUserForAvis)
    },

    // Informations sur la prescription associée à l'avis (avec médicaments)
    prescription: {
      id: 'f657d866-f760-4aec-adec-fadeb5276244', // ID de la prescription (UUID)
      date: new Date('2024-04-16T13:00:59.000Z'), // Date de la prescription
      medecament: [
        {
          id: '1', // ID du médicament
          medicament: 'Doliprane ', // Nom du médicament
          posologie: '3 fois par jour', // Posologie du médicament
          prescription: {
            // Référence circulaire à la prescription pour simuler la relation
            id: '1',
            date: new Date('2024-04-16'),
            medecament: [], // Tableau vide pour éviter une boucle infinie
          },
        },
        // ...autres médicaments (répétition de la structure ci-dessus)
      ],
    },
  },
  // ...autres avis (facultatif)
];

export { mockAvisArray };
