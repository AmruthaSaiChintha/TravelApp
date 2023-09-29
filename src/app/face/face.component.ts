import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Import your user service

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.css']
})
export class FaceComponent implements OnInit {
  User:any;

  constructor(private UserService: UserService) { }

  ngOnInit() {

    this.UserService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.User= data;
    }) 
  
  }
  }