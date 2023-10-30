import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private REST_API_SERVER = "https://localhost:44331/api/bookings";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }
}