import { IRefreshTokenGenerator, IRefreshTokenRepository, IRefreshTokenService } from "../../domain";

export class RefreshTokenService implements IRefreshTokenService{

    private readonly _repository: IRefreshTokenRepository;
    private readonly _generator: IRefreshTokenGenerator;

    constructor(repository: IRefreshTokenRepository, generator: IRefreshTokenGenerator){
        this._repository = repository;
        this._generator = generator;
    }

    async generate(userId: string): Promise<string> {
        const token = this._generator.generate();
        await this._repository.create({...token, userId});
        return token.refreshToken;
    }
    
    async verify(refreshToken: string, userId: string): Promise<boolean> {
        const tokenData = await this._repository.findByToken(refreshToken);
    
        if (!tokenData)
            return false;  
    
        if (tokenData.userId !== userId) 
            return false;  
    
        const currentDate = new Date();
        if (currentDate > new Date(tokenData.expirationDate)) 
            return false;  
    
        return true;
    }

    async invalidate(refreshToken: string): Promise<void> {
        await this._repository.delete(refreshToken);
    }
    
}