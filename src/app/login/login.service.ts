import { Injectable } from '@angular/core';
import { TokenAuthService } from '../token/token-auth.service';

@Injectable()
export class LoginService {

  constructor(private tokenAuthService: TokenAuthService) { }

  login(login: string, password: string): Promise<boolean> {
    return this.tokenAuthService.requestToken(login, password)
      .then(token => this.tokenAuthService.verifyToken());
  }

}
