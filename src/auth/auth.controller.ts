import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dtos/user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { JwtAuthGuard } from './jwt.auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async SignUp(@Body() user: UserDto) {
        return this.authService.SignUp(user);
    }

    @Post('signin')
    async SignIn(@Body() user: LoginDto) {
        return this.authService.SignIn(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async Profile(@Request() req) {
        return this.authService.getProfile(req.user.id);
    }

}
