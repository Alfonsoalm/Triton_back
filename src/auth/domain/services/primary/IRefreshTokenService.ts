
export interface IRefreshTokenService{
    generate(userId: string): Promise<string>,
    verify(refreshToken: string,  userId: string): Promise<boolean>,
    invalidate(refreshToken: string): Promise<void>,
}