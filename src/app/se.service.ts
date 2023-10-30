import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Seat } from './seat';


@Injectable({
  providedIn: 'root'
})
export class SeService {

  private REST_API_SERVER = "https://localhost:44331/api/seats";
  
  private apiURL = "https://localhost:44331/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.apiURL+'/seats');
  }
  
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/seats/')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(data:any): Observable<any> {
    return this.httpClient.post(this.apiURL + '/seats/', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  } 

  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/seats/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id:number, data:Seat): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/seats/' + id, JSON.stringify(data), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/seats/' + id, this.httpOptions)
  
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
