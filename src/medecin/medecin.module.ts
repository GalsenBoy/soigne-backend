import { Module } from '@nestjs/common';
import { MedecinController } from './medecin.controller';
import { MedecinService } from './medecin.service';
import { Medecin } from './medecin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Medecin])],
  controllers: [MedecinController],
  providers: [MedecinService]
})
export class MedecinModule { }
