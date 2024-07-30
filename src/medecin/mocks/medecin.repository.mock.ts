import { Repository, DeepPartial, In } from 'typeorm';
import { Medecin } from '../medecin.entity';
import { mockMedecinArray } from './medecin.data.mock';

/**
 * Mock du repository Medecin pour les tests.
 * Simule les opérations de base de données pour l'entité Medecin.
 */
export class MockMedecinRepository extends Repository<Medecin> {
  /**
   * Données de médecins simulées, initialisées avec les données de 'medecin.data.mock'.
   */
  private mockData: Medecin[] = mockMedecinArray;

  /**
   * Simule la recherche d'un médecin par son ID ou par un tableau d'IDs.
   * @param options - Les options de recherche (peut contenir un ID unique ou un tableau d'IDs).
   * @returns Une promesse qui se résout avec le médecin trouvé ou undefined si aucun médecin ne correspond.
   */
  findOne(options?: any): Promise<Medecin | undefined> {
    const medecin = this.mockData.find(m => {
      if (options && options.where) {
        if (options.where.id) {
          // Recherche par ID unique
          return m.id === options.where.id;
        }
        if (options.where.id && options.where.id.hasOwnProperty('in')) {
          // Recherche par un tableau d'IDs (In)
          return options.where.id.in.includes(m.id);
        }
      }
      return false; // Aucun critère de recherche ou médecin non trouvé
    });
    return Promise.resolve(medecin);
  }

  /**
   * Simule la recherche de médecins par un tableau d'IDs.
   * @param options - Les options de recherche (peut contenir un tableau d'IDs).
   * @returns Une promesse qui se résout avec un tableau des médecins trouvés.
   */
  find(options?: any): Promise<Medecin[]> {
    if (
      options &&
      options.where &&
      options.where.id &&
      options.where.id.hasOwnProperty('in')
    ) {
      const ids = options.where.id.in;
      return Promise.resolve(this.mockData.filter(medecin => ids.includes(medecin.id)));
    }
    return Promise.resolve(this.mockData); // Retourne tous les médecins si aucun critère n'est spécifié
  }
}
