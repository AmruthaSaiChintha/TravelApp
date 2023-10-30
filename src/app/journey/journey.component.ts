import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit{

  source: string = '';
  destination: string = '';
  departureDate: string = '';
  departureTime: string = '';
  BusName: string = '';
  charges: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.source = history.state.source;
    this.destination = history.state.destination;
    this.departureDate = history.state.departureDate;
    this.departureTime = history.state.departureTime;
    this.BusName = history.state.BusName;
    this.charges = history.state.charges;
  }



  
  
}





