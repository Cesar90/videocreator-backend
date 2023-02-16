import prisma from '../database/prismaClient';

const clear = async () => {
  try {
    console.log('[clear]: running...');
    await prisma.follows.deleteMany();
    await prisma.video.deleteMany();
    await prisma.$queryRaw`ALTER SEQUENCE "Video_id_seq" RESTART WITH 1`;
    await prisma.user.deleteMany();
    await prisma.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
  } catch (error) {
    throw new Error('failed to seed database');
  }
};
export default clear
// clear();
