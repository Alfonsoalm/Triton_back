import { AuthCredentials } from "../DTO";

export interface IRequest {
    headers: Record<string, string | string[] | undefined>;
}

export interface IResponse {
    status: (code: number) => IResponse;
    json: (data: any) => void;
}

export interface INextFunction {
    (): void;
}

export interface IAuthenticatedRequest extends IRequest {
    user?: AuthCredentials; 
}

export interface IAuthMiddleware{
    execute(req: IAuthenticatedRequest, res: IResponse, nextFunction:INextFunction): void
}