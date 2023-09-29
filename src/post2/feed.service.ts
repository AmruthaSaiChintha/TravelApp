import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = 'https://localhost:44365/api/feeds'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  saveFeedback(feedback: any): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }
}
