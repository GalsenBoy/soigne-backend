import { Module } from '@nestjs/common';
import { AvisController } from './avis.controller';
import { AvisService } from './avis.service';
import { Avis } from './avis.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sejour } from 'src/sejour/sejour.entity';
import { Medecin } from 'src/medecin/medecin.entity';
import { SejourService } from 'src/sejour/sejour.service';
import { User } from 'src/user/user.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Avis, Sejour, Medecin, User])],
  controllers: [AvisController],
  providers: [AvisService, SejourService]
})
export class AvisModule { }
