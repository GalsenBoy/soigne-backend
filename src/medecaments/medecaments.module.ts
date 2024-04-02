import { Module } from '@nestjs/common';
import { MedecamentsController } from './medecaments.controller';
import { MedecamentsService } from './medecaments.service';
import { Medecament } from './medecament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Medecament])],
  controllers: [MedecamentsController],
  providers: [MedecamentsService]
})
export class MedecamentsModule { }
