import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { Medecin } from './medecin.entity';
import { Roles } from 'src/roles/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('medecin')
export class MedecinController {
    constructor(private readonly medecinService: MedecinService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createMedecin(@Body() medecin: Medecin): Promise<Medecin> {
        return await this.medecinService.createMedecin(medecin);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMedecins(): Promise<Medecin[]> {
        return await this.medecinService.getMedecins();
    }
}
