import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoomService } from '../room.service';
import { PostService } from '../post.service';
import { User } from '../user';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.css'],
})
export class RoomBookingComponent implements OnInit {
  userId!: number;
  user!: User;
  form!: FormGroup;
  room: any = {};
  datesInvalid = false;
  roomIdAsNumber: number | null = null;
  minCheckInDate!: Date;
  maxCheckInDate!: Date;
  minCheckOutDate!: Date;
  maxCheckOutDate!: Date;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private roomService: RoomService
  ) {
    // Set the default check-in and check-out date values (e.g., today and one month from today)
    const today = new Date();
    const oneMonthFromToday = new Date(today);
    oneMonthFromToday.setMonth(today.getMonth() + 1);

    this.form = this.fb.group({
      userId: [4010, [Validators.required]],
      adultsCount: [2, [Validators.required]],
      checkInDate: [today.toISOString().slice(0, 10), [Validators.required]],
      price: [8000, [Validators.required]],
      roomId: [1, [Validators.required]],
      childrenCount: [1, [Validators.required]],
      checkOutDate: [oneMonthFromToday.toISOString().slice(0, 10), [Validators.required]],
    }, { validator: this.dateValidator });
  }

  ngOnInit() {
    // Simulate user login date (you should get this from your authentication service)
    const userLoginDate = new Date('2023-09-22'); // Replace this with your actual login date

    // Calculate the min and max check-in and check-out dates based on the user's login date
    this.minCheckInDate = userLoginDate;
    this.maxCheckInDate = new Date(userLoginDate);
    this.maxCheckInDate.setDate(userLoginDate.getDate() + 30); // Allow booking up to 30 days from login

    this.minCheckOutDate = userLoginDate;
    this.maxCheckOutDate = new Date(userLoginDate);
    this.maxCheckOutDate.setDate(userLoginDate.getDate() + 30); // Allow booking up to 30 days from login

    this.route.paramMap.subscribe((params) => {
      const roomId = params.get('id');
      console.log('roomId (from route params):', roomId);

      if (roomId !== null) {
        const roomIdAsNumber = +roomId;
        console.log('roomIdAsNumber (parsed):', roomIdAsNumber);

        // Fetch room details based on roomId
        this.roomService.getRoomDetails(roomIdAsNumber).subscribe(
          (roomDetails) => {
            this.room = roomDetails;
            console.log('Room Details:', roomDetails);
          },
          (error) => {
            console.error('Error fetching room details:', error);
          }
        );
      } else {
        console.error('roomId is null or undefined');
      }
    });
  }
  dateValidator(group: FormGroup) {
    const checkInDate = group.get('checkInDate')?.value;
    const checkOutDate = group.get('checkOutDate')?.value;

    if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
      this.datesInvalid = true; // Set the variable to true if dates are invalid
      return { invalidDates: true };
    } else {
      this.datesInvalid = false; // Set the variable to false if dates are valid
    }

    return null;
  }
  submit() {
    console.log('Form Values:', this.form.value);
  
    if (this.form.valid) {
      // Check if the check-in date is greater than or equal to the check-out date
      const checkInDate = new Date(this.form.value.checkInDate);
      const checkOutDate = new Date(this.form.value.checkOutDate);
  
      if (checkInDate >= checkOutDate) {
        // Show an error message and do not proceed with booking
        this.datesInvalid = true;
        return;
      }
  
      // Dates are valid, proceed with booking
      this.http.post('http://localhost:52612/api/HotelBookings/', this.form.value).subscribe(
        (response) => {
          // Handle success
          console.log('Request was successful', response);
          this.router.navigate(['/successfulBooking']);
        },
        (error) => {
          // Handle error
          console.error('Error:', error);
        }
      );
    } else {
      // Form is invalid, set the error flag to show the error message
      this.datesInvalid = true;
    }
  }
  
  
  
}
