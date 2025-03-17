import {z}  from 'zod';

export const serviceScheme =  z.object({
    name: z.string(), 
    description: z.string(), 
    price: z.number(), 
})
