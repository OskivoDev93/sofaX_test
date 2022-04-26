import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { User, UserSchema } from '../schema/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name , schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService, UserRepository]
})

export class UserModule {}