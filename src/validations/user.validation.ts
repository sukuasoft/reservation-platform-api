import {z}  from 'zod';

export const userSchemeRegister =  z.object({
    name: z.string(), 
    email: z.string().email(), 
    type: z.string(),
    nif: z.string().optional(),
    password: z.string()
})


export const userSchemeLogin=  z.object({
    email: z.string().email(), 
    password: z.string()
})