import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medecin } from './medecin.entity';
import { Repository } from 'typeorm';
import { Sejour } from 'src/sejour/sejour.entity';

@Injectable()
export class MedecinService {
    constructor(@InjectRepository(Medecin) private medecinRepository: Repository<Medecin>) { }

    async createMedecin(medecin: Medecin): Promise<Medecin> {
        const newMedecin = await this.medecinRepository.create(medecin);
        return await this.medecinRepository.save(newMedecin);
    }

    async getMedecins(): Promise<Medecin[]> {
        return await this.medecinRepository.find();
    }


    async limitMedecinsWithFiveSejours(): Promise<Medecin[]> {
        const medecins = await this.medecinRepository.find({ relations: ['sejours'] });
        const today = new Date();
        const medecinSejourOfDay = medecins.filter(medecin => {
            const count = medecin.sejours.filter(sejour => {
                const dateEntree = new Date(sejour.dateEntree);
                const dateSortie = new Date(sejour.dateSortie);
                return (dateEntree <= today && today <= dateSortie);
            }).length;
            return count < 5;
        });
        return medecinSejourOfDay;
    }
}
