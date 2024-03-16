import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, Repository } from 'typeorm';
import { Sejour } from './sejour.entity';
import { SejourDto } from 'src/dtos/sejour.dto';
import { Medecin } from 'src/medecin/medecin.entity';

@Injectable()
export class SejourService {
    constructor(@InjectRepository(Sejour) private sejourRepository: Repository<Sejour>,
        @InjectRepository(Medecin) private medecinRepository: Repository<Medecin>) { }


    async createSejour(sejour: Sejour) {
        const newSejour = this.sejourRepository.create(sejour);
        return await this.sejourRepository.save(newSejour);
    }

    async findMedecinBySpeciality(specialite: string, id: string): Promise<Medecin> {
        return await this.medecinRepository.findOne(
            { where: { specialite: specialite, id: id } }
        );
    }
}
