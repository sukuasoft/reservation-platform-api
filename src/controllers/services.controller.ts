import { Request, Response } from "express";
import serviceRepository from "../repositories/service.repository";
import { ERRORS, responseError } from "../utils/error";
import { AuthRequest } from "../middlewares/auth.middleware";
import { serviceScheme } from "../validations/service.validation";

async function getAll(request: Request, response: Response) {
  const services = await serviceRepository.findAll();

  if (services) {
    response.json({
      data: services
    });
    return;
  }

  responseError(response, ERRORS.NOT_FOUND);


}


async function get(request: Request, response: Response) {

  const { id } = request.params;
  const service = await serviceRepository.find(id);

  if (service) {
    response.json({
      data: service
    });
    return;
  }

  responseError(response, ERRORS.NOT_FOUND);

}

async function create(request: AuthRequest, response: Response) {

  if (!serviceScheme.safeParse(request.body).success){
      responseError(response, ERRORS.BAD_REQUEST);
      return;
  }

  const { name, description, price } = request.body;
  const user = request.user;

  if (user) {

    if (user.type == 'client') {
      response.status(403).json({
        message: 'Clientes não têm permissão para postar serviços.'
      })
      return;
    }
    const service = await serviceRepository.create({
      name,
      description,
      price,
      userId: user.id,
    });

    if (service) {
      response.status(201).json({
        data: service
      });
      return;
    }



  }

  responseError(response, ERRORS.INTERNAL_SERVER_ERROR);

}

async function update(request: AuthRequest, response: Response) {

  if (!serviceScheme.safeParse(request.body).success){
    responseError(response, ERRORS.BAD_REQUEST);
    return;
}

  const { name, description, price } = request.body;
  const { id } = request.params;

  const user = request.user;
  if (user) {
    const service = await serviceRepository.find(id);

    if (service) {
      if (service.owner.nif == user.nif) {
        const serviceUpdated = await serviceRepository.update(id, {
          name, description, price
        })

        if (serviceUpdated){
           response.json({
            data: serviceUpdated
           });
           return;
        }

      }

    }
  }

  responseError(response, ERRORS.INTERNAL_SERVER_ERROR);


}

async function destroy(request: AuthRequest, response: Response) {

  const { id } = request.params;

  const user = request.user;
  if (user) {
    const service = await serviceRepository.find(id);

    if (service) {
      if (service.owner.nif == user.nif) {
         if( await serviceRepository.destroy(id)){
          response.json({
            message: 'Serviço foi apagado com sucesso!'
          });
          return;
         }

      }

    }
  }

  responseError(response, ERRORS.INTERNAL_SERVER_ERROR);

}


const servicesController = {
  getAll,
  get,
  create,
  update,
  destroy,
};

export default servicesController;
