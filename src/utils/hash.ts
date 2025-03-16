import  bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Função para gerar o hash da senha
export const generateHash = async function (data:string)  {
  return await bcrypt.hash(data, SALT_ROUNDS);
};

// Função para comparar texto com hash
export const compareHash = async function (data:string, hashedPassword:string) {
  return await bcrypt.compare(data, hashedPassword);
};


