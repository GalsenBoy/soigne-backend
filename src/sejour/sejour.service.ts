import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sejour } from './sejour.entity';
import { Medecin } from '../medecin/medecin.entity';
import { User } from '../user/user.entity';

@Injectable()
export class SejourService {
    constructor(@InjectRepository(Sejour) private sejourRepository: Repository<Sejour>,
        @InjectRepository(Medecin) private medecinRepository: Repository<Medecin>,
        @InjectRepository(User) private userRepository: Repository<User>) { }


    async createSejour(sejour: Sejour) {
        const newSejour = this.sejourRepository.create(sejour);

        console.log(newSejour);
        return await this.sejourRepository.save(newSejour);
    }

    async getSejour() {
        return await this.sejourRepository.find({ relations: ['user', 'medecin'] });
    }

    async getSejours() {
        const sejourWithoutMedecins = await this.sejourRepository.find({ relations: ['user', 'medecin'] });
        return sejourWithoutMedecins.filter(sejourWithoutMedecin => !sejourWithoutMedecin.medecin);
    }

    async getSejoursByUserId(id: string) {
        return await this.sejourRepository.find({ where: { user: { id } } });
    }

    async getSejoursByMedecinIdWithoutAvis(id: string) {
        return await this.sejourRepository.find({ where: { medecin: { id } }, relations: ['avis'] });
    }

    async getSejourById(id: string) {
        const sejour = this.sejourRepository.findOne({ where: { id } });
        if (!sejour) {
            throw new Error('Sejour not found');
        }
        return sejour;
    }


    async asignerMedecinandUser(sejourId: string, medecinId: string) {
        const sejour = await this.sejourRepository.findOne({
            where: { id: sejourId },
            relations: ['user']
        });
        const medecin = await this.medecinRepository.findOne({ where: { id: medecinId, specialite: sejour.specialite } });
        sejour.medecin = medecin;
        return await this.sejourRepository.save(sejour);
    }
}
