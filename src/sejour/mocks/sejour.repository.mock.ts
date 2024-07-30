import { DeepPartial, Repository, SaveOptions } from 'typeorm';
import { Sejour } from '../sejour.entity';
import { mockSejourArray } from './sejour.data.mock';

export class MockSejourRepository extends Repository<Sejour> {
  /**
   * Stockage des données de séjour simulées.
   * Initialisé avec les données mock de `sejour.data.mock`.
   */
  private mockData: Sejour[] = mockSejourArray;

  /**
   * Compteur pour générer des ID uniques pour les nouveaux séjours.
   * Initialisé en fonction des données mock existantes.
   */
  private nextId = mockSejourArray.length + 1;

  /**
   * Génère le prochain ID disponible (sous forme de chaîne de caractères).
   * @returns {string} Le prochain ID disponible.
   */
  private getNextFreeId(): string {
    // Incrémente et renvoie l'ID sous forme de chaîne
    return (this.nextId++).toString();
  }

  // ----------------------------------------------------------------------------
  // Méthode "create": surcharges
  // ----------------------------------------------------------------------------

  /**
   * Crée un nouveau séjour vide avec un ID généré.
   * @returns {Sejour} Le nouveau séjour.
   */
  create(): Sejour;

  /**
   * Crée un nouveau séjour à partir de données partielles.
   * @param {DeepPartial<Sejour>} sejourData - Les données partielles du séjour.
   * @returns {Sejour} Le nouveau séjour.
   */
  create(sejourData: DeepPartial<Sejour>): Sejour;

  /**
   * Crée plusieurs nouveaux séjours à partir d'un tableau de données partielles.
   * @param {DeepPartial<Sejour>[]} sejourArray - Le tableau de données partielles des séjours.
   * @returns {Sejour[]} Les nouveaux séjours.
   */
  create(sejourArray: DeepPartial<Sejour>[]): Sejour[];

  // ----------------------------------------------------------------------------
  // Méthode "create": implémentation
  // ----------------------------------------------------------------------------
  create(sejourData?: DeepPartial<Sejour> | DeepPartial<Sejour>[]): Sejour | Sejour[] {
    if (sejourData === undefined) {
      // Crée un séjour vide avec un ID généré
      return { id: this.getNextFreeId() } as Sejour;
    } else if (Array.isArray(sejourData)) {
      // Crée un tableau de séjours à partir des données partielles fournies
      return sejourData.map(sejourEntity => this.create(sejourEntity)) as Sejour[];
    } else {
      // Crée un seul séjour à partir des données partielles fournies, avec un ID généré
      return {
        id: this.getNextFreeId(),
        ...sejourData,
        // Initialisation des propriétés manquantes avec des valeurs par défaut
        motif: sejourData.motif || '',
        specialite: sejourData.specialite || '',
        // Ou une valeur par défaut appropriée pour 'user'
        user: sejourData.user || null,
      } as Sejour;
    }
  }

  // ----------------------------------------------------------------------------
  // Méthode "save": surcharges
  // ----------------------------------------------------------------------------

  /**
   * Sauvegarde un séjour complet.
   * @param {Sejour} sejourEntity - Le séjour à sauvegarder.
   * @returns {Promise<Sejour>} Une promesse qui se résout avec le séjour sauvegardé.
   */
  save(sejourEntity: Sejour): Promise<Sejour>;

  /**
   * Sauvegarde un tableau de séjours complets.
   * @param {Sejour[]} sejourEntityArray - Le tableau de séjours à sauvegarder.
   * @returns {Promise<Sejour[]>} Une promesse qui se résout avec le tableau de séjours sauvegardés.
   */
  save(sejourEntityArray: Sejour[]): Promise<Sejour[]>;

  /**
   * Sauvegarde un tableau d'objets partiels représentant des séjours.
   * @param {DeepPartial<Sejour>[]} sejourEntityArray - Le tableau d'objets partiels à sauvegarder.
   * @param {SaveOptions} [options] - Options de sauvegarde TypeORM (facultatif).
   * @returns {Promise<DeepPartial<Sejour>[]>} Une promesse qui se résout avec le tableau d'objets sauvegardés.
   */
  save<Entity extends DeepPartial<Sejour>>(
    sejourEntityArray: Entity[],
    options?: SaveOptions,
  ): Promise<Entity[]>;

  // ----------------------------------------------------------------------------
  // Méthode "save": implémentation
  // ----------------------------------------------------------------------------
  async save(
    sejourDataOrArray: Sejour | Sejour[] | DeepPartial<Sejour>[],
    options?: SaveOptions,
  ): Promise<Sejour | Sejour[]> {
    if (Array.isArray(sejourDataOrArray)) {
      // Sauvegarde un tableau de séjours (entités complètes ou partielles)
      const sejourEntityArray = sejourDataOrArray as (DeepPartial<Sejour> | Sejour)[];
      const savedEntities = await Promise.all(
        // Sauvegarde chaque séjour individuel
        sejourEntityArray.map(sejourEntity => this.save(sejourEntity as Sejour)),
      );
      // Retourne un tableau de Sejour
      return savedEntities as Sejour[];
    } else {
      // Sauvegarde un seul séjour (entité complète)
      const sejourEntity = sejourDataOrArray as Sejour;

      if (!sejourEntity.id) {
        // Si le séjour n'a pas d'ID, lui en attribuer un et l'ajouter au mock
        sejourEntity.id = this.getNextFreeId();
        this.mockData.push(sejourEntity);
      } else {
        // Sinon, mettre à jour le séjour existant dans le mock
        const index = this.mockData.findIndex(item => item.id === sejourEntity.id);
        if (index !== -1) {
          this.mockData[index] = sejourEntity;
        }
      }

      // Retourne le séjour sauvegardé
      return Promise.resolve(sejourEntity);
    }
  }
}
