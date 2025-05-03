
export interface IAccessTokenService {
    generate(payload: object): {token: string, expiredIn: number},
    verify(token: string): any,
}