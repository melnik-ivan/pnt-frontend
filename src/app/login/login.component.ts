import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
  @Input() login: string;
  @Input() password: string;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(): void {
    this.loginService.login(this.login, this.password).then(res => {
      if (res) {
        this.router.navigate(['/messenger']);
      }
    });
  }

}
