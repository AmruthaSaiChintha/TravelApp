import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
      
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
      
  posts: Book[] = [];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: BookService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Book[])=>{
      this.posts = data;
      console.log(this.posts);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.busId !== id);
         console.log('User deleted successfully!');
    })
  }
    
}