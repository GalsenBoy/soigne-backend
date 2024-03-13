import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dtos/user.dto';
import { LoginDto } from 'src/dtos/login.dto';

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
}
