import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const route = Router({ strict: true });

route.route('/:id')
  .get(UserController.getOne);
route.route('/:id')
  .patch(UserController.patch);
route.route('/')
    .post(UserController.create);

export default route;
