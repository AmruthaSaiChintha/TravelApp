import { Component } from '@angular/core';
import { SeService } from '../se.service';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css']
})
export class ViewbookComponent {
  User:any;
 IsLoggedIn:boolean=false
 
  constructor(private regService: SeService) { }

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
