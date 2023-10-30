import { Component } from '@angular/core';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-viewfeed',
  templateUrl: './viewfeed.component.html',
  styleUrls: ['./viewfeed.component.css']
})
export class ViewfeedComponent {
    User:any;
   IsLoggedIn:boolean=false
   
    constructor(private regService: FeedService) { }
  
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
  
