import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SejourService } from './sejour.service';
import { Sejour } from './sejour.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Medecin } from 'src/medecin/medecin.entity';
import { log } from 'console';

@Controller('sejour')
export class SejourController {
    constructor(private readonly sejourService: SejourService) { }

    @UseGuards(JwtAuthGuard) // Utilisez le JwtAuthGuard pour protéger cette route
    @Post()
    async createSejour(@Request() req, @Body() sejourData: Sejour) {
        const userId = req.user.id;

        // Récupérez le médecin en fonction de la spécialité saisie par l'utilisateur
        const medecin: Medecin = await this.sejourService.findMedecinBySpeciality(sejourData.medecin.specialite, sejourData.medecin.id);

        if (!medecin) {
            throw new Error('Médecin non trouvé');
        }
        sejourData.user = userId;
        sejourData.medecin = medecin;

        return await this.sejourService.createSejour(sejourData);
    }

}
