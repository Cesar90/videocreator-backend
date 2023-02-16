import prisma from '../database/prismaClient';
import bcrypt from 'bcryptjs';

enum TYPEUSER {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

interface IUser {
  name: string;
  email: string;
  password: string;
  typeuser: TYPEUSER;
}

class AuthService {
  static async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  static async create(userData: IUser) {
    const { name, email, password, typeuser } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        name,
        email,
        typeuser,
        token: '',
        password: hashedPassword
      }
    });
  }
}

export default AuthService;
