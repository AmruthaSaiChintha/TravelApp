import { Component } from '@angular/core';
import { FeeService } from '../fee.service';

@Component({
  selector: 'app-showfeed',
  templateUrl: './showfeed.component.html',
  styleUrls: ['./showfeed.component.css']
})
export class ShowfeedComponent {

  User:any;
 IsLoggedIn:boolean=false
 
  constructor(private regService: FeeService) { }

  ngOnInit() {

    this.regService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.User= data;
    }) 

}
Logout(){

  localStorage.removeItem("User");
  location.href = "/login";
  
}
}