import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private apiKey: string = 'AIzaSyCLwvm2jsyfGjGhJxEIf_n_eWOGOLM0tWk'; // Replace with your API key

  constructor(private http: HttpClient) {}

  getDirections(source: string, destination: string): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${source}&destination=${destination}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
