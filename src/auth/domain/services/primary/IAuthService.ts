import {User} from '../../entities'

export interface IAuthService{
    register(email:string, password: string): Promise<{ user: User, token: string, expiredIn: number }>;
    login(email:string, password: string): Promise<{ user: User, token: string, expiredIn: number}>;
    
}