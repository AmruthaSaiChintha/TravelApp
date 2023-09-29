import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "https://localhost:44331/api";

  private REST_API_SERVER = "https://localhost:44331/api/RegisterUsers";
    
  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  https: any;
   
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/RegisterUsers/')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  create(user:User): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/RegisterUsers/', JSON.stringify(user), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/RegisterUsers/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getUserDetails(userId: number): Observable<any> {
    const url = `${this.apiURL}/RegisterUsers/${userId}`;
    return this.httpClient.get(url);
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id:number, user:User): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/RegisterUsers/' + id, JSON.stringify(user), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }
       
  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/RegisterUsers/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
      
  /** 
   * Write code on Method
   *
   * @return response()
   */


  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);




}


updateUserProfile(userId: number, userData: any): Observable<any> {
  const url = `${this.apiURL}/RegisterUsers/${userId}`;
  
  // Assuming that the server expects a PUT request with the user data
  return this.httpClient.put(url, userData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }).pipe(
    catchError(this.errorHandler)
  );
}



checkEmailExists(email: string): Observable<boolean> {
  const url = `${this.apiURL}/RegisterUsers/check-email?email=${email}`;
  return this.httpClient.get<boolean>(url).pipe(
    catchError(this.errorHandler)
  );
}


errorHandler(error: any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

}
