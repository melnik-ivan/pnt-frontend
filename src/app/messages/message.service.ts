import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URLS } from '../api';
import { Message } from './message';
import { TokenAuthService } from '../token/token-auth.service';


@Injectable()
export class MessageService {
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

  getMessage(messageId: number): Promise<Message> {
    return this.http.get(URLS.messagesUrl + messageId.toString() + '/', {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Message)
      .catch(this.handleError);
  }

  getMessages(): Promise<Message[]> {
    return this.http.get(URLS.messagesUrl, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Message[])
      .catch(this.handleError);
  }

  postMessage(message: Message): Promise<Message> {
    return this.http.post(URLS.messagesUrl, JSON.stringify(message), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Message)
      .catch(this.handleError);
  }

  putMessage(message: Message): Promise<Message> {
    return this.http.post(URLS.messagesUrl + message.id.toString() + '/', JSON.stringify(message), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Message)
      .catch(this.handleError);
  }


}

