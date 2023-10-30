// view-profile.component.ts

import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

import { User } from '../user';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  editing = false;
  userId!: number;
  id!:number;
  form!: FormGroup;

  submitted = false;

  user: User = {
    userId: 0,
    username: '',
    email: '',
    password: '',
   
    confirmPassword: ''
  };

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log('Route Params:', params);
      const userIdParam = params.get('id'); 
      console.log('User ID Param:', userIdParam);
  
      if (userIdParam !== null) {
        // Explicitly parse as a string and then convert to a number
        this.userId = parseInt(userIdParam, 10);
        console.log('Parsed User ID:', this.userId);
  
        if (!isNaN(this.userId) && this.userId !== -1) {
          this.userService.getUserDetails(this.userId).subscribe((user) => {
            this.user = user;
          });
        }
      } else {
        console.log('userIdParam is null'); // Add this for debugging
      }
    });
  }
  goToUserBookings() {
    if (this.userId !== null) {
      this.router.navigate(['/userbookings', this.userId]);
    }
}
  
  
}