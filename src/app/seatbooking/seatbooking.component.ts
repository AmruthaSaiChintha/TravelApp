import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface BusDetailsResponse {
  firstAC: number;
  secondAC: number;
  sleeper: number;
}
@Component({
  selector: 'app-seatbooking',
  templateUrl: './seatbooking.component.html',
  styleUrls: ['./seatbooking.component.css']
})
export class SeatbookingComponent implements OnInit {
  source: string = '';
  destination: string = '';
  departureDate: Date = new Date();
  departureTime: string = '';
  BusName: string = '';
  totalAmount: any;
  form!: FormGroup;

  defaultFormValues = {
    userId: 1,
    busId: 1,
    busName: 'Garuda',
    source: 'Shiridi',
    destination: 'Ananthapur',
    firstACSeats: 0,
    secondACSeats: 0,
    sleeperSeats: 0,
    bookingDate: '2023-09-23', // Default booking date
    departureDate: '2023-09-24',
    departureTime: '9:00 PM', // Default departure time
    fareAmount: 0
  };

  selectedSeats: any = {
    firstAC: 0,
    secondAC: 0,
    sleeper: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      userId: [this.defaultFormValues.userId, [Validators.required]],
      busId: [this.defaultFormValues.busId, [Validators.required]],
      busName: [this.defaultFormValues.busName, [Validators.required]],
      source: [this.defaultFormValues.source, [Validators.required]],
      destination: [this.defaultFormValues.destination, [Validators.required]],
      firstACSeats: [this.defaultFormValues.firstACSeats, [Validators.required]],
      secondACSeats: [this.defaultFormValues.secondACSeats, [Validators.required]],
      sleeperSeats: [this.defaultFormValues.sleeperSeats, [Validators.required]],
      bookingDate: [this.defaultFormValues.bookingDate, [Validators.required]],
      departureDate: [this.defaultFormValues.departureDate, Validators.required],
      departureTime: [this.defaultFormValues.departureTime, Validators.required],
      fareAmount: [this.defaultFormValues.fareAmount, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const state = window.history.state;
  
      
      if (state) {
        this.source = state.source;
        this.destination = state.destination;
         this.departureDate = new Date("2023-09-23T10:44:17.507");
        this.departureTime = state.departureTime;
        this.BusName = state.busName;
        this.totalAmount = state.totalAmount;
  
        this.selectedSeats.firstAC = state.selectedFirstAC;
        this.selectedSeats.secondAC = state.selectedSecondAC;
        this.selectedSeats.sleeper = state.selectedSleeper;
      }
    });
  }
  

  submit() {
    console.log('Form Values:', this.form.value);
    this.http.post('https://localhost:44331/api/Booking/', this.form.value).subscribe(
      (response) => {
        console.log('Request was successful', response);
  
        // After successful booking, fetch current available seats
        this.fetchSeatDetails(this.form.value.busId);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
 

  fetchSeatDetails(busId: number) {
    this.http.get<BusDetailsResponse>(`https://localhost:44331/api/BusDetails/${busId}`).subscribe(
      (response) => {
        console.log('Fetched Seat details', response);
  
        const availableSeats = {
          firstAC: response.firstAC,
          secondAC: response.secondAC,
          sleeper: response.sleeper,
        };
        console.log(availableSeats  )
        const bookingDetails = {
          FirstAC: this.form.value.firstACSeats,
          SecondAC: this.form.value.secondACSeats,
          Sleeper: this.form.value.sleeperSeats,
        };
        console.log(bookingDetails);
  
        const remainingSeats = {
          firstAC: availableSeats.firstAC - bookingDetails.FirstAC,
          secondAC: availableSeats.secondAC - bookingDetails.SecondAC,
          sleeper: availableSeats.sleeper - bookingDetails.Sleeper,
        };
  
        console.log('Remaining Seats:', remainingSeats);
  
        // Update the remaining seats
        this.updateAvailableSeats(busId, remainingSeats);
      },
      (error) => {
        console.error('Failed to fetch seat details:', error);
        // Log the error response for further investigation
        console.error('Error Response:', error.error);
      }
    );
  }
  
  updateAvailableSeats(busId: number, updatedSeats: any) {
    console.log('updateAvailableSeats method called');
    console.log(updatedSeats);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put(`https://localhost:44331/api/BusDetails/update-seats/${busId}`, updatedSeats, {headers:new HttpHeaders ({'Content-Type':'applicaion/json'})})
    .subscribe((res)=> {
      console.log(res);
    }, 
    (err)=> {
      console.log("Error:", err)
    });
  
  }}