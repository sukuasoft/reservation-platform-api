import {z}  from 'zod';

export const reservationSchemeCreate =  z.object({
    serviceId: z.string(), 
    quantity: z.number(), 
})