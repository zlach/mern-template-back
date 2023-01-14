import { Router } from 'express';
import { customAuth } from '../middleware/auth.js';
import userRoute from './user.route.js';
// import userPublicRoute from './user.public.route.js';

const router = Router();

router.use('/api/auth/v1/users', customAuth, userRoute);
// router.use('/api/public/v1/users', userPublicRoute);

export default router;
