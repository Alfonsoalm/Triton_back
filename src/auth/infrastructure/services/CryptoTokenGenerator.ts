import crypto from 'crypto';
import { IRefreshTokenGenerator } from '../../domain';


export class CryptoTokenGenerator implements IRefreshTokenGenerator{
    
    private readonly EXPIRED_IN: number = Number(process.env.REFRESH_EXPIRED_IN) || 3600;
 
    generate(): { refreshToken: string; expiredIn: number; } {
        const refreshToken = crypto.randomBytes(64).toString('hex');
        return { refreshToken, expiredIn: this.EXPIRED_IN };
    }  
    
}