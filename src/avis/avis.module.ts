import { Module } from '@nestjs/common';
import { AvisController } from './avis.controller';
import { AvisService } from './avis.service';
import { Avis } from './avis.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sejour } from 'src/sejour/sejour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avis, Sejour])],
  controllers: [AvisController],
  providers: [AvisService]
})
export class AvisModule { }
