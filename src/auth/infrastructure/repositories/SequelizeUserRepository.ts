import { IUserRepository, User } from "../../domain";
import { UserModelSequelize } from "../models";

export class SequelizeUserRepository implements IUserRepository{

    async create(user: User): Promise<User> {
        const newUser = await UserModelSequelize.create(user.toJSON());
        const userData = newUser.get();
        return User.createExistingUser(userData.id, userData.email, userData.password); 
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModelSequelize.findOne({where: {email}})
        if(!user) return null;
        const userData = user.get();
        return User.createExistingUser(userData.id, userData.email, userData.password);
    }
    
}