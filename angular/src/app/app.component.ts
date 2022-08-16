import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from './model/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public users: User[] = [];
  items: MenuItem[] = [];
 

  constructor(private userService: UserService) {}


    ngOnInit(): void {
      this.items = [
        {
            label: 'User Manager'
        },
        {
            label: 'Users',
            "routerLink": ['/user/all']
        },
        {
            label: 'Add',
            "routerLink":  ['/add']
        }
    ];
    }

   
}
