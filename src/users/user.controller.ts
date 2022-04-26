import { UserService } from './user.service';
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from '../schema/user.schema';
import { CreateUserDto } from 'src/dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<User> {
        return this.userService.getUserById(userId);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers()
    }

    @Post()
    async createUser(@Body() {email, phone, age, name}: CreateUserDto): Promise<User> {
        return this.userService.createUser(
            email,
            age,
            phone,
            name
        )
    }
}