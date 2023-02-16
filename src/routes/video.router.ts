import express from 'express';
import {
  createVideo,
  updateVideo,
  publishUnpublish,
  getAll
} from '../controllers/video.controller';
import { runValidation } from '../validators';
import { auth } from '../middleware/authMiddleware';

import {
  videoValidator,
  videoEditValidator,
  publishUnpublishValidator
} from '../validators/video.validators';

const viodeRouter = express.Router();

viodeRouter.get('/videos', auth, getAll);

/**
   * @openapi
   * '/api/videos':
   *  post:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *     - Videos
   *     summary: Create a video
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateVideoInput'
   *     responses:
   *      201:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateVideoResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

viodeRouter.post('/videos', 
  videoValidator, 
  runValidation, 
  auth, 
  createVideo);

  /**
   * @openapi
   * '/api/videos':
   *  put:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *     - Videos
   *     summary: Edit a video
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/EditVideoInput'
   *     responses:
   *      201:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/EditVideoResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

viodeRouter.put('/videos', 
  videoEditValidator, 
  runValidation, 
  auth, 
  updateVideo);

  /**
   * @openapi
   * '/api/publishunpublish':
   *  put:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *     - Videos
   *     summary: Public and Unpublish
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/PublishUnpublishVideoInput'
   *     responses:
   *      201:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/PublishUnpublishVideoResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

viodeRouter.put(
  '/publishunpublish',
  publishUnpublishValidator,
  runValidation,
  auth,
  publishUnpublish
);

export default viodeRouter;
