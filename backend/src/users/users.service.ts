import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async signUp(signupDto: SignUpDto): Promise<Users> {
        try {
            const {
                username,
                password
            } = signupDto

            const hashPassword = await bcrypt.hashSync(password, 10);

            const user = await this.usersRepository.create({
                username,
                password: hashPassword,
                favHouse: [],
                favBlog: [],
            })

            return await this.usersRepository.save(user)
        } catch (e) {
            throw new ConflictException({
                message: ['Username has been already used']
            })
        }
    }

    async findOneUser(username: string): Promise<Users | null> {
        const user = await this.usersRepository.findOneBy({ username });
        return user;
    }
}
