import { User } from '../user.entity';
import { Role } from '../../roles/role.enum';

/**
 * Données de mock pour un utilisateur.
 * Simule un utilisateur type pour les tests.
 * Remarque : Le mot de passe est haché pour des raisons de sécurité.
 */
export const mockUserItem: User = {
  id: '1', // ID de l'utilisateur (peut être un UUID dans votre cas)
  firstName: 'John', // Prénom de l'utilisateur
  lastName: 'Doe', // Nom de famille de l'utilisateur
  email: 'johndoe@example.com', // Adresse e-mail de l'utilisateur
  password: 'hashedPassword', // Mot de passe haché de l'utilisateur
  zipCode: '75000', // Code postal de l'utilisateur
  role: Role.User, // Rôle de l'utilisateur (ici, un utilisateur standard)
  sejours: [], // Tableau vide car l'utilisateur n'a pas encore de séjours associés
  avis: [], // Tableau vide car l'utilisateur n'a pas encore d'avis associés
};

/**
 * Tableau de données de mock pour plusieurs utilisateurs.
 * Contient initialement un seul utilisateur (`mockUserItem`).
 * Vous pouvez ajouter d'autres utilisateurs à ce tableau pour vos tests.
 */
export const mockUserArray: User[] = [mockUserItem];
