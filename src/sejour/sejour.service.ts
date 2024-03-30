import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sejour } from './sejour.entity';
import { SejourDto } from 'src/dtos/sejour.dto';
import { Medecin } from 'src/medecin/medecin.entity';
import { User } from 'src/user/user.entity';

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

    async getSejours() {
        const sejourWithoutMedecins = await this.sejourRepository.find();
        return sejourWithoutMedecins.filter(sejourWithoutMedecin => !sejourWithoutMedecin.medecin);
    }

    async getSejoursByUserId(id: string) {
        return await this.sejourRepository.find({ where: { user: { id } } });
    }

    async getSejoursByMedecinId(id: string) {
        return await this.sejourRepository.find({ where: { medecin: { id } } });
    }


    async asignerMedecinandUser(sejourId: string, medecinId: string, userId: string) {
        const sejour = await this.sejourRepository.findOne({ where: { id: sejourId } });
        const medecin = await this.medecinRepository.findOne({ where: { id: medecinId } });
        sejour.medecin = medecin;
        sejour.user = await this.userRepository.findOne({ where: { id: userId } }); // Replace 'this.userRepository' with the actual repository for the 'User' entity
        return await this.sejourRepository.save(sejour);
    }
}
