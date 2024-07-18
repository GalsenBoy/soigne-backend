import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Avis } from './avis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sejour } from '../sejour/sejour.entity';
import { Medecin } from '../medecin/medecin.entity';
import { Prescription } from '../prescription/prescription.entity';
import { Medecament } from '../medecaments/medecament.entity';

export type PrescriptionData = Pick<Prescription, 'date'> & {
  medecament: Medecament[];
};

@Injectable()
export class AvisService {
  constructor(
    @InjectRepository(Avis) private avisRepository: Repository<Avis>,
    @InjectRepository(Sejour) private sejourRepository: Repository<Sejour>,
    @InjectRepository(Medecin) private medecinRepository: Repository<Medecin>,
    @InjectRepository(Medecament)
    private readonly medecamentRepository: Repository<Medecament>,
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
  ) {}

  async getAvis() {
    return await this.avisRepository.find({
      relations: [
        'medecin',
        'user',
        'sejour',
        'prescription',
        'prescription.medecament',
      ],
    });
  }

  async createAvisWithPrescription(
    avis: Avis,
    sejourId: string,
    medecinId: string,
    prescriptionData: PrescriptionData,
  ) {
    const medecin = await this.medecinRepository.findOne({ where: { id: medecinId } });
    if (!medecin) {
      throw new Error('Medecin not found');
    }
    const sejour = await this.sejourRepository.findOne({
      where: { id: sejourId },
      relations: ['medecin', 'user'],
    });
    if (!sejour) {
      throw new Error('Sejour not found');
    }

    if (sejour.medecin.id !== medecin.id) {
      throw new Error('Medecin not assigned to this sejour');
    }

    const newPrescription = this.prescriptionRepository.create(prescriptionData);
    const savedPrescription = await this.prescriptionRepository.save(newPrescription);
    if (prescriptionData.medecament) {
      const newMedecaments = prescriptionData.medecament.map(medecamentData => {
        const newMedecament = this.medecamentRepository.create({
          medicament: medecamentData.medicament,
          posologie: medecamentData.posologie,
          prescription: savedPrescription,
        });
        return newMedecament;
      });
      await this.medecamentRepository.save(newMedecaments);
      const newAvis = this.avisRepository.create({
        ...avis,
        medecin,
        user: sejour.user,
        sejour,
        prescription: savedPrescription,
      });

      return await this.avisRepository.save(newAvis);
    }
  }
}
