
export interface Post{
bookingId: number;
    userId: number;
    busId: number;
    busName: string;
    source:string;
    destination:string;
    firstAC:number;
    secondAC:number;
    sleeper:number; 
    
    bookingDate:Date;
    departureDate:Date; 
    departureTime:string;
    fareAmount:number;
}
