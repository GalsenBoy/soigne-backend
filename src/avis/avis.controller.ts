import { Body, Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AvisService } from './avis.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Avis } from './avis.entity';
import { Prescription } from 'src/prescription/prescription.entity';

@Controller('avis')
export class AvisController {
    constructor(private readonly avisService: AvisService) { }

    @UseGuards(JwtAuthGuard)
    @Post(':sejourId')
    async createAvisWithMedecinId(@Param('sejourId') sejourId: string, @Body() avis: Avis, @Body() prescription: Prescription, @Request() req,) {
        return this.avisService.createAvisWithPrescription(avis, sejourId, req.user.id, prescription);
    }
}
