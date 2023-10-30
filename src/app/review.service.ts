import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from './review/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:52612/api/feedbacks'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  submitReview(review: Review): Observable<any> {
    return this.http.post(`${this.apiUrl}`, review);
  }
  getAll(): Observable<Review[]> {
    // Replace this with your actual API endpoint to fetch rooms
    return this.http.get<Review[]>(this.apiUrl);
  }
}

  
