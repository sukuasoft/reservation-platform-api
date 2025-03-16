import { db } from "../services/db";
import { Service } from "../models/service.model";

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
}): Promise<Service | null> {
  try {
    const service = await db.service.create({
      data: {
        name,
        description,
        price,
        userId,
      },
    });

    return service;
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function find(id: string): Promise<Service | null> {
  try {
    const service = await db.service.findFirst({
      where: {
        id: id,
      },
    });
    return service;
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function findAll(): Promise<Service[] | null> {
  try {
    const services = await db.service.findMany();
    return services;
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
    userId,
  }: {
    name: string;
    description: string;
    price: number;
    userId: string;
  }
): Promise<Service | null> {
  try {
    const service = await db.service.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        price,
        userId,
      },
    });
    return service;
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
  findAll,
  update,
  destroy,
};

export default serviceRepository;
