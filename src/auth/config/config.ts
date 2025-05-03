import {AuthService, RefreshTokenService } from "../application";
import {IAccessTokenService, IAuthService, IHashService, IIdService, IRefreshTokenGenerator, IRefreshTokenRepository, IRefreshTokenService, IUserRepository } from "../domain";
import {BcryptService, CryptoTokenGenerator, JwtService, SequelizeRefreshTokenRepository, SequelizeUserRepository, UuidGenerator } from "../infrastructure";

const userRepository: IUserRepository = new SequelizeUserRepository()
const hashService: IHashService = new BcryptService();
const idService: IIdService = new UuidGenerator();
const tokenService: IAccessTokenService = new JwtService();


export const authService: IAuthService = new AuthService(userRepository, hashService, idService, tokenService);


const tokenRepository: IRefreshTokenRepository = new SequelizeRefreshTokenRepository();
const tokenGenerator: IRefreshTokenGenerator = new CryptoTokenGenerator();

export const refreshTokenService: IRefreshTokenService = new RefreshTokenService(tokenRepository, tokenGenerator);

// export const authMiddleware:IAuthMiddleware = new AuthMiddleware(tokenService);
