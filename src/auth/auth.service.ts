import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dtos/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>,) { }

    async SignUp(user: UserDto) {
        const { email, password } = user;
        const userExists = await this.usersRepository.findOne({ where: { email: email } });
        if (userExists) {
            throw new ConflictException('User already exists');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = this.usersRepository.create({ ...user, password: passwordHash });
        await this.usersRepository.save(newUser);
        return newUser;
    }
}
