import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsadService {
   private apiURL = "http://localhost:37466/api/Products/";
    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    create(productsad:Products): Observable<any> {
  
    return this.httpClient.post('http://localhost:37466/api/Products/Createproduct/',JSON.stringify(productsad),this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  } 
 find(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 update(id:number, productsad:Products): Observable<any> {
    return this.httpClient.put('http://localhost:37466/api/Products/'+ id, JSON.stringify(productsad), this.httpOptions)
   .pipe( 
     catchError(this.errorHandler)
 )
  }
 delete(id:number){
    return this.httpClient.delete(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);

 }


}
