import { Module } from '@nestjs/common';
import { AvisController } from './avis.controller';
import { AvisService } from './avis.service';
import { Avis } from './avis.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sejour } from 'src/sejour/sejour.entity';
import { Medecin } from 'src/medecin/medecin.entity';
import { SejourService } from 'src/sejour/sejour.service';
import { User } from 'src/user/user.entity';
import { Medecament } from 'src/medecaments/medecament.entity';
import { Prescription } from 'src/prescription/prescription.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Avis, Sejour, Medecin, User, Medecament, Prescription])],
  controllers: [AvisController],
  providers: [AvisService, SejourService]
})
export class AvisModule { }
