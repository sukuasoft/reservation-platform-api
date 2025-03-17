import { ServiceFull } from "./service.model"

export interface Reservation{
    id:string,
    userId:string, 
    serviceId:string
    quantity:number,
    status:string,
    createdAt:Date
}


export interface ReservationFull {
    id:string,
    quantity:number,
    status:string,
    createdAt:Date, 
    service: ServiceFull
}