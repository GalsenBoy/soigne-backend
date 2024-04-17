import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { Medecin } from './medecin.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';


@Controller('medecin')
export class MedecinController {
    constructor(private readonly medecinService: MedecinService) { }


    @Post()
    async createMedecin(@Body() medecin: Medecin): Promise<Medecin> {
        return await this.medecinService.createMedecin(medecin);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMedecins(): Promise<Medecin[]> {
        return await this.medecinService.getMedecins();
    }

    @UseGuards(JwtAuthGuard)
    @Get('limit')
    async limitMedecinsWithFiveSejours(): Promise<Medecin[]> {
        return await this.medecinService.limitMedecinsWithFiveSejours();
    }
}
