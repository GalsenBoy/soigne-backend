import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dtos/user.dto';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { LoginDto } from 'src/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/roles/role.enum';
import { Medecin } from 'src/medecin/medecin.entity';
import { MedecinLoginDto } from 'src/dtos/medecin.login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>,
        private jwtService: JwtService,
        @InjectRepository(Medecin)
        private medecinRepository: Repository<Medecin>
    ) { }

    async SignUp(user: UserDto) {
        const { email, password } = user;
        const userExists = await this.usersRepository.findOne({ where: { email: email } });
        if (userExists) {
            throw new ConflictException('User already exists');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = this.usersRepository.create({ ...user, password: passwordHash, roles: Role.User });
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async SignIn(user: LoginDto) {
        const { email, password } = user;
        const userExists = await this.usersRepository.findOne({ where: { email: email } });
        if (!userExists) {
            throw new ConflictException('User does not exist');
        }
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordMatch) {
            throw new ConflictException('Invalid password');
        }
        const payload = { id: userExists.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async getProfile(userId: string) {
        return await this.usersRepository.findOne({ where: { id: userId } });
    }

    async signInWithMedecinMatricule(matricule: { matricule: string }) {
        const medecin = await this.medecinRepository.findOne({ where: { matricule: matricule.matricule } });
        if (!medecin) {
            throw new ConflictException('Medecin does not exist');
        }
        const payload = { id: medecin.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
