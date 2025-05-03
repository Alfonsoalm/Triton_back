
import { IRefreshTokenRepository } from '../../domain';
import { RefreshTokenModelSequelize } from "../models";

export class SequelizeRefreshTokenRepository implements IRefreshTokenRepository{
    
    async create(token: {refreshToken: string, userId:string, expiredIn: number}): Promise<void>{

        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + token.expiredIn);
        
        const refreshToken = {
            refreshToken: token.refreshToken,
            userId: token.userId,
            expirationDate: expirationDate.toISOString()
        };

        await RefreshTokenModelSequelize.create(refreshToken);
        
    };

    async findByToken(refreshToken: string): Promise<{refreshToken: string, userId:string, expirationDate: Date} | null> {

        const token = await RefreshTokenModelSequelize.findByPk(refreshToken);

        if(!token) return null;

        const tokenData = token.get();

        return {...tokenData, expirationDate: new Date(tokenData.expirationDate)};

    }

    async delete(refreshToken: string): Promise<void> {
        await RefreshTokenModelSequelize.destroy({where: { refreshToken }});
    }
}