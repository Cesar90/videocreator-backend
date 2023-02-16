import prisma from '../database/prismaClient';
import {
  IVideo,
  IFollower,
  ILikeVideo
} from "../utils/types"

export interface IVideoResponse extends IVideo{
  id: number
  count: number
}

interface LooseObject {
  [key: string]: any
}

interface IFVideo{
  id: number
}

class UserService {
  static async getProfile(userId: number){
    const result = await prisma.user.findFirst(
      {
        where: {
          id: userId
        },
        select: {
          id: true,
          name: true,
          typeuser: true,
          followedBy: {
            select:{
              followerId: true
            }
          },
          videos: {
            orderBy:{
              id: 'desc'
            },
            select:{
              id: true,
              title: true,
              url: true,
              published: true,
              description: true
            }
          }
        },
      }
    )

    const profile: LooseObject = {...result};
    const followerIds = result?.followedBy.map(( follower:IFollower ) => follower.followerId)
    const videosIds = result?.videos.map(( video: IFVideo ) => video.id)
    profile.followers = await prisma.user.findMany({
      where: {
        id: { in: followerIds }
      },
    })
    profile.likesVideo = await prisma.video.findMany({
      where: {
        id: { in: videosIds }
      },
      select: {
        id: true,
        _count: {
          select: {
            likevideos: true
          }
        }
      }
    });
    const likesVideo = profile.likesVideo
    profile.videos = profile.videos.map((video: IVideoResponse) => {
      const likeVideoFound = likesVideo.find((likeVideo:ILikeVideo) => likeVideo.id === video.id )
      if(likeVideoFound){
        video.count = likeVideoFound._count.likevideos
      }
      return video
    })
    
    return profile
  }

  static async getFollowersById(userId: number){
    const user = await prisma.user.findFirst(
      {
        where: {
          id: 2
        },
        select: {
          followedBy: {
            select:{
              followerId: true
            }
          },
        },
      }
    )
    return user?.followedBy.map(( follower:IFollower ) => follower.followerId)
  }
  static async getById(userId: number) {
    return await prisma.user.findFirst({
      where: {
        id: userId
      }
    });
  }
  static async follow(followerId: number, followingId: number) {
    return await prisma.follows.createMany({
      data: [
        {
          followerId,
          followingId,
        },
      ],
    });
  }

  static async unFollow(followerId: number, followingId: number) {
      return await prisma.follows.delete({
        where:{
          followerId_followingId:{
            followerId,
            followingId
          }
        }
      });
  }
  static async findByFollowerIdFollowingId(followerId: number, followingId: number){
    return await prisma.follows.findFirst({
      where: {
        followerId,
        followingId
      }
    });
  }
}

export default UserService;