import { Router } from 'express';
import { login, register,verifyUser } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.patch('/verify/:userId',verifyUser)
export default authRouter;