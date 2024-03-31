import { Body, Controller, Get, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { SejourService } from './sejour.service';
import { Sejour } from './sejour.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role.enum';


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
    @Get('medecin')
    async getSejoursByMedecinId(@Request() req) {
        return await this.sejourService.getSejoursByMedecinId(req.user.id);
    }

    // @Roles('Admin')
    // @SetMetadata('roles', [Role.Admin])
    @UseGuards(JwtAuthGuard)
    @Post('assign')
    async asignerMedecin(@Body() data: { sejourId: string, medecinId: string }) {
        return await this.sejourService.asignerMedecinandUser(data.sejourId, data.medecinId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('withoutmedecin')
    async getSejoursWithoutMedecin() {
        return await this.sejourService.getSejour();
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getSejourById(@Request() req) {
        return await this.sejourService.getSejourById(req.params.id);
    }
}
