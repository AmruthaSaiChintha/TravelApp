import { Component, OnInit } from '@angular/core';
import { SeService } from '../se.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';   
@Component({
  selector: 'app-createseat',
  templateUrl: './createseat.component.html',
  styleUrls: ['./createseat.component.css']
})
export class CreateseatComponent implements OnInit {
    
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: SeService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      BusId: new FormControl('', Validators.required),
      FirstAC: new FormControl('', Validators.required),
      SecondAC: new FormControl('', Validators.required),
      Sleeper: new FormControl('', Validators.required),
      Total: new FormControl('', Validators.required),
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
         this.router.navigateByUrl('/viewbook');
    })
  }
  
}