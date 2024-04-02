import { Module } from '@nestjs/common';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';
import { Prescription } from './prescription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medecament } from 'src/medecaments/medecament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription, Medecament])],
  controllers: [PrescriptionController],
  providers: [PrescriptionService]
})
export class PrescriptionModule { }
