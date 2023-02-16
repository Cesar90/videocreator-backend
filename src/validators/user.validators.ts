import { check } from 'express-validator';

export const followUserValidator = [
  check('followingId').not().isEmpty().withMessage('followingId is required').isNumeric()
];