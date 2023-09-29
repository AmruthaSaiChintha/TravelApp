import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendConfirmationEmail(email: string): Observable<any> {
    const apiUrl = 'your-backend-api-url/send-email'; // Replace with your backend API endpoint
    const emailData = { email };

    return this.http.post(apiUrl, emailData);
  }
}
