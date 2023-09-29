export interface Post {
    busId: number;
    busName: string;
    source: string;
    image:string;
    destination: string;
    departureDate: string;
    departureTime: string;
    charges: number;
    firstAC:number;
    firstACPrice:number;
    secondAC:number;
    secondACPrice:number;
    sleeper:number;
    sleeperPrice:number;
    total:number;
}