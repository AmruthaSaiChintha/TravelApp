import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.css']
})
export class booknowComponent implements OnInit{
   
  source: string = '';
  destination: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the source and destination route parameters
    this.route.queryParams.subscribe(params => {
      this.source = params['source'];
      this.destination = params['destination'];
    });
  }
}
