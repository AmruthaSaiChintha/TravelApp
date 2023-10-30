import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-mybook',
  templateUrl: './mybook.component.html',
  styleUrls: ['./mybook.component.css']
})
export class MybookComponent {
 
  
 
  
    Bus:any;
    userId!: number;
    IsLoggedIn!: boolean;
    IsAdmin!: boolean;
    IsCustomer!: boolean;
    id: any;
    users!: User[];
    constructor(private dataService: BookingService,private userService:UserService) { }
  
    ngOnInit() {
      this.IsLoggedIn=localStorage.getItem("User")!=null ;
      var x = localStorage.getItem("User");
     if(x){
      this.IsAdmin=JSON.parse(x).value.username=='Admin';
      // this.id=JSON.parse(x).userId;
      // console.log(this.id)
      this.IsCustomer = JSON.parse(x).value.username=='Customer';
      this.id = JSON.parse(x).value.userId;
      console.log(this.id);
      
  
      this.dataService.sendGetRequest().subscribe((data: any)=>{
        console.log(data);
        this.Bus= data;
      }) 
  
  }
  this.userService.getAll().subscribe((data: User[])=>{
    this.users = data;
    console.log(this.users);
  
  })
  }
  }
  

