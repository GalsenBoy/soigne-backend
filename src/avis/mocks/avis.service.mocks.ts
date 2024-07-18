import { Repository, DeepPartial } from 'typeorm';
import { Avis } from '../avis.entity';
import { Medecin } from '../../medecin/medecin.entity';
import { User } from '../../user/user.entity';
import { Sejour } from '../../sejour/sejour.entity';
import { Prescription } from '../../prescription/prescription.entity';
import { Medecament } from '../../medecaments/medecament.entity';

export class AvisServiceMock extends Repository<Avis> {
  private mockData: Avis[] = [];
  private nextId = 1;

  /**
   * Génère le prochain ID disponible (sous forme de chaîne de caractères).
   * @returns {string} Le prochain ID disponible.
   */
  private getNextFreeId(): string {
    // Incrémente et renvoie l'ID sous forme de chaîne
    return (this.nextId++).toString();
  }

  // Méthode create : surcharges pour différents types d'arguments
  create(): Avis;
  create(avisData: DeepPartial<Avis>): Avis;
  create(avisArray: DeepPartial<Avis>[]): Avis[];
  create(avisData?: DeepPartial<Avis> | DeepPartial<Avis>[]): Avis | Avis[] {
    if (avisData === undefined) {
      // Crée un avis vide avec un ID généré
      return { id: this.getNextFreeId() } as Avis;
    } else if (Array.isArray(avisData)) {
      // Crée un tableau d'avis à partir des données partielles fournies
      return avisData.map(avisEntity => this.create(avisEntity)) as Avis[];
    } else {
      // Crée un seul avis à partir des données partielles fournies, avec un ID généré
      return {
        id: this.getNextFreeId(),
        ...avisData,
        medecin: avisData.medecin || ({} as Medecin), // Assurez-vous que medecin est défini
        user: avisData.user || ({} as User), // Assurez-vous que user est défini
        sejour: avisData.sejour || ({} as Sejour), // Assurez-vous que sejour est défini
        prescription: avisData.prescription || ({} as Prescription), // Assurez-vous que prescription est défini
      } as Avis;
    }
  }

  // Méthode save : surcharges pour différents types d'arguments
  save(avis: Avis): Promise<Avis>;
  save(avisArray: Avis[]): Promise<Avis[]>;
  save<Entity extends DeepPartial<Avis>>(
    avisArray: Entity[],
    options?: any,
  ): Promise<Entity[]>;

  // Méthode save : implémentation
  async save(
    avisDataOrArray: Avis | Avis[] | DeepPartial<Avis>[],
    options?: any,
  ): Promise<Avis | Avis[]> {
    if (Array.isArray(avisDataOrArray)) {
      // Sauvegarde un tableau d'avis (entités complètes ou partielles)
      const avisEntityArray = avisDataOrArray as (DeepPartial<Avis> | Avis)[];
      const savedEntities = await Promise.all(
        avisEntityArray.map(avisEntity => this.save(avisEntity as Avis)),
      );
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

      return Promise.resolve(avisEntity);
    }
  }
}
