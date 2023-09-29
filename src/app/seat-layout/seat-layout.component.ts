import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css']
}) // choodu em cheyachu ante like ippudu manam tickect route lo unnam, akkada oka eventlistener create chesi akkada ee popstate tho yeppudaithe back velthamo appudu this 
//var lo unna sourse and dest values nunchi akkada populate chesi  
export class SeatLayoutComponent implements OnInit {
  selectedSeats: {
    firstACSeats: number;
    secondACSeats: number;
    sleeperSeats: number;
  } = {
    firstACSeats: 0,
    secondACSeats: 0,
    sleeperSeats: 0
  };

  charges: number = 0;
  departureDate: string = '';
  departureTime: string = '';
  busName: string = '';
  totalAmount: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const state = window.history.state;

      if (state) {
        this.departureDate = state.departureDate;
        this.departureTime = state.departureTime;
        this.busName = state.busName;
        this.totalAmount=state.totalAmount

        this.selectedSeats.firstACSeats = state.selectedFirstACSeats;
        this.selectedSeats.secondACSeats = state.selectedSecondACSeats;
        this.selectedSeats.sleeperSeats = state.selectedSleeperSeats;

      }
    });
  }

  // calculateCharges(state: any): number {
  //   const firstACPrice: number = state.FirstACPrice;
  //   const secondACPrice: number = state.SecondACPrice;
  //   const sleeperPrice: number = state.SleeperPrice;
  
  //   const selectedFirstACSeats: number = state.selectedFirstACSeats;
  //   const selectedSecondACSeats: number = state.selectedSecondACSeats;
  //   const selectedSleeperSeats: number = state.selectedSleeperSeats;
  
  //   const firstACCharges: number = selectedFirstACSeats * firstACPrice;
  //   const secondACCharges: number = selectedSecondACSeats * secondACPrice;
  //   const sleeperCharges: number = selectedSleeperSeats * sleeperPrice;
  
  //   const totalCharges: number = firstACCharges + secondACCharges + sleeperCharges;
  
  //   return totalCharges;
  // }
  
  
}


