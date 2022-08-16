import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/user.service';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  currentUser: User = {
    name: '',
    email: '',
    id: 0,
    userCode: ''
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe(
      response => {
        this.currentUser = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      (response: void) => {
        console.log(response);
        alert('User Deleted Successfully!');
        this.router.navigate(['user/all']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.router.navigate(['user/all']);
      }
    );
  }
  
  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        alert('User Changed Successfully!');
        this.router.navigate(['user/all']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
