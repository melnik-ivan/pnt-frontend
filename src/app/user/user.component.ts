import { Component, OnInit } from '@angular/core';
import { User } from './user';
import {UserService} from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().then(user => this.currentUser = user);
  }

}
