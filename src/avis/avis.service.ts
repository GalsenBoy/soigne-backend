import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Avis } from './avis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sejour } from 'src/sejour/sejour.entity';
import { Medecin } from 'src/medecin/medecin.entity';
import { SejourService } from 'src/sejour/sejour.service';

@Injectable()
export class AvisService {
    constructor(@InjectRepository(Avis) private avisRepository: Repository<Avis>,
        @InjectRepository(Sejour) private sejourRepository: Repository<Sejour>,
        @InjectRepository(Medecin) private medecinRepository: Repository<Medecin>,
        private readonly sejourService: SejourService
    ) { }


    async createAvis(avis: Avis, sejourId: string, medecinId: string) {
        const medecin = await this.medecinRepository.findOne({ where: { id: medecinId } });
        if (!medecin) {
            throw new Error('Medecin not found');
        }
        const sejour = await this.sejourRepository.findOne({ where: { id: sejourId }, relations: ['medecin', 'user'] });
        if (!sejour) {
            throw new Error('Sejour not found');
        }

        console.log('====================================');
        console.log(sejour.id);
        console.log('====================================');

        if (sejour.medecin.id !== medecin.id) {
            throw new Error('Medecin not assigned to this sejour');
        }

        const newAvis = this.avisRepository.create({
            ...avis,
            medecin,
            user: sejour.user,
            sejour,
        });

        console.log('====================================');
        console.log(sejour);
        console.log('====================================');

        return await this.avisRepository.save(newAvis);
    }


}
