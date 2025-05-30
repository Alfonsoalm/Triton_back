import bcrypt from 'bcrypt';
import { IHashService } from '../../domain';

export class BcryptService implements IHashService{
    hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
    
}