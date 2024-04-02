import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { MedecinModule } from './medecin/medecin.module';
import { SejourModule } from './sejour/sejour.module';
import { Sejour } from './sejour/sejour.entity';
import { Medecin } from './medecin/medecin.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/role.guard';
import { AvisModule } from './avis/avis.module';
import { Avis } from './avis/avis.entity';
import { PrescriptionModule } from './prescription/prescription.module';
import { MedecamentsModule } from './medecaments/medecaments.module';
import { Medecament } from './medecaments/medecament.entity';
import { Prescription } from './prescription/prescription.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'e_sante',
    entities: [User, Sejour, Medecin, Avis, Prescription, Medecament],
    synchronize: true,
  }), AuthModule, UserModule, ConfigModule.forRoot({ isGlobal: true }), MedecinModule, SejourModule, AvisModule, PrescriptionModule, MedecamentsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule { }
