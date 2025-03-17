export interface Service{
    id:string, 
    name:string
    description:string
    price:number,
    userId:string
}

export interface ServiceFull{
    id:string, 
    name:string
    description:string
    price:number,
    owner: {
        name:string, 
        nif:string | null
    }
}