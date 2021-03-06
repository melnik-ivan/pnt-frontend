import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { URLS } from '../api';
import { Room } from './room';
import { TokenAuthService } from '../token/token-auth.service';
import {UserService} from "../user/user.service";


@Injectable()
export class RoomService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + this.tokenAuthService.getToken()
  });

  constructor(
    private http: Http,
    private tokenAuthService: TokenAuthService,
    private userService: UserService
  ) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getRoom(roomId: number): Promise<Room> {
    return this.http.get(URLS.roomsUrl + roomId.toString() + '/', {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Room)
      .catch(this.handleError);
  }

  getRooms(): Promise<Room[]> {
    return this.http.get(URLS.roomsUrl, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Room[])
      .catch(this.handleError);
  }

  postRoom(title: string): Promise<Room> {
    let room: Room;
    return this.userService.getCurrentUser().then(user => {
      room = {
        id: 0,
        title: title,
        owner: user.id,
        members: [user.id],
        messages: []
      };
    })
      .then(() => this.http.post(URLS.roomsUrl, JSON.stringify(room), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Room)
        .catch(this.handleError)
    );

  }

  putRoom(room: Room): Promise<Room> {
    return this.http.put(URLS.roomsUrl + room.id.toString() + '/', JSON.stringify(room), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Room)
      .catch(this.handleError);
  }


}
