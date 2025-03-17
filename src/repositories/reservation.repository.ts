import { db } from "../services/db";
import { Reservation, ReservationFull } from "../models/reservation.model";

async function create({
  userId, serviceId, quantity
}: {
  userId: string,
  serviceId: string;
  quantity: number;
}): Promise<ReservationFull | null> {
  try {
    const reservation = await db.reservation.create({
      data: {
        userId: userId,
        serviceId: serviceId,
        quantity: quantity
      },
      include: {
        service:{
          include: {
            user:true
          }
        }, 
      }
    });

  

    const service =reservation.service;
    return {
      id: reservation.id,
      quantity: reservation.quantity,
      status: reservation.status,
      createdAt: reservation.createdAt,
      service:   {
        id: service.id,
        name:service.name, 
        description: service.description, 
        price: service.price,
        owner: {
          name: service.user.name,
          nif: service.user.nif,
        }
      }
    };
   
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function find(id: string, userId:string): Promise<ReservationFull | null> {
  try {
    const reservation = await db.reservation.findFirst({
      where: {
        id: id,
        userId: userId
      },
      include: {
        service:{
          include: {
            user:true
          }
        }, 
      }
    });

    if (reservation) {
      const service =reservation.service;
    return {
      id: reservation.id,
      quantity: reservation.quantity,
      status: reservation.status,
      createdAt: reservation.createdAt,
      service:   {
        id: service.id,
        name:service.name, 
        description: service.description, 
        price: service.price,
        owner: {
          name: service.user.name,
          nif: service.user.nif,
        }
      }
    };
    }
    return null;

  } catch (error) {
    console.log(error);
  }
  return null;
}

async function findAllByUser(userId:string): Promise<ReservationFull[] | null> {
  try {
    const reservations = await db.reservation.findMany({
      where: {
        userId: userId
      },
      include: {
        service:{
          include: {
            user:true
          }
        }, 
      }
    });
    if (reservations) {
      return reservations.map((reservation: any) => {

        const service =reservation.service;
        return {
          id: reservation.id,
          quantity: reservation.quantity,
          status: reservation.status,
          createdAt: reservation.createdAt,
          service:   {
            id: service.id,
            name:service.name, 
            description: service.description, 
            price: service.price,
            owner: {
              name: service.user.name,
              nif: service.user.nif,
            }
          }
        }
      })
    }
    return null;
  } catch (error) {
    console.log(error);
  }
  return null;
}


async function cancel(id: string): Promise<boolean | null> {
  try {
    await db.reservation.update({
      where: {
        id: id,
      },
      data: {
        status: 'canceled'
      }
    });
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

const reservationRepository = {
  create,
  find,
  findAllByUser,
  cancel,
};

export default reservationRepository;
