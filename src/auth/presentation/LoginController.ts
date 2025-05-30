import { Request, Response } from "express";
import { IAuthService, IRefreshTokenService } from "../domain";


export const loginController = (authService: IAuthService, refreshTokenService: IRefreshTokenService) => {

    return async (req: Request, res:Response): Promise<void> => {
        
        try {
            const {email, password} = req.body;
            
            const {user, token, expiredIn} = await authService.login(email, password);
            const refreshToken = await refreshTokenService.generate(user.id);
    
            res.status(200).json({
                message:"Login successful",
                user: {
                    id: user.id,
                    email: user.email
                },
                token,
                refreshToken,
                expiredIn
            });
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Email does not exist") {
                    res.status(404).json({ message: "Email does not exist" });
                } else if (error.message === "Incorrect password") {
                    res.status(400).json({ message: "Incorrect password" });
                } else {
                    res.status(500).json({ message: "Error interno del servidor" });
                }
            }else {
                res.status(500).json({ message: "Ocurrió un error inesperado" });
            }
        }
    }
}