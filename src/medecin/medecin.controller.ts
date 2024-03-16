import { Body, Controller, Post } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { Medecin } from './medecin.entity';

@Controller('medecin')
export class MedecinController {
    constructor(private readonly medecinService: MedecinService) { }

    @Post()
    async createMedecin(@Body() medecin: Medecin): Promise<Medecin> {
        return await this.medecinService.createMedecin(medecin);
    }
}
