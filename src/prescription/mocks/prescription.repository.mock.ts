import { DeepPartial, Repository, SaveOptions } from 'typeorm';
import { Prescription } from '../prescription.entity';

export class MockPrescriptionRepository extends Repository<Prescription> {
  /**
   * Stockage des données de prescription simulées.
   */
  private mockData: Prescription[] = [];

  /**
   * Compteur pour générer des ID uniques pour les nouvelles prescriptions.
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
   * Crée une nouvelle prescription vide avec un ID généré.
   * @returns {Prescription} La nouvelle prescription.
   */
  create(): Prescription;

  /**
   * Crée une nouvelle prescription à partir de données partielles.
   * @param {DeepPartial<Prescription>} entityLike - Les données partielles de la prescription.
   * @returns {Prescription} La nouvelle prescription.
   */
  create(entityLike: DeepPartial<Prescription>): Prescription;

  /**
   * Crée plusieurs nouvelles prescriptions à partir d'un tableau de données partielles.
   * @param {DeepPartial<Prescription>[]} entityLikes - Le tableau de données partielles des prescriptions.
   * @returns {Prescription[]} Les nouvelles prescriptions.
   */
  create(entityLikes: DeepPartial<Prescription>[]): Prescription[];

  // ----------------------------------------------------------------------------
  // Méthode "create": implémentation
  // ----------------------------------------------------------------------------
  create(
    entityLike?: DeepPartial<Prescription> | DeepPartial<Prescription>[],
  ): Prescription | Prescription[] {
    if (entityLike === undefined) {
      // Crée une prescription vide avec un ID généré
      return { id: this.getNextFreeId() } as Prescription;
    } else if (Array.isArray(entityLike)) {
      // Crée un tableau de prescriptions à partir des données partielles fournies
      return entityLike.map(entity => this.create(entity)) as Prescription[];
    } else {
      // Crée une seule prescription à partir des données partielles fournies, avec un ID généré
      return { id: this.getNextFreeId(), ...entityLike } as Prescription;
    }
  }

  // ----------------------------------------------------------------------------
  // Méthode "save": surcharges
  // ----------------------------------------------------------------------------

  /**
   * Sauvegarde une prescription complète.
   * @param {Prescription} entity - La prescription à sauvegarder.
   * @returns {Promise<Prescription>} Une promesse qui se résout avec la prescription sauvegardée.
   */
  save(entity: Prescription): Promise<Prescription>;

  /**
   * Sauvegarde un tableau de prescriptions complètes.
   * @param {Prescription[]} entities - Le tableau de prescriptions à sauvegarder.
   * @returns {Promise<Prescription[]>} Une promesse qui se résout avec le tableau de prescriptions sauvegardées.
   */
  save(entities: Prescription[]): Promise<Prescription[]>;

  /**
   * Sauvegarde un tableau d'objets partiels représentant des prescriptions.
   * @param {DeepPartial<Prescription>[]} entities - Le tableau d'objets partiels à sauvegarder.
   * @param {SaveOptions} [options] - Options de sauvegarde TypeORM (facultatif).
   * @returns {Promise<DeepPartial<Prescription>[]>} Une promesse qui se résout avec le tableau d'objets sauvegardés.
   */
  save<Entity extends DeepPartial<Prescription>>(
    entities: Entity[],
    options?: SaveOptions,
  ): Promise<Entity[]>;

  // ----------------------------------------------------------------------------
  // Méthode "save": implémentation
  // ----------------------------------------------------------------------------
  async save(
    entityOrEntities: Prescription | Prescription[] | DeepPartial<Prescription>[],
    options?: SaveOptions,
  ): Promise<Prescription | Prescription[]> {
    if (Array.isArray(entityOrEntities)) {
      // Sauvegarde un tableau de prescriptions (entités complètes ou partielles)
      const entities = entityOrEntities as (DeepPartial<Prescription> | Prescription)[];
      const savedEntities = await Promise.all(
        entities.map(entity => this.save(entity as Prescription)), // Sauvegarde chaque prescription individuellement
      );
      return savedEntities as Prescription[]; // Retourne un tableau de Prescription
    } else {
      // Sauvegarde une seule prescription (entité complète)
      const entity = entityOrEntities as Prescription;

      if (!entity.id) {
        // Si la prescription n'a pas d'ID, lui en attribuer un et l'ajouter au mock
        entity.id = this.getNextFreeId();
        this.mockData.push(entity);
      } else {
        // Sinon, mettre à jour la prescription existante dans le mock
        const index = this.mockData.findIndex(item => item.id === entity.id);
        if (index !== -1) {
          this.mockData[index] = entity;
        }
      }

      return Promise.resolve(entity); // Retourne la prescription sauvegardée
    }
  }
}
