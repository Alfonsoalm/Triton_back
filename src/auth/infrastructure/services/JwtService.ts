import { IAccessTokenService  } from "../../domain";
import jwt from "jsonwebtoken";

export class JwtService implements IAccessTokenService {

    private readonly SECRET_KEY: string = process.env.SECRET_KEY || "finanzaap";
    private readonly EXPIRED_IN: number = Number(process.env.TOKEN_EXPIRATION) || 900;

    generate(payload: object): {token: string, expiredIn: number} {
        const token = jwt.sign(payload, this.SECRET_KEY, {expiresIn: this.EXPIRED_IN});
        return {token, expiredIn:this.EXPIRED_IN}
    }
    
    verify(token: string): any {
        return jwt.verify(token, this.SECRET_KEY);
    }

}