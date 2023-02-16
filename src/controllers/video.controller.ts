import { Request, Response } from 'express';
import { 
  ICustomRequest, 
  IToken, 
  IVideo, 
  IPublishUnpublish } from "../utils/types"
import prisma from '../database/prismaClient';
import { VideoService } from '../services'

export interface IVideoUpdate extends IVideo{
  videoId: number
}

const createVideo = async (req: Request, res: Response) => {
  const authUserId = (req as ICustomRequest).token as IToken
  const { title, url, description } = req.body as IVideo;
  
  if (await VideoService.countUrlAnduserId(url, authUserId._id)) {
    return res.status(400).json({
      error: 'Video is taken'
    });
  }
  
  try {
    await VideoService.create({
      title,
      url,
      description,
      creatorId: authUserId._id
    })

    return res.status(201).json({
      message: 'Video created successfully'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'There was an error to create the video'
    });
  }
};

const updateVideo = async (req: Request, res: Response) => {
  const authUserId = (req as ICustomRequest).token as IToken
  const { title, url, description, videoId } = req.body as IVideoUpdate;

  const videoFound = await VideoService.getById(videoId)
  if (!videoFound) {
    return res.status(400).json({
      error: 'This video no exits'
    });
  }

  if (!videoFound) {
    return res.status(400).json({
      error: 'This video no exits'
    });
  }

  try {
    await VideoService.update(videoFound.id, { title, description, url})

    return res.json({
      message: 'Video edited successfully'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'There was an error to update the video'
    });
  }
};

const publishUnpublish = async (req: Request, res: Response) => {
  const authUserId = (req as ICustomRequest).token as IToken
  const { videoId } = req.body as IPublishUnpublish;
  const videoFound = await VideoService.findByVideoIdUserId(videoId, authUserId._id)
  if (!videoFound) {
    return res.status(400).json({
      error: 'This video no exits'
    });
  }
  
  try {
    await VideoService.updatepublicUnpublish(videoFound.id, videoFound.published)
    return res.json({
      message: 'Video edited successfully'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'There was an error to update the video'
    });
  }
};

const getAll = async(req: Request, res: Response) => {
  try {
    const result = await VideoService.getAll()
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      error: 'There was an error to update the video'
    });
  }
}

export { createVideo, updateVideo, publishUnpublish , getAll };
