import prisma from '../database/prismaClient';
import clear from './clear'
import bcrypt from 'bcryptjs';

enum TYPEUSER {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

interface IUser {
  name: string;
  email: string;
  password: string;
  token?: string;
  typeuser: TYPEUSER;
}

interface IVideo {
  title: string;
  published: boolean;
  url: string;
  description: string;
  creatorId: number;
}

interface ILikesVideos {
  videoId: number;
  userId: number;
}

interface IFollower {
  followerId: number;
  followingId: number;
}

const users: IUser[] = [
  {
    name: 'test',
    email: 'test@test.test',
    password: '1234567a',
    typeuser: TYPEUSER.TEACHER
  },
  {
    name: 'Cesar',
    email: 'cesar@test.test',
    password: '1234567a',
    typeuser: TYPEUSER.TEACHER
  },
  {
    name: 'Maria',
    email: 'maria@test.test',
    password: '1234567a',
    typeuser: TYPEUSER.STUDENT
  }
];

const videos: IVideo[] = [
  {
    title: 'Node.js and Express.js - Full Course',
    published: false,
    url: 'https://www.youtube.com/watch?v=Oe421EPjeBE&t=154s',
    description:
      'Learn how to use Node and Express in this comprehensive course. First, you will learn the fundamentals of Node and Express. Then, you will learn to build a complex Rest API. Finally, you will build a MERN app and other Node projects',
    creatorId: 1
  },
  {
    title: 'Full HTTP Networking Course – Fetch and REST APIs in JavaScript',
    published: false,
    url: 'https://www.youtube.com/watch?v=2JYT5f2isg4&t=13891s',
    description:
      'Master the HTTP networking protocol by completing over 80 coding exercises and quizzes in JavaScript. Once you’ve learned it all, we’ll build a real web crawler using Node.js to put all the concepts into practice.',
    creatorId: 2
  },
  {
    title: 'Learn HTML5 and CSS3 From Scratch - Full Course',
    published: false,
    url: 'https://www.youtube.com/watch?v=mU6anWqZJcc',
    description:
      'HTML and CSS are essential skills to have for a career in web development.',
    creatorId: 3
  }
];

const likesVideo: ILikesVideos[] = [
  {
    videoId: 1,
    userId: 2
  },
  {
    videoId: 2,
    userId: 3
  }
];

const follers: IFollower[] = [
  {
    followerId: 1,
    followingId: 2
  },
  {
    followerId: 3,
    followingId: 2
  }
];

const seed = async () => {
  try {
    for (const user of users) {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          typeuser: user.typeuser,
          token: '',
          password: await bcrypt.hash(user.password, 10)
        }
      });
    }
    for (const video of videos) {
      await prisma.video.create({
        data: {
          title: video.title,
          published: false,
          url: video.url,
          description: video.description ?? '',
          creationDate: new Date(),
          userId: video.creatorId
        }
      });
    }

    for (const foller of follers) {
      await prisma.follows.create({
        data: {
          followerId: foller.followerId,
          followingId: foller.followingId
        }
      });
    }
  } catch {
    throw new Error('failed to seed database');
  }
};

clear().then(() => {
  seed()
})
