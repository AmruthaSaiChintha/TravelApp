
import { Component } from '@angular/core';
import { RefundService } from '../refund.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent {


  Bus:any;

  constructor(private dataService: RefundService) { }

  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.Bus= data;
    }) 

}
}

