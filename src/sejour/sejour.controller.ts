import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SejourService } from './sejour.service';
import { Sejour } from './sejour.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Medecin } from 'src/medecin/medecin.entity';
import { log } from 'console';

@Controller('sejour')
export class SejourController {
    constructor(private readonly sejourService: SejourService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createSejour(@Request() req, @Body() sejourData: Sejour) {
        sejourData.user = req.user.id;
        // sejourData.medecin = medecin;

        return await this.sejourService.createSejour(sejourData);
    }

}
