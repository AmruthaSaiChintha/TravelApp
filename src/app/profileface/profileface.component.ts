import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-profileface',
  templateUrl: './profileface.component.html',
  styleUrls: ['./profileface.component.css']
})
export class ProfilefaceComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  newsArticles: any[] = [
    {
      title: 'New Feature Added to Bus Reservation System',
      content: 'We are excited to announce the addition of a new feature that allows passengers to select their preferred seats during the reservation process.'
    },
    {
      title: 'Holiday Special: Discounts on Round-Trip Bookings',
      content: 'To celebrate the upcoming holiday season, we are offering exclusive discounts on round-trip bus bookings. Don\'t miss out!'
    },
    {
      title: 'COVID-19 Safety Measures',
      content: 'Your safety is our top priority. We have implemented stringent COVID-19 safety measures on all our buses to ensure a safe and comfortable journey for you.'
    },
    {
      title: 'New Route Launch: City to Countryside',
      content: 'Introducing a scenic route from the bustling city to the serene countryside. Experience the beauty of nature while traveling comfortably.'
    }
    // Add more news articles here...
  ];
}
