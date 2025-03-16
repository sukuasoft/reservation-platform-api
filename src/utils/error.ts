import { Response } from "express";
interface ResponseError {
    statusCode:number, 
    message:string
}

export const ERRORS = {
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "Erro interno do servidor",
  },
  NOT_FOUND: {
    statusCode: 404,
    message: "Recurso não encontrado",
  },
  BAD_REQUEST: {
    statusCode: 400,
    message: "Requisição inválida",
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: "Não autorizado",
  },
  FORBIDDEN: {
    statusCode: 403,
    message: "Acesso negado",
  },
};

export function responseError(response:Response,error:ResponseError){
    response.status(error.statusCode).json ({
        message: error.message
    });
}
