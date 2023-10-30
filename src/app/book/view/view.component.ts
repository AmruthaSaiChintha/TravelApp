import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
    
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
     
  busId!: number;
  post!: Book;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: BookService,
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
        
    this.postService.find(this.busId).subscribe((data: Book)=>{
      this.post = data;
    });
  }
    
}