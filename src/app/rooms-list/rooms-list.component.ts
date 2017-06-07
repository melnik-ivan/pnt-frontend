import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { TokenAuthService } from '../token/token-auth.service';
import { Room } from './room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
  rooms: Room[];

  constructor(
    private roomService: RoomService,
    private tokenAuthService: TokenAuthService
  ) { }

  ngOnInit() {
    this.tokenAuthService.isValidOrRelocate()
      .then(isValid => {
        this.tokenAuthService.updateTokenStart();
      })
      .then(res => this.getRooms());
  }

  getRooms(): void {
    this.roomService.getRooms().then(rooms => this.rooms = rooms);
  }

}
