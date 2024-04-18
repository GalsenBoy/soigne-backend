import { Module } from '@nestjs/common';
import { Prescription } from './prescription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription])],
})
export class PrescriptionModule { }
