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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'e_sante',
    entities: [User, Sejour, Medecin],
    synchronize: true,
  }), AuthModule, UserModule, ConfigModule.forRoot({ isGlobal: true }), MedecinModule, SejourModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
