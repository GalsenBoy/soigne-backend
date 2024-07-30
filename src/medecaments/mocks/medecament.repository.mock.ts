import { Repository, DeepPartial, SaveOptions } from 'typeorm';
import { Medecament } from '../medecament.entity';

/**
 * Mock du repository Medecament pour les tests.
 * Simule les opérations de base de données pour l'entité Medecament.
 */
export class MockMedecamentRepository extends Repository<Medecament> {
  /**
   * Stockage des données de médicaments simulées.
   */
  private mockData: Medecament[] = [];

  /**
   * Compteur pour générer des ID uniques pour les nouveaux médicaments.
   */
  private nextId = 1;

  /**
   * Génère le prochain ID disponible (sous forme de chaîne de caractères).
   * @returns {string} Le prochain ID disponible.
   */
  private getNextFreeId(): string {
    return (this.nextId++).toString(); // Incrémente et renvoie l'ID sous forme de chaîne
  }

  // ----------------------------------------------------------------------------
  // Méthode "create": surcharges
  // ----------------------------------------------------------------------------

  /**
   * Crée un nouveau médicament vide avec un ID généré.
   * @returns {Medecament} Le nouveau médicament.
   */
  create(): Medecament;

  /**
   * Crée un nouveau médicament à partir de données partielles.
   * @param {DeepPartial<Medecament>} entityLike - Les données partielles du médicament.
   * @returns {Medecament} Le nouveau médicament.
   */
  create(entityLike: DeepPartial<Medecament>): Medecament;

  /**
   * Crée plusieurs nouveaux médicaments à partir d'un tableau de données partielles.
   * @param {DeepPartial<Medecament>[]} entityLikes - Le tableau de données partielles des médicaments.
   * @returns {Medecament[]} Les nouveaux médicaments.
   */
  create(entityLikes: DeepPartial<Medecament>[]): Medecament[];

  // ----------------------------------------------------------------------------
  // Méthode "create": implémentation
  // ----------------------------------------------------------------------------
  create(
    entityLike?: DeepPartial<Medecament> | DeepPartial<Medecament>[],
  ): Medecament | Medecament[] {
    if (Array.isArray(entityLike)) {
      // Crée un tableau de médicaments à partir des données partielles fournies
      return entityLike.map(medicamentData =>
        this.create(medicamentData),
      ) as Medecament[];
    } else {
      // Crée un seul médicament à partir des données partielles fournies, avec un ID généré
      const newMedecament = { id: this.getNextFreeId(), ...entityLike } as Medecament;
      this.mockData.push(newMedecament);
      return newMedecament;
    }
  }

  // ----------------------------------------------------------------------------
  // Méthode "save": surcharges
  // ----------------------------------------------------------------------------

  /**
   * Sauvegarde un médicament complet.
   * @param {Medecament} entity - Le médicament à sauvegarder.
   * @returns {Promise<Medecament>} Une promesse qui se résout avec le médicament sauvegardé.
   */
  save(entity: Medecament): Promise<Medecament>;

  /**
   * Sauvegarde un tableau de médicaments complets.
   * @param {Medecament[]} entities - Le tableau de médicaments à sauvegarder.
   * @returns {Promise<Medecament[]>} Une promesse qui se résout avec le tableau de médicaments sauvegardés.
   */
  save(entities: Medecament[]): Promise<Medecament[]>;

  /**
   * Sauvegarde un tableau d'objets partiels représentant des médicaments.
   * @param {DeepPartial<Medecament>[]} entities - Le tableau d'objets partiels à sauvegarder.
   * @param {SaveOptions} [options] - Options de sauvegarde TypeORM (facultatif).
   * @returns {Promise<DeepPartial<Medecament>[]>} Une promesse qui se résout avec le tableau d'objets sauvegardés.
   */
  save<Entity extends DeepPartial<Medecament>>(
    entities: Entity[],
    options?: SaveOptions,
  ): Promise<Entity[]>;

  // ----------------------------------------------------------------------------
  // Méthode "save": implémentation
  // ----------------------------------------------------------------------------
  async save(
    entityOrEntities: Medecament | Medecament[] | DeepPartial<Medecament>[],
    options?: SaveOptions,
  ): Promise<Medecament | Medecament[]> {
    if (Array.isArray(entityOrEntities)) {
      // Sauvegarde un tableau de médicaments (entités complètes ou partielles)
      const savedEntities = await Promise.all(
        entityOrEntities.map(entity => this.save(entity as Medecament)), // Sauvegarde chaque médicament individuellement
      );
      return savedEntities;
    } else {
      // Sauvegarde un seul médicament (entité complète)
      const entity = entityOrEntities as Medecament;

      if (!entity.id) {
        // Si le médicament n'a pas d'ID, lui en attribuer un et l'ajouter au mock
        entity.id = this.getNextFreeId();
        this.mockData.push(entity);
      } else {
        // Sinon, mettre à jour le médicament existant dans le mock
        const index = this.mockData.findIndex(item => item.id === entity.id);
        if (index !== -1) {
          this.mockData[index] = entity;
        }
      }
      return Promise.resolve(entity); // Retourne le médicament sauvegardé
    }
  }

  // ----------------------------------------------------------------------------
  // Méthode "find": implémentation
  // ----------------------------------------------------------------------------

  /**
   * Simule la recherche de médicaments par ID de prescription.
   * @param options - Les options de recherche (peut contenir un ID de prescription).
   * @returns Une promesse qui se résout avec un tableau des médicaments trouvés.
   */
  find(options?: any): Promise<Medecament[]> {
    if (options && options.where && options.where.prescriptionId) {
      // Filtrer les médicaments par ID de prescription
      return Promise.resolve(
        this.mockData.filter(
          medecament => medecament.prescription.id === options.where.prescriptionId,
        ),
      );
    }
    return Promise.resolve(this.mockData); // Retourne tous les médicaments si aucun critère n'est spécifié
  }
}
