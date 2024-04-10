import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
// import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('prescription')
export class PrescriptionController {
    constructor(private readonly prescriptionService: PrescriptionService) { }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getPrescriptionsById(id: string) {
        return this.prescriptionService.getPrescriptionsById(id);
    }
}
