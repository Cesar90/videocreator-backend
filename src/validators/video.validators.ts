import { check } from 'express-validator';
export const videoValidator = [
  check('title').not().isEmpty().withMessage('Title is required'),
  check('url')
    .not()
    .isEmpty()
    .withMessage('Url is required')
    .isURL()
    .withMessage('Url invalid')
];

export const videoEditValidator = [
  check('videoId').not().isEmpty().withMessage('VideoId is required').isNumeric(),
  check('title').not().isEmpty().withMessage('Title is required'),
  check('url')
    .not()
    .isEmpty()
    .withMessage('Url is required')
    .isURL()
    .withMessage('Url invalid')
];

export const publishUnpublishValidator = [
  check('videoId').not().isEmpty().withMessage('VideoId is required').isNumeric()
];
