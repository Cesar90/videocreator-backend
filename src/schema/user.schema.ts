import { object, string, TypeOf, number } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - typeuser
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        name:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        typeuser:
 *          type: string
 *          default: STUDENT
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        id:
 *          type: integer
 */

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    typeuser: string({
      required_error: "Typeuser is required is STUDENT | TEACHER",
    }),
  })
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;

/**
 * @openapi
 * components:
 *  schemas:
 *    LogingInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: test@test.test
 *        password:
 *          type: string
 *          default: 1234567a
 *    LoginResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        id:
 *          type: int
 *        typeuser:
 *          type: string
 *        token:
 *          type: string
 */

 export const loginSchema = object({
  body: object({
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  })
});

export type LoginInput = Omit<
  TypeOf<typeof loginSchema>,
  ""
>;

/**
 *  @openapi
 * components:
 *  schemas:
 *    FollowUnFollowVideoInput:
 *      type: object
 *      required:
 *        - followingId
 *      properties:
 *       followingId:
 *          type: int
 *          default: 1
 *    FollowUnFollowVideoResponse:
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

 export const followUnfollowValidator = object({
  body: object({
    followingId: number({
      required_error: "followingId is required",
    }),
  })
});

export type FollowUnFollowSchema = Omit<
  TypeOf<typeof followUnfollowValidator>,
  ""
>;

/**
 * @openapi
 * #Descriptions of common components
 * components:
 *   #responses:
 *     #NotFound:
 *       #description: The specified resource was not found
 *       #content:
 *         #application/json:
 *           #schema:
 *             #$ref: '#/components/schemas/Error'
 *     #Unauthorized:
 *       #description: Unauthorized
 *       #content:
 *         #application/json:
 *           #schema:
 *             #$ref: '#/components/schemas/Error'
 *   schemas:
 *     # Schema for error response body
 *     #Error:
 *       #type: object
 *       #properties:
 *         #code:
 *           #type: string
 *         #message:
 *           #type: string
 *       #required:
 *         #- code
 *         #- message
 *     videos:
 *       type: object
 *       properties:
 *          id:
 *           type: integer
 *          title:
 *           type: string
 *          url:
 *            type: string
 *          description:
 *           type: string
 *     users:
 *       type: object
 *       properties:
 *          id:
 *           type: integer
 *          name:
 *           type: string
 *          email:
 *            type: string
 *          typeuser:
 *           type: string
 */

/**
 *  @openapi
 * components:
 *  schemas:
 *    ProfileResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        typeuser:
 *          type: string
 *        followedBy:
 *          type: array
 *          items:
 *            type: string
 *        videos:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/videos'
 *        followers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/users'
 *        likesVideo:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                _count:
 *                  type: object
 *                  properties:
 *                    likevideos:
 *                      type: integer
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     description: JWT Authorization header using the Bearer scheme.
 *     scheme: bearer
 *     bearerFormat: JWT
 * 
 */
 export const profileValidator = object({
});

export type ProfileSchema = Omit<
  TypeOf<typeof followUnfollowValidator>,
  ""
>;