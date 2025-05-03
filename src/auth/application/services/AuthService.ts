import {IUserRepository, IHashService, IIdService, IAccessTokenService, User, IAuthService, EmailAlreadyExitsError } from "../../domain";


export class AuthService implements IAuthService{

    private readonly _repository: IUserRepository;
    private readonly _hashService: IHashService;
    private readonly _idService: IIdService;
    private readonly _accessTokenService: IAccessTokenService;

    constructor(repository: IUserRepository,  hashService: IHashService, idGenerator: IIdService, accessTokenService: IAccessTokenService){
        this._repository = repository;
        this._hashService = hashService;
        this._idService = idGenerator;
        this._accessTokenService = accessTokenService;
    }

    async register(email: string, password: string): Promise<{ user: User; token: string, expiredIn: number }> {
        const existingUser = await this._repository.findByEmail(email);
    
        if(existingUser)
            throw new EmailAlreadyExitsError();

        const newUser = await User.createNewUser(email, password, this._hashService, this._idService);
        const savedUser = await this._repository.create(newUser);

        const {token, expiredIn} = this._accessTokenService.generate({ id: savedUser.id, email: savedUser.email });
    
        return { user: savedUser, token, expiredIn};

    }
    async login(email: string, password: string): Promise<{ user: User; token: string, expiredIn: number }> {
        
        const user = await this._repository.findByEmail(email);

        if(!user)
            throw new Error("Email does not exist");
        
        const passwordIsValid = await user.validatePassword(password, this._hashService);

        if(!passwordIsValid)
            throw new Error("Incorrect password");

        const {token, expiredIn} = this._accessTokenService.generate({ id: user.id, email: user.email });

        return {user, token, expiredIn};
    }
}