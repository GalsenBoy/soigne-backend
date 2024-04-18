import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Medecin } from 'src/medecin/medecin.entity';


export interface JwtPayload {
    id: string;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Medecin)
        private medecinRepository: Repository<Medecin>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "process.env.JWT_SECRET",
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.usersRepository.findOne({ where: { id: payload.id } });
        if (user) {
            const { password, ...result } = user;
            return result;
        } else {
            const medecin = await this.medecinRepository.findOne({ where: { id: payload.id } });
            if (medecin) {
                return medecin;
            }
            throw new UnauthorizedException();
        }
    }

}