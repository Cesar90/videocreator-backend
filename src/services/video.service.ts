import prisma from '../database/prismaClient';

interface IVideo {
  title: string;
  url: string;
  description: string;
  creatorId: number;
}

type IVideoUptate = Omit<IVideo, 'creatorId' | 'published'>;

class VideoService {
  static async getById(videoId: number) {
    return await prisma.video.findFirst({
      where: {
        id: videoId
      }
    });
  }

  static async create(videoData: IVideo) {
    const { title, url, description, creatorId } = videoData;
    return await prisma.video.create({
      data: {
        title,
        published: false,
        url,
        description: description ?? '',
        creationDate: new Date(),
        userId: creatorId
      }
    });
  }

  static async countUrlAnduserId(url: string, userId: number) {
    return await prisma.video.count({
      where: {
        url,
        userId
      }
    });
  }

  static async findByVideoIdUserId(videoId: number, userId: number) {
    return await prisma.video.findFirst({
      where: {
        id: videoId,
        userId
      }
    });
  }

  static async findByUrlAnduserId(url: string, userId: number) {
    return await prisma.video.findFirst({
      where: {
        url,
        userId
      }
    });
  }

  static async update(videoId: number, videoData: IVideoUptate) {
    const { title, url, description } = videoData;
    return await prisma.video.update({
      where: {
        id: videoId
      },
      data: {
        title,
        description,
        url
      }
    });
  }

  static async updatepublicUnpublish(videoId: number, published: boolean) {
    return await prisma.video.update({
      where: {
        id: videoId
      },
      data: {
        published: !published
      }
    });
  }
  
  static async getAll(){
    return await prisma.video.findMany({
      where:{
        published: true
      },
      select:{
        id: true,
        title: true,
        url: true,
        description: true,
        createdAt: true,
        likevideos:{
          select:{
            userId: true,
            videoId: true
          }
        },
        user:{
          select:{
            id:true,
            name:true,
            email:true,
            followedBy: {
              select:{
                followerId: true
              }
            }
          }
        } 
      }
    })
  }
}
export default VideoService;
