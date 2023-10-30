import { Component } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent {
  user: User[] = [];
  constructor(private userService: UserService) { }
  ngOnInit() {

    this.userService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.user = data;
    }) 


}
deletePost(id:number){
  this.userService.delete(id).subscribe(res => {
       this.user = this.user.filter(user=> user.userId !== id);
       console.log('User deleted successfully!');
  })

}
}