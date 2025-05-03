
export interface IRefreshTokenRepository{
    create(newRefreshToken: {refreshToken: string, userId:string, expiredIn: number}): void;
    findByToken(refreshToken: string): Promise<{refreshToken: string, userId:string, expirationDate: Date} | null>
    delete(refreshToken: string): Promise<void>
}