import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Avis } from './avis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sejour } from 'src/sejour/sejour.entity';
import { Medecin } from 'src/medecin/medecin.entity';
import { SejourService } from 'src/sejour/sejour.service';
import { Prescription } from 'src/prescription/prescription.entity';
import { Medecament } from 'src/medecaments/medecament.entity';

export type PrescriptionData = Pick<Prescription, 'date'> & {
    medecament: Medecament[];
};

@Injectable()
export class AvisService {
    constructor(@InjectRepository(Avis) private avisRepository: Repository<Avis>,
        @InjectRepository(Sejour) private sejourRepository: Repository<Sejour>,
        @InjectRepository(Medecin) private medecinRepository: Repository<Medecin>,
        @InjectRepository(Medecament) private readonly medecamentRepository: Repository<Medecament>,
        @InjectRepository(Prescription) private prescriptionRepository: Repository<Prescription>,
    ) { }


    // async createAvisWithPrescription(avis: Avis, sejourId: string, medecinId: string, prescriptionData: any) {
    //     const medecin = await this.medecinRepository.findOne({ where: { id: medecinId } });
    //     if (!medecin) {
    //         throw new Error('Medecin not found');
    //     }

    //     const sejour = await this.sejourRepository.findOne({ where: { id: sejourId }, relations: ['medecin', 'user'] });
    //     if (!sejour) {
    //         throw new Error('Sejour not found');
    //     }

    //     if (sejour.medecin.id !== medecin.id) {
    //         throw new Error('Medecin not assigned to this sejour');
    //     }

    //     if (!prescriptionData.medecament || !Array.isArray(prescriptionData.medecament)) {
    //         throw new Error('Invalid medecament data');
    //     }

    //     const newPrescription = this.prescriptionRepository.create({
    //         medecament: prescriptionData.medecament.map((medecament) => {
    //             return this.medecamentRepository.create(medecament);
    //         }),
    //     });
    //     const savedPrescription = await this.prescriptionRepository.save(newPrescription);

    //     const newAvis = this.avisRepository.create({
    //         ...avis,
    //         medecin,
    //         user: sejour.user,
    //         sejour,
    //         prescription: savedPrescription,
    //     });

    //     return await this.avisRepository.save(newAvis);
    // }

    // async createAvisWithPrescription(avis: Avis, sejourId: string, medecinId: string, prescriptionData: any) {
    //     const medecin = await this.medecinRepository.findOne({ where: { id: medecinId } });
    //     if (!medecin) {
    //         throw new Error('Medecin not found');
    //     }

    //     const sejour = await this.sejourRepository.findOne({ where: { id: sejourId }, relations: ['medecin', 'user'] });
    //     if (!sejour) {
    //         throw new Error('Sejour not found');
    //     }

    //     if (sejour.medecin.id !== medecin.id) {
    //         throw new Error('Medecin not assigned to this sejour');
    //     }

    //     if (!prescriptionData.medecament || !Array.isArray(prescriptionData.medecament)) {
    //         throw new Error('Invalid medecament data');
    //     }

    //     const newPrescription = this.prescriptionRepository.create({
    //         medecament: prescriptionData.medecament.map((medecament) => {
    //             return this.medecamentRepository.create(medecament);
    //         }),
    //     });
    //     const savedPrescription = await this.prescriptionRepository.save(newPrescription);

    //     const newAvis = this.avisRepository.create({
    //         ...avis,
    //         medecin,
    //         user: sejour.user,
    //         sejour,
    //         prescription: savedPrescription,
    //     });

    //     return await this.avisRepository.save(newAvis);
    // }

    async createAvisWithPrescription(avis: Avis, sejourId: string, medecinId: string, prescriptionData: PrescriptionData) {
        const medecin = await this.medecinRepository.findOne({ where: { id: medecinId } });
        if (!medecin) {
            throw new Error('Medecin not found');
        }
        const sejour = await this.sejourRepository.findOne({ where: { id: sejourId }, relations: ['medecin', 'user'] });
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