import { Module } from '@nestjs/common';
import { Medecament } from './medecament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Medecament])],

})
export class MedecamentsModule { }
