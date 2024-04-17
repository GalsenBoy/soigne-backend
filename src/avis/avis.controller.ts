import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AvisService } from './avis.service';
import { Avis } from './avis.entity';
import { Prescription } from '../prescription/prescription.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';



@Controller('avis')
export class AvisController {
    constructor(private readonly avisService: AvisService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAvis() {
        return this.avisService.getAvis();
    }

    @UseGuards(JwtAuthGuard)
    @Post(':sejourId')
    async createAvisWithMedecinId(@Param('sejourId') sejourId: string, @Body() avis: Avis, @Body() prescription: Prescription, @Request() req,) {
        return this.avisService.createAvisWithPrescription(avis, sejourId, req.user.id, prescription);
    }
}
