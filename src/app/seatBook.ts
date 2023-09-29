export interface SeatBooking {

    bookingId:number;
    userId:number;
    busId:number;
    busName:string;
    source:string;
    destination:string;
    firstACSeats: number,
    secondACSeats: number,
    sleeperSeats: number,
    bookingDate:string
    departureDate: string,
    fareAmount:number

}