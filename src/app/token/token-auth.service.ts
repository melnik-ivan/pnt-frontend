import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { URLS } from '../api';

@Injectable()
export class TokenAuthService {
  private token: string = this.localTokenLoader();
  private headers = new Headers({'Content-Type': 'application/json'});
  private updaterOn = false;

  constructor(private http: Http,
              private router: Router) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private localTokenSaver(): void {
    localStorage.setItem('currentToken', this.token);
  }

  private localTokenLoader(): string {
    return localStorage.getItem('currentToken');
  }

  requestToken(username: string, password: string): Promise<string> {
    const res = this.http.post(URLS.getTokenUrl, JSON.stringify(
      {username: username, password: password}), {headers: this.headers}
    )
      .toPromise()
      .then(response => this.token = response.json()['token'])
      .catch(this.handleError);
    res.then(token => this.localTokenSaver());
    return res;
  }

  refreshToken(): Promise<string> {
    console.log('refresh token: ' + this.token);
    const res = this.http.post(URLS.refreshTokenUrl, JSON.stringify({token: this.token}), {headers: this.headers})
      .toPromise()
      .then(response => this.token = response.json()['token'])
      .catch(this.handleError);
    res.then(token => this.localTokenSaver());
    return res;
  }

  verifyToken(): Promise<boolean> {
    return this.http.post(URLS.verifyTokenUrl, JSON.stringify({token: this.token}), {headers: this.headers})
      .toPromise()
      .then(response => this.token === response.json()['token'])
      .catch(this.handleError);
  }

  getToken(): string {
    return this.token;
  }

  removeToken(): void {
    this.token = '';
  }

  updateTokenStart(): void {
    const refresh = this.refreshToken.bind(this);
    if (!this.updaterOn) {
      setInterval(refresh, 90000);
      this.updaterOn = true;
    } else {
      console.log('ignor');
    }
  }

  isValidOrRelocate(): Promise<boolean> {
    let isValid: Promise<boolean>;
    if (!this.token) {
      isValid = this.router.navigate(['/login']).then(
        res => false
      );
    } else {
      isValid = this.verifyToken();
      isValid.then(res => {
        if (!res) {
          this.router.navigate(['/login']);
        }
      });
    }
    return isValid;
  }

}
