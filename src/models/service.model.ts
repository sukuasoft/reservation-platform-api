export interface Service{
    id:string, 
    name:string
    description:string
    price:number,
    userId:string
}

export interface ServiceByUser{
    id:string, 
    name:string
    description:string
    price:number,
    owner: {
        name:string, 
        nif:string | null
    }
}