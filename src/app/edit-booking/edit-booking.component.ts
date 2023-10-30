import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
  bookingId: number | null = null;
  booking: any = {}; // Initialize an empty booking object

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService) {}

  ngOnInit() {
    // Get the booking ID from the route parameter
    this.route.paramMap.subscribe((params) => {
      const bookingIdParam = params.get('id');
      if (bookingIdParam !== null) {
        this.bookingId = parseInt(bookingIdParam, 10);

        // Fetch the booking based on the retrieved bookingId
        this.fetchBooking();
      }
    });
  }

  fetchBooking() {
    // Ensure that bookingId is not null before making the request
    if (this.bookingId !== null) {
      this.postService.getBooking(this.bookingId).subscribe(
        (booking) => {
          this.booking = booking;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  onSubmit() {
    // Ensure that bookingId is not null before making the request
    if (this.bookingId !== null) {
      // Update the booking using the postService
      this.postService.update(this.bookingId, this.booking).subscribe(
        (data: any) => {
          console.log(data);
          console.log('Booking updated successfully');
          
          // Redirect to the user-bookings route after successful update
          this.router.navigate(['/userbookings', this.booking.userId]);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
