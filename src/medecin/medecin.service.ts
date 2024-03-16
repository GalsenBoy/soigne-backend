import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medecin } from './medecin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedecinService {
    constructor(@InjectRepository(Medecin) private medecinRepository: Repository<Medecin>) { }

    async createMedecin(medecin: Medecin): Promise<Medecin> {
        const newMedecin = await this.medecinRepository.create(medecin);
        return await this.medecinRepository.save(newMedecin);
    }
}
