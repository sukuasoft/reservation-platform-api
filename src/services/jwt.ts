import { sign, verify } from "jsonwebtoken";
import { envConfig } from "../config/env";

export function generateToken(data: any) {
  try {
    return sign(data, envConfig.APP_KEY);
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function verifyToken(token: string) {
  try {
    return verify(token, envConfig.APP_KEY);
  } catch (error) {
    console.log(error);
  }
  return null;
}
