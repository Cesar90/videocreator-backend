import express from 'express';
import { follow , me } from '../controllers/user.controller'
import { auth } from '../middleware/authMiddleware';
import { runValidation } from '../validators';

import {
  followUserValidator
} from '../validators/user.validators';

const router = express.Router();

 /**
   * @openapi
   * '/api/profile':
   *  get:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *     - User
   *     summary: Profile
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ProfileResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

router.get('/profile', auth, me);


  /**
   * @openapi
   * '/api/follow':
   *  put:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *     - User
   *     summary: Follow and Unfollow
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/FollowUnFollowVideoInput'
   *     responses:
   *      201:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/FollowUnFollowVideoResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
router.put('/follow', followUserValidator, runValidation, auth, follow);

export default router;
