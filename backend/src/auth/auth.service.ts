import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService : JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.userService.findOneUser(username)
        if(user && await bcrypt.compare(password, user.password)){
            const { password , ...result} = user
            return result
        }

        return null
    }

    async signIn(user: any) {
    const payload = { username: user.username, sub: user.id }

    return {
        access_token: this.jwtService.sign(payload), // เปลี่ยนเป็น access_token
        user: {
            id: user.id,
            username: user.username,
            favHouse: user.favHouse,
            favBlog: user.favBlog
        }
    }
}

}
