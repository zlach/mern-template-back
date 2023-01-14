import { Router } from 'express';
import { customAuth } from '../middleware/auth.js';
import userRoute from './user.route.js';

const router = Router();

router.use('/api/auth/v1/users', customAuth, userRoute);

export default router;
