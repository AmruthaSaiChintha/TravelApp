import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { FormGroup, FormControl, Validators} from '@angular/forms';
     
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
      
  busId!: number;
  post!: Book;
  id!:number;
  form!: FormGroup;
    
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
    console.log(this.busId);
    this.postService.find(this.busId).subscribe((data: Book)=>{
      console.log(data);
      this.post = data;
    }); 
      
    this.form = new FormGroup({
      busName: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required),
      image:new FormControl('',Validators.required),
      destination: new FormControl('', Validators.required),
      departureDate: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
      charges: new FormControl('', Validators.required)
    });
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.postService.update(this.busId, this.form.value).subscribe((res:any) => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('post/index');
    })
  }
   
}