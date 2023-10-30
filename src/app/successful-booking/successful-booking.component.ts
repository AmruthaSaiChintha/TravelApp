import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful-booking',
  templateUrl: './successful-booking.component.html',
  styleUrls: ['./successful-booking.component.css']
})
export class SuccessfulBookingComponent {
  constructor(private router:Router){}
  closeModal() {
  this.router.navigate(['/index']);
  }
}
