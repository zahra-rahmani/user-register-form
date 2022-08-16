import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  currentUser?: User;
  currentIndex = -1;
  users: User[] = [];
  public editedUser!: User;
  public deletedUser!: User;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() : void {
    this.userService.getUsers().subscribe(
      (Response: User[]) => {
        this.users = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
   }  


   setActiveUser(user: User, index: number) {
      this.currentUser = user;
      this.currentIndex = index;
   }


   deleteUser(user: User) {
      this.userService.deleteUser(user.id).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        }
      );
   }

   public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editedUser = user;
      button.setAttribute('data-target', '#updatUserModal');
    }
    if (mode === 'delete') {
      this.deletedUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
