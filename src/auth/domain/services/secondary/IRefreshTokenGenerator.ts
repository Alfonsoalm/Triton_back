
export interface IRefreshTokenGenerator{
    generate(): {refreshToken: string, expiredIn: number},
}