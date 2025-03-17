import userRepository from "../repositories/user.repository";
import { Request, Response } from "express";
import { generateToken } from "../services/jwt";
import { ERRORS, responseError } from "../utils/error";
import { compareHash } from "../utils/hash";
import { AuthRequest } from "../middlewares/auth.middleware";
import { userSchemeRegister, userSchemeLogin } from "../validations/user.validation";

async function register(request: Request, response: Response) {

  if (!userSchemeRegister.safeParse(request.body).success){
    responseError(response, ERRORS.BAD_REQUEST);
    return;
  }

  const { name, nif, email, password, type } = request.body;

  if (type == 'service_provider' && !nif){
    responseError(response, ERRORS.BAD_REQUEST);
    return;

  }

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

  if (!userSchemeLogin.safeParse(request.body).success){
    responseError(response, ERRORS.BAD_REQUEST);
    return;
  }

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


async function deposit (request:AuthRequest, response:Response){
  const user = request.user;

  const {amount} = request.body;

  if (user){
    if( await userRepository.updateBalance(user.id, user.balance + amount)){
      response.json({
        message: 'Depósito realizado com sucesso!'
      });
      return;

    }
  }

  responseError(response, ERRORS.INTERNAL_SERVER_ERROR);
}

const usersController = {
  register,
  login,
  me, 
  deposit
};

export default usersController;
