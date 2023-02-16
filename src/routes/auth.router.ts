import express from 'express';
import {
  userRegisterValidator,
  userLoginValidar,
} from '../validators/auth';
import { runValidation } from '../validators';
import {
  register,
  login
} from '../controllers/auth.controller';

const routerAuth = express.Router();
/**
   * @openapi
   * '/api/register':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

routerAuth.post('/register', userRegisterValidator, runValidation, register);

/**
   * @openapi
   * '/api/login':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Login
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/LogingInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/LoginResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
routerAuth.post('/login', userLoginValidar, runValidation, login);

export default routerAuth;
