import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private baseUrl = 'https://localhost:44331/api/Booking';
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private http: HttpClient) { }

  getUserBookings(userId: number): Observable<any> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get(url);
  }
  
}
  