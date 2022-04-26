import { Injectable } from "@nestjs/common";
import {FilterQuery, Model } from 'mongoose' 
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schema/user.schema";

@Injectable() export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne( typeFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(typeFilterQuery)
    }

    async find( userFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(userFilterQuery)
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save()
    }

    async findOneAndUpdate(query: FilterQuery<User>, user: Partial<User>): Promise<User> {
        return this.findOneAndUpdate(query, user)
    }
}