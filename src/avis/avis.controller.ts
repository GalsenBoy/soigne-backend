import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AvisService } from './avis.service';
import { Avis } from './avis.entity';
import { Prescription } from 'src/prescription/prescription.entity';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/roles/role.guard';

@Controller('avis')
export class AvisController {
    constructor(private readonly avisService: AvisService) { }



    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Secretaire)
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
