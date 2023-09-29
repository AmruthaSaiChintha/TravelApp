import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';   

@Component({
  selector: 'app-createfeed',
  templateUrl: './createfeed.component.html',
  styleUrls: ['./createfeed.component.css']
})
export class CreatefeedComponent implements OnInit {

   
    
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: FeedService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      Text: new FormControl('', Validators.required),
      Rating: new FormControl('', Validators.required)
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
    this.postService.create(this.form.value).subscribe((res:any) => {
         console.log('User created successfully!');
         this.router.navigateByUrl('/viewfeed');
    })
  }
  
}