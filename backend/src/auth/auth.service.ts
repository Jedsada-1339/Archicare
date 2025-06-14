import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}

    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.userService.findOneUser(username)
        if(user && await bcrypt.compare(password, user.password)){
            const { password , ...result} = user
            return result
        }

        return null
    }

}
