import { TypeUser } from "@prisma/client";
import { db } from "../services/db";
import { User } from "../models/user.model";
import { generateHash, } from "../utils/hash";

async function create({
  name,
  nif,
  email,
  type,
  password,
}: {
  name: string;
  nif: string;
  email: string;
  type: TypeUser;
  password: string;
}): Promise<User | null> {
  try {
    const user = await db.user.create({
      data: {
        name,
        nif,
        email,
        type,
       password: await generateHash(password),
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function find(id: string): Promise<User | null> {
  try {
    const user = await db.user.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
  return null;
}



async function findByEmail(email: string): Promise<User | null> {
    try {
      const user = await db.user.findFirst({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

async function updateBalance (id:string, amount:number):Promise<boolean>{

  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        balance: amount
      }
    });
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;


}
  


const userRepository = {
  create, find, findByEmail, updateBalance
};

export default userRepository;
