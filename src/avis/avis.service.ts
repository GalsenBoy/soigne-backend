import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Avis } from './avis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sejour } from 'src/sejour/sejour.entity';

@Injectable()
export class AvisService {
    constructor(@InjectRepository(Avis) private avisRepository: Repository<Avis>,
        @InjectRepository(Sejour) private sejourRepository: Repository<Sejour>) { }

    async createAvisWithMedecinId(avis: Avis, medecinId: string): Promise<Avis> {
        const sejour = await this.sejourRepository.findOne({ where: { medecin: { id: medecinId } } });
        if (!sejour) {
            throw new Error('Sejour not found');
        }
        const newAvis = this.avisRepository.create(avis);
        newAvis.medecin = sejour.medecin;
        newAvis.user = sejour.user;
        console.log('====================================');
        console.log(sejour.medecin, sejour.user);
        console.log('====================================');
        return await this.avisRepository.save(newAvis);
    }
}
