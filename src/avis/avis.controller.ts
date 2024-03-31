import { Body, Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AvisService } from './avis.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Avis } from './avis.entity';

@Controller('avis')
export class AvisController {
    constructor(private readonly avisService: AvisService) { }

    @UseGuards(JwtAuthGuard)
    @Post(':sejourId')
    async createAvisWithMedecinId(@Param('sejourId') sejourId: string, @Body() avis: Avis, @Request() req) {
        return this.avisService.createAvis(avis, sejourId, req.user.id);
    }
}
