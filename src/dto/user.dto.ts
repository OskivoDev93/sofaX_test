export class CreateUserDto {
    name: string;
    email: string;
    age: number;
    phone: string;
}

export class UpdateUserDto {
    name?: string;
    email?: string;
    age?: number;
    phone?: string;
}