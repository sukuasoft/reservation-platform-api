import { Request, Response, NextFunction } from "express";
import { ERRORS, responseError } from "../utils/error";
import { extractTokenByHeader, verifyToken } from "../services/jwt";
import userRepository from "../repositories/user.repository";
import { User } from "../models/user.model";


export interface AuthRequest extends Request {
    user?: User;
  }

export async function authMiddleware (request:AuthRequest, response:Response, next:NextFunction){
   
    const token =extractTokenByHeader(request.headers.authorization);
    if (token){
        const tokenDecoded = await verifyToken(token);

        if (tokenDecoded && typeof tokenDecoded != 'string'){
            if ('userId' in tokenDecoded){
               const user = await userRepository.find(tokenDecoded.userId);
               if (user){
                request.user=user;
                next();
                return;
               }

            }
          
        }

    }

    responseError(response, ERRORS.UNAUTHORIZED);
}