import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SejourService } from './sejour.service';
import { Sejour } from './sejour.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/roles/role.decorator';


@Controller('sejour')
export class SejourController {
    constructor(private readonly sejourService: SejourService) { }



    // @Roles('Admin')
    @UseGuards(JwtAuthGuard)
    @Get()
    async getSejours() {
        return await this.sejourService.getSejours();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createSejour(@Request() req, @Body() sejourData: Sejour) {
        sejourData.user = req.user.id;
        return await this.sejourService.createSejour(sejourData);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getSejoursByUserId(@Request() req) {
        return await this.sejourService.getSejoursByUserId(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('assign')
    async asignerMedecin(@Body() data: { sejourId: string, medecinId: string }) {
        return await this.sejourService.asignerMedecin(data.sejourId, data.medecinId);
    }

}
