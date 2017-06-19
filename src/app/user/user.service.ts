import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { URLS } from '../api';
import { User } from './user';
import { TokenAuthService } from '../token/token-auth.service';

@Injectable()
export class UserService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + this.tokenAuthService.getToken()
  });

  constructor(private http: Http,
              private tokenAuthService: TokenAuthService) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getCurrentUser(): Promise<User> {
    return this.http.get(URLS.currentUserUrl, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get(URLS.usersUrl, {headers: this.headers})
  //     .map(response => response.json().results as User[]);
  // }

  searchUsers(usernamePart: string): Observable<User[]> {
    return this.http.get(URLS.usersUrl + '?search=' + usernamePart, {headers: this.headers})
      .map(response => response.json().results as User[]);
  }
}
