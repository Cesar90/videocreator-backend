import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthService } from '../services'
import { 
  IUser,
  TYPEUSER,
  MyToken,
  ILogin 
} from "../utils/types"

export interface CustomRequest extends Request {
  user: IUser;
}

const register = async (req: Request, res: Response) => {
  const { name, email, password, typeuser } = req.body as IUser;

  if (!Object.values(TYPEUSER).includes(typeuser)) {
    return res.status(400).json({
      error: 'Invalid type of user, it must be STUDENT | TEACHER'
    });
  }

  if (await AuthService.findByEmail(email)) {
    return res.status(400).json({
      error: 'Email is taken'
    });
  }

  try {
    const newUser = await AuthService.create({ name, email, password, typeuser });
    if (newUser) {
      return res.json({
        message: 'Registration success. Please login'
      });
    }
    return res.status(401).json({
      error: 'There was an error to create an user'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'There was an error to create an user'
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as ILogin;
  try {
    const userFound = await AuthService.findByEmail(email)

    if (!userFound) {
      return res.status(400).json({
        error: 'User with that eamil does not exits. Please register.'
      });
    }

    const valid = await bcrypt.compare(password, userFound.password);
    if (!valid) {
      return res.status(400).json({
        error: 'Invalid Login'
      });
    }

    const token = jwt.sign({ _id: userFound.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: '60m'
    });
    const { id, name, email: emailFound, typeuser } = userFound;
    return res.json({
      user: { id, name, email: emailFound, typeuser, token }
    });
  } catch (error) {
    return res.status(400).json({
      error: `There was an error: ${error}`
    });
  }
};

export {
  register,
  login,
};
