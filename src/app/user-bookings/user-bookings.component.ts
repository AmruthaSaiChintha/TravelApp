import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';
// import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  userBookings: any;
  userId: number | null = null;
  currentDate: Date = new Date(); 
  // userId!: number;
  IsLoggedIn!: boolean;
  IsAdmin!: boolean;
  IsCustomer!: boolean;
  id: any;
  users!: User[];
  userService: any;
  constructor(
    private postService: PostService, 
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) {
    this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('id');
      console.log(userIdParam);

      if (userIdParam !== null) {
        this.userId = parseInt(userIdParam, 10);

        // Fetch user bookings based on the retrieved userId
        this.postService.getUserBookings(this.userId).subscribe(
          (bookings) => {
            this.userBookings = bookings;
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.IsLoggedIn=localStorage.getItem("User")!=null ;
    var x = localStorage.getItem("User");
   if(x){
    this.IsAdmin=JSON.parse(x).value.username=='Admin';
    // this.id=JSON.parse(x).userId;
    // console.log(this.id)
    this.IsCustomer = JSON.parse(x).value.username=='Customer';
    this.id = JSON.parse(x).value.userId;
    console.log(this.id);
    
    

 }
//  this.load();
this.userService.getAll().subscribe((data: User[])=>{
  this.users = data;
  console.log(this.users);

})
    

    this.getUserBookings(1);
      }
      
      getUserBookings(userId: number): void {
        this.postService.getUserBookings(userId)
          .subscribe((bookings) => {
            this.userBookings = bookings;
            console.log('User Bookings:', this.userBookings);
          }, (error) => {
            console.error('Error fetching user bookings:', error);
          });
      }
  }
  
