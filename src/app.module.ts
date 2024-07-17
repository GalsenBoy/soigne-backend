import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AvisModule } from './avis/avis.module';
import { MedecamentsModule } from './medecaments/medecaments.module';
import { MedecinModule } from './medecin/medecin.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { RolesGuard } from './roles/role.guard';
import { SejourModule } from './sejour/sejour.module';
import { UserModule } from './user/user.module';
// import { AccessContorlService } from 'src/roles/access.control';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MedecinModule,
    SejourModule,
    AvisModule,
    PrescriptionModule,
    MedecamentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
