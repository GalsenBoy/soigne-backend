import { DeepPartial, Repository, SaveOptions } from 'typeorm';
import { Avis } from '../avis.entity';
import { mockAvisArray } from './avis.data.mock';

export class MockAvisRepository extends Repository<Avis> {
  /**
   * Stockage des données des avis simulées.
   * Initialisé avec les données mock de `avis.data.mock`.
   */
  private mockData: Avis[] = mockAvisArray;

  /**
   * Compteur pour générer des ID uniques pour les nouveaux avis.
   * Initialisé en fonction des données mock existantes.
   */
  private nextId = mockAvisArray.length + 1;

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
   * Crée un nouvel avis vide avec un ID généré.
   * @returns {Avis} Le nouvel avis.
   */
  create(): Avis;

  /**
   * Crée un nouvel avis à partir de données partielles.
   * @param {DeepPartial<Avis>} avisData - Les données partielles de l'avis.
   * @returns {Avis} Le nouvel avis.
   */
  create(avisData: DeepPartial<Avis>): Avis;

  /**
   * Crée plusieurs nouveaux avis à partir d'un tableau de données partielles.
   * @param {DeepPartial<Avis>[]} avisArray - Le tableau de données partielles des avis.
   * @returns {Avis[]} Les nouveaux avis.
   */
  create(avisArray: DeepPartial<Avis>[]): Avis[];

  // ----------------------------------------------------------------------------
  // Méthode "create": implémentation
  // ----------------------------------------------------------------------------
  create(avisData?: DeepPartial<Avis> | DeepPartial<Avis>[]): Avis | Avis[] {
    if (avisData === undefined) {
      // Crée un avis vide avec un ID généré
      return { id: this.getNextFreeId() } as Avis;
    } else if (Array.isArray(avisData)) {
      // Crée un tableau de avis à partir des données partielles fournies
      return avisData.map(avisEntity => this.create(avisEntity)) as Avis[];
    } else {
      // Crée un seul avis à partir des données partielles fournies, avec un ID généré
      return {
        id: this.getNextFreeId(),
        ...avisData,
        // Ou une valeur par défaut appropriée pour 'user'
        user: avisData.user || null,
      } as Avis;
    }
  }

  // ----------------------------------------------------------------------------
  // Méthode "save": surcharges
  // ----------------------------------------------------------------------------

  /**
   * Sauvegarde un avis complet.
   * @param {Avis} avisEntity - L'avis' à sauvegarder.
   * @returns {Promise<Avis>} Une promesse qui se résout avec l'avis sauvegardé.
   */
  save(avisEntity: Avis): Promise<Avis>;

  /**
   * Sauvegarde un tableau de avis complets.
   * @param {Avis[]} avisEntityArray - Le tableau de avis à sauvegarder.
   * @returns {Promise<Avis[]>} Une promesse qui se résout avec le tableau de avis sauvegardés.
   */
  save(avisEntityArray: Avis[]): Promise<Avis[]>;

  /**
   * Sauvegarde un tableau d'objets partiels représentant des avis.
   * @param {DeepPartial<Avis>[]} avisEntityArray - Le tableau d'objets partiels à sauvegarder.
   * @param {SaveOptions} [options] - Options de sauvegarde TypeORM (facultatif).
   * @returns {Promise<DeepPartial<Avis>[]>} Une promesse qui se résout avec le tableau d'objets sauvegardés.
   */
  save<Entity extends DeepPartial<Avis>>(
    avisEntityArray: Entity[],
    options?: SaveOptions,
  ): Promise<Entity[]>;

  // ----------------------------------------------------------------------------
  // Méthode "save": implémentation
  // ----------------------------------------------------------------------------
  async save(
    avisDataOrArray: Avis | Avis[] | DeepPartial<Avis>[],
    options?: SaveOptions,
  ): Promise<Avis | Avis[]> {
    if (Array.isArray(avisDataOrArray)) {
      // Sauvegarde un tableau de avis (entités complètes ou partielles)
      const avisEntityArray = avisDataOrArray as (DeepPartial<Avis> | Avis)[];
      const savedEntities = await Promise.all(
        // Sauvegarde chaque avis individuel
        avisEntityArray.map(avisEntity => this.save(avisEntity as Avis)),
      );
      // Retourne un tableau de Avis
      return savedEntities as Avis[];
    } else {
      // Sauvegarde un seul avis (entité complète)
      const avisEntity = avisDataOrArray as Avis;

      if (!avisEntity.id) {
        // Si l'avis n'a pas d'ID, lui en attribuer un et l'ajouter au mock
        avisEntity.id = this.getNextFreeId();
        this.mockData.push(avisEntity);
      } else {
        // Sinon, mettre à jour l'avis existant dans le mock
        const index = this.mockData.findIndex(item => item.id === avisEntity.id);
        if (index !== -1) {
          this.mockData[index] = avisEntity;
        }
      }

      // Retourne l'avis sauvegardé
      return Promise.resolve(avisEntity);
    }
  }
}
