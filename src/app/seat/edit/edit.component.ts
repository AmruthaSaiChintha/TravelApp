import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { FormGroup, FormControl, Validators} from '@angular/forms';
     
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
      
  busId!: number;
  post!: Post;
  id!:number;
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
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
    this.postService.find(this.busId).subscribe((data: Post)=>{
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