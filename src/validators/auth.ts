import { check } from 'express-validator';

export const userRegisterValidator = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('typeuser').not().isEmpty().withMessage('typeuser is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

export const userLoginValidar = [
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characteres long')
];

export const forgotPassowordValidator = [
  check('email').isEmail().withMessage('Must be a valid email address')
];

export const resetPasswordValidator = [
  check('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  check('resetPasswordLink').not().isEmpty().withMessage('Token is required')
];
