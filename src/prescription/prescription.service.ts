import { Injectable } from '@nestjs/common';
import { Prescription } from './prescription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medecament } from 'src/medecaments/medecament.entity';

@Injectable()
export class PrescriptionService {
    constructor(@InjectRepository(Prescription) private prescriptionRepository: Repository<Prescription>
        , @InjectRepository(Medecament) private medecamentRepository: Repository<Medecament>) { }

    async createPrescription(prescription: Prescription) {
        const newPrescription = this.prescriptionRepository.create(prescription);
        newPrescription.medecament = this.medecamentRepository.create(prescription.medecament);
        return this.prescriptionRepository.save(newPrescription);
    }
}
