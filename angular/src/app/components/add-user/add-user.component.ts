import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  name= '';
  email= '';
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser() {
    const data = {
      name: this.name,
      email: this.email,
      id: 0,
      userCode: ''
    }

    this.userService.addUser(data).subscribe(
      Response => {
        console.log(Response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  newUser() {
    this.submitted = false;
    this.name= '';
    this.email= '';
  
  }

}
