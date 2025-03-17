import { db } from "../services/db";
import { Service, ServiceFull } from "../models/service.model";

async function create({
  name,
  description,
  price,
  userId,
}: {
  name: string;
  description: string;
  price: number;
  userId: string;
}): Promise<ServiceFull | null> {
  try {
    const service = await db.service.create({
      data: {
        name,
        description,
        price,
        userId,
      },
      include: {
        user:true
      }
    });

    return {
      id: service.id,
      name:service.name, 
      description: service.description, 
      price: service.price,
      owner: {
        name: service.user.name,
        nif: service.user.nif,
      }
    };
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function find(id: string): Promise<ServiceFull | null> {
  try {
    const service = await db.service.findFirst({
      where: {
        id: id,
      },
      include:{
        user:true
      }
    });
 
    if(service){
      return {
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
    return null;
    
  } catch (error) {
    console.log(error);
  }
  return null;
}


async function findWithUser(id: string) {
  try {
    const service = await db.service.findFirst({
      where: {
        id: id,
      },
      include:{
        user:true
      }
    });
 
 
    return service;
    
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function findAll(): Promise<ServiceFull[] | null> {
  try {
    const services = await db.service.findMany({
      include:{
        user:true
      }
    });
    if(services){
        return services.map((service:any) =>{

          return {
            id: service.id,
            name:service.name, 
            description: service.description, 
            price: service.price,
            owner: {
              name: service.user.name,
              nif: service.user.nif,
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

async function update(
  id: string,
  {
    name,
    description,
    price,
  }: {
    name: string;
    description: string;
    price: number;
  }
): Promise<ServiceFull | null> {
  try {
    const service = await db.service.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        price,
      },
      include: {
        user:true
      }
    });
    
    return {
      id: service.id,
      name:service.name, 
      description: service.description, 
      price: service.price,
      owner: {
        name: service.user.name,
        nif: service.user.nif,
      }
    }
    
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function destroy(id: string): Promise<boolean | null> {
  try {
    await db.service.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

const serviceRepository = {
  create,
  find,
  findWithUser,
  findAll,
  update,
  destroy,
};

export default serviceRepository;
