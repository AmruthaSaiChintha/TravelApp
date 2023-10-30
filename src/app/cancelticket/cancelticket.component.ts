import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'app-cancelticket',
  templateUrl: './cancelticket.component.html',
  styleUrls: ['./cancelticket.component.css']
})
export class CancelticketComponent {
  UserName: any;
  Email: any;
  Contact: string = '';
  Image: string = '';
  AccountNo:string='';
  showSuccessMessage: boolean = false;
  userId!: number;
  IsLoggedIn!: boolean;
  IsAdmin!: boolean;
  IsCustomer!: boolean;
  id: any;
  users!: User[];
 
  constructor(private httpClient: HttpClient,private userService:UserService) {}

  submitDetails() {
    const requestData = {
      UserName: this.UserName,
      Email: this.Email,
      Contact: this.Contact,
      Image: this.Image,
      AccountNo:this.AccountNo
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Simulate a successful submission for demonstration purposes.
    setTimeout(() => {
      this.showSuccessMessage = true;
    }, 1000);

    this.httpClient
      .post('https://localhost:44331/api/refunds', requestData, { headers })
      .subscribe(
        (response) => {
          console.log('Data sent:', response);
          this.showSuccessMessage = true;
        },
        (error) => {
          console.error('Error sending data:', error);
        }
      );
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
    
  }
}

 






