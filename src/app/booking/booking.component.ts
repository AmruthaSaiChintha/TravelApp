import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  User: any;
  IsLoggedIn: boolean = false;

  constructor(private regService: BookingService, private router: Router) { }

  ngOnInit() {
    this.regService.sendGetRequest().subscribe((data: any) => {
      console.log(data);
      this.User = data;
    });
  }

  Logout() {
    localStorage.removeItem('User');
    location.href = '/login';
  }

  navigateToMap(source: string, destination: string) {
    // Navigate to the MapComponent with query parameters
    this.router.navigate(['/map'], {
      queryParams: {
        source: source,
        destination: destination
      }
    });
  }
}

