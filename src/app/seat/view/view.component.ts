import { Component, OnInit } from '@angular/core';
import { SeatService } from '../seat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Seat } from '../seat';
    
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
     
  busId!: number;
  post!: Seat;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: SeatService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.busId = this.route.snapshot.params['postId'];
        
    this.postService.find(this.busId).subscribe((data: Seat)=>{
      this.post = data;
    });
  }
    
}