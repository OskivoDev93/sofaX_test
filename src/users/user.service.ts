import { Injectable } from "@nestjs/common";
import { User } from "../schema/user.schema";
import {v4 as uuidv4} from 'uuid';
import { UserRepository } from "./user.repository";
import { UpdateUserDto } from "src/dto/user.dto";


@Injectable()
export class UserService{
    constructor(private readonly userRepo: UserRepository) {}

    async getUserById(userId: string): Promise<User> {
        return this.userRepo.findOne({userId})
    }

    async getUsers(): Promise<User[]> {
        return this.userRepo.find({})
    }

    async createUser(email: string, age: number, phone: string, name: string) {
        return this.userRepo.create({
            userId: uuidv4(),
            email,
            age,
            phone,
            name
        })
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto) :Promise<User> {
        return this.userRepo.findOneAndUpdate({userId}, userUpdates)
    } 
}