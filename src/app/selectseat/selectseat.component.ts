import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selectseat',
  templateUrl: './selectseat.component.html',
  styleUrls: ['./selectseat.component.css']
})
export class SelectseatComponent implements OnInit {
  busName: string = '';
  source: string = '';
  destination: string = '';
  departureDate: string = '';
  charges: number = 0;
  BusId: number = 0; // Added BusId property
  seats: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Retrieve bus information from route parameters
    this.route.queryParams.subscribe(params => {
      this.busName = params['busName'];
      this.source = params['source'];
      this.destination = params['destination'];
      this.departureDate = params['departureDate'];
      this.charges = params['charges'];
      this.BusId = params['BusId']; // Get the BusId from queryParams
    });
  
    // Fetch seat information for the selected bus based on BusId
    this.http.get<any[]>(`https://localhost:44331/api/seats?busId=${this.BusId}`).subscribe(seatsArray => {
      // Check if you have received data
      if (seatsArray && seatsArray.length > 0) {
        // Assuming there's only one seat information for this bus
        const seat = seatsArray[0];
        this.seats.push(seat); // Add the seat information to the seats array
      }
    });
  }
  selectSeat(seat: any): void {
    this.selectSeat = seat;
    // You can perform any additional actions here, such as sending the selected seat to a booking page.
  }
  // ticketInto() {
  //   this.router.navigate(['/selectseat'], {
  //     // Optional navigation options here
  //   });
  // }


}

