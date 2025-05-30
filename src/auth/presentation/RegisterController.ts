import { Request, Response } from "express";
import { IAuthService, IRefreshTokenService } from "../domain";
import { CustomError } from "../../_utils";

export const registerController = (authService: IAuthService, refreshTokenService: IRefreshTokenService) =>{

    return async (req: Request, res:Response): Promise<void> => {
        try {
    
            const {email, password} = req.body;
        
        
            const {user, token, expiredIn} = await authService.register(email, password);
            console.log(user)
            const refreshToken = await  refreshTokenService.generate(user.id);  
            
            res.status(201).json({
                message: "Register susscessful",
                user: {
                    id: user.id,
                    email: user.email
                },
                token,
                refreshToken,
                expiredIn
            });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({message: error.message});
            }else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
}