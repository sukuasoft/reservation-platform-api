import userRepository from "../repositories/user.repository";
import { Request, Response } from "express";
import { generateToken } from "../services/jwt";
import { ERRORS, responseError } from "../utils/error";
import { compareHash } from "../utils/hash";
import { AuthRequest } from "../middlewares/auth.middleware";

async function register(request: Request, response: Response) {
  const { name, nif, email, password, type } = request.body;

  const user = await userRepository.create({
    name,
    nif,
    email,
    password,
    type,
  });

  if (user) {
    const token = generateToken({ userId: user.id });
    if (token) {
      response.json({
        data: {
          token: token,
        },
      });
      return;
    }
  }

  responseError(response, ERRORS.INTERNAL_SERVER_ERROR);
}

async function login(request: Request, response: Response) {
    const {email, password} = request.body;

    const user = await userRepository.findByEmail(email);

    if (user){ 
        if (await compareHash(password, user.password)){

            const token = generateToken({ userId: user.id });
            if (token) {
              response.json({
                data: {
                  token: token,
                },
              });
              return;
            }
        }
        else{
            responseError(response, ERRORS.BAD_REQUEST);
            return;
        }

    }

    responseError(response, ERRORS.INTERNAL_SERVER_ERROR);
}


async function me (request:AuthRequest, response:Response){
    const user = { ...request.user};
    delete user.password;
   
    response.json({
        data: user
    });

}

const usersController = {
  register,
  login,
  me
};

export default usersController;
