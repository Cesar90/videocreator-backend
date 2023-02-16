import { Request, Response } from 'express';
import { UserService } from '../services'
import { 
  IFollow,
  ICustomRequest,
  IToken
} from "../utils/types"

const me = async(req: Request, res: Response) => {
  const authUserId = (req as ICustomRequest).token as IToken
  const userFound = await UserService.getById(authUserId._id)
  if(!userFound){
    return res.status(404).json({
      error: 'Profile not found'
    });
  }
  const userInfo = await UserService.getProfile(authUserId._id)
  return res.status(200).json({...userInfo})
}

const follow = async(req: Request, res: Response) => {
  const authUserId = (req as ICustomRequest).token as IToken
  const { followingId } = req.body as IFollow;
  const followingFound = await UserService.getById(followingId)

  if(authUserId._id == followingId){
    return res.status(405).json({
      error: `You can not follow yourself`
    });
  }

  if (!followingFound) {
    return res.status(404).json({
      error: 'Following user not found'
    });
  }

  try {
    if(!await UserService.findByFollowerIdFollowingId(authUserId._id,followingId)){
      await UserService.follow(authUserId._id, followingId)
      return res.status(201).json({
        message: 'Follower action done successfully'
      }); 
    } else {
      await UserService.unFollow(authUserId._id, followingId)
      return res.status(201).json({
        message: 'UnFollower action done successfully'
      });
    }

  } catch (error) {
    return res.status(500).json({
      error: 'There was an error in follow action'
    });
  }
}

export { follow, me };
