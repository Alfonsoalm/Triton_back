import { Request, Response } from "express";
import { IRefreshTokenService } from "../domain";


export const logoutController = (refreshTokenService: IRefreshTokenService) => {

    return async (req: Request, res:Response): Promise<void> => {
        
        try {
            const authHeader = req.headers.authorization;

            const tokenHeader = Array.isArray(authHeader) ? authHeader[0] : authHeader;
            console.log(tokenHeader)
            if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
                throw new Error("Token no proporcionado");
            }

            const refreshToken = tokenHeader.split(" ")[1];
            console.log(refreshToken)
            await refreshTokenService.invalidate(refreshToken);
            
            
            res.status(204).json();
            
        } catch (error) {
            if (error instanceof Error) {
                if (error.message ===  "Token no proporcionado") {
                    res.status(401).json({ message: "Token no proporcionado"});
                } else {
                    res.status(500).json({ message: "Error interno del servidor" });
                }
            }else {
                res.status(500).json({ message: "Ocurrió un error inesperado" });
            }
        }
    }
}