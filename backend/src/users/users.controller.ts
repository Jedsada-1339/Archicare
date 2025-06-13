import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { SignUpDto } from './dto/signup.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('signup')
    signUp(
        @Body() signUpDto: SignUpDto
    ):Promise<Users>{
        return this.usersService.signUp(signUpDto)
    }
    
}
