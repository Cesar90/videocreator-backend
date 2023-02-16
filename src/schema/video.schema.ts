import { object, string, number, TypeOf } from "zod";

/**
 *  @swagger
 * components:
 *  schemas:
 *    CreateVideoInput:
 *      type: object
 *      required:
 *        - title
 *        - url
 *      properties:
 *        title:
 *          type: string
 *          default: Learn JavaScript - Full Course for Beginners
 *        url:
 *          type: string
 *          default: https://www.youtube.com/watch?v=PkZNo7MFNFg
 *    CreateVideoResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        id:
 *          type: int
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     description: JWT Authorization header using the Bearer scheme.
 *     scheme: bearer
 *     bearerFormat: JWT
 */

export const createVideoSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    url: string({
      required_error: "Url is required",
    }),
  })
});

export type CreateVoideoInput = Omit<
  TypeOf<typeof createVideoSchema>,
  ""
>;

/**
 *  @swagger
 * components:
 *  schemas:
 *    EditVideoInput:
 *      type: object
 *      required:
 *        - videoId
 *        - title
 *        - url
 *      properties:
*        videoId:
 *          type: int
 *          default: 1
 *        title:
 *          type: string
 *          default: Learn JavaScript - Full Course for Beginners
 *        url:
 *          type: string
 *          default: https://www.youtube.com/watch?v=PkZNo7MFNFg
 *    EditVideoResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        id:
 *          type: int
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     description: JWT Authorization header using the Bearer scheme.
 *     scheme: bearer
 *     bearerFormat: JWT
 */

export const editVideoSchema = object({
  body: object({
    videoId: number({
      required_error: "VideoId is required",
    }),
    title: string({
      required_error: "Title is required",
    }),
    url: string({
      required_error: "Url is required",
    }),
  })
});

export type EditVideoSchema = Omit<
  TypeOf<typeof editVideoSchema>,
  ""
>;

/**
 *  @swagger
 * components:
 *  schemas:
 *    PublishUnpublishVideoInput:
 *      type: object
 *      required:
 *        - videoId
 *      properties:
 *       videoId:
 *          type: int
 *          default: 1
 *    PublishUnpublishVideoResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        id:
 *          type: int
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     description: JWT Authorization header using the Bearer scheme.
 *     scheme: bearer
 *     bearerFormat: JWT
 */

export const publishUnpublishValidator = object({
  body: object({
    videoId: number({
      required_error: "VideoId is required",
    }),
  })
});

export type PublishUnpublishVideoSchema = Omit<
  TypeOf<typeof publishUnpublishValidator>,
  ""
>;