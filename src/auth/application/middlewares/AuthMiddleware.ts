import { IAccessTokenService} from "../../domain";
import { IAuthenticatedRequest, IAuthMiddleware, INextFunction, IRequest, IResponse } from "../../domain";

export class AuthMiddleware implements IAuthMiddleware {

    private readonly _accessTokenService: IAccessTokenService;

    constructor(accessTokenService: IAccessTokenService) {
        this._accessTokenService = accessTokenService;
        this.execute = this.execute.bind(this);
    }

    async execute(request: IAuthenticatedRequest, response: IResponse, next: INextFunction): Promise<void> {
        try {

            const authHeader = request.headers.authorization;
        
            // Si `authHeader` es un array, tomamos el primer valor
            const tokenHeader = Array.isArray(authHeader) ? authHeader[0] : authHeader;

            if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
                return response.status(401).json({ message: "Token no proporcionado" });
            }

            const token = tokenHeader.split(" ")[1];
            const decoded = await this._accessTokenService.verify(token);

            if (!decoded) {
                return response.status(401).json({ message: "Token inválido" });
            }

            request.user = decoded;
            next();
            
        } catch (error) {
            return response.status(401).json({ message: "Autenticación fallida" });
        }
    }
}