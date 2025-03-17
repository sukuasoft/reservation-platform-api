import { Request, Response } from "express";
import { ERRORS, responseError } from "../utils/error";
import { AuthRequest } from "../middlewares/auth.middleware";
import reservationRepository from "../repositories/reservation.repository";
import serviceRepository from "../repositories/service.repository";
import userRepository from "../repositories/user.repository";

async function getAll(request: AuthRequest, response: Response) {

  const user = request.user;

  if (user) {

    const reservations = await reservationRepository.findAllByUser(user.id);

    if (reservations) {
      response.json({
        data: reservations
      });
      return;
    }

  }

  responseError(response, ERRORS.NOT_FOUND);


}


async function get(request: AuthRequest, response: Response) {

  const { id } = request.params;

  const user = request.user;

  if (user) {
    const reservation = await reservationRepository.find(id, user.id);

    if (reservation) {
      response.json({
        data: reservation
      });
      return;

    }


  }


  responseError(response, ERRORS.NOT_FOUND);

}

async function create(request: AuthRequest, response: Response) {

  const { serviceId, quantity } = request.body;
  const user = request.user;

  if (user) {

    if (user.type == 'service_provider') {
      response.status(403).json({
        message: 'Prestadores de Serviço de não têm permissão de reservar serviços.'
      })
      return;
    }

    const service = await serviceRepository.findWithUser(serviceId);

    if (service) {

    
      const value: number = (service.price * quantity);

      if (user.balance - value < 0) {

        response.status(400).json({
          message: 'Seu saldo é insuficiente'
        });

        return;
      }

      const reservation = await reservationRepository.create({
        serviceId,
        quantity,
        userId: user.id

      });

      //remover o saldo na conta de quem reservou
      await userRepository.updateBalance(user.id, user.balance - value);

      // adiciona o dinheiro a quem oferece o serviço.
      await userRepository.updateBalance(service.user.id, service.user.balance + value);

      if (reservation) {
        response.status(201).json({
          data: reservation
        });
        return;
      }


    }



  }

  responseError(response, ERRORS.INTERNAL_SERVER_ERROR);

}



async function cancel(request: AuthRequest, response: Response) {

  const { id } = request.params;

  const user = request.user;
  if (user) {

    const reservation = await reservationRepository.find(id, user.id);

    if (reservation) {

      if (await reservationRepository.cancel(id)) {
        const value: number = (reservation.service.price * reservation.quantity);

        const userProvider = await serviceRepository.findWithUser(reservation.service.id);

        if (userProvider) {

          //adicionar o saldo na conta de quem reservou
          await userRepository.updateBalance(user.id, user.balance + value);


          // remover o dinheiro a quem oferece o serviço.
          await userRepository.updateBalance(userProvider.user.id,
            userProvider.user.balance - value);

          response.json({
            message: 'Reserva cancelada com sucesso!'
          });
          return;

        }


      }

    }


  }

  responseError(response, ERRORS.INTERNAL_SERVER_ERROR);


}


const reservationsController = {
  getAll,
  get,
  create,
  cancel
};

export default reservationsController;
