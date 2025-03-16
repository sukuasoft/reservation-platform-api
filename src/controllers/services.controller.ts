import { Request, Response } from "express";
import serviceRepository from "../repositories/service.repository";
import { ERRORS, responseError } from "../utils/error";

async function getAll(request: Request, response: Response) {
  const services= await serviceRepository.findAll();

  if (services){
     response.json({
      data: services
    });
    return;
  }

  responseError(response, ERRORS.INTERNAL_SERVER_ERROR);
  
}


async function get(request: Request, response: Response) {

  const {id} = request.params;
  const services= await serviceRepository.find(id);

  if (services){
     response.json({
      data: services
    });
    return;
  }

  responseError(response, ERRORS.INTERNAL_SERVER_ERROR);
  
}

async function create(request: Request, response: Response) {
  
}

async function update(request: Request, response: Response) {
  
}

async function destroy(request: Request, response: Response) {
  
}


const servicesController = {
  getAll,
  get,
  create,
  update,
  destroy,
};

export default servicesController;
