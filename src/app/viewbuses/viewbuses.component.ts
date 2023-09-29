import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-viewitems',
  templateUrl: './viewbuses.component.html',
  styleUrls: ['./viewbuses.component.css']
})
export class viewbusesComponent {
  Bus:any;
  userId!: number;
  IsLoggedIn!: boolean;
  IsAdmin!: boolean;
  IsCustomer!: boolean;
  id: any;
  users!: User[];

  // constructor(private userService:UserService){}
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
 this.dataService.sendGetRequest().subscribe((data: any)=>{
  console.log(data);
  this.Bus= data;
}) 
//  this.load();
this.userService.getAll().subscribe((data: User[])=>{
  this.users = data;
  console.log(this.users);

})
    
  }
  constructor(private dataService: DataService,private userService:UserService) { }

  
}