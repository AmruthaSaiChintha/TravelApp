import { Component } from '@angular/core';
import { BookingService } from '../booking.service';


@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.css']
})
export class ViewbookingsComponent {

  Bus:any;

  constructor(private dataService: BookingService) { }

  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.Bus= data;
    }) 

}
}
