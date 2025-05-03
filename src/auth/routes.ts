import {Router} from 'express'
import { loginController, logoutController, registerController } from './presentation';
import { authMiddleware, authService, refreshTokenService } from './config';
import { IAuthenticatedRequest } from './domain';

export const authRouter = Router({mergeParams: true})

authRouter.post("/register", registerController(authService, refreshTokenService));

authRouter.post("/login", loginController(authService, refreshTokenService));

authRouter.post("/logout", logoutController(refreshTokenService))

authRouter.get("/me", authMiddleware.execute, (req: IAuthenticatedRequest, res) => {
    
    res.json({ message: 'Acceso permitido', user: req.user });
})