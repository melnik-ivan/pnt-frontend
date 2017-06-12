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
  displayedRooms: Room[];
  selectedRoom: Room;

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

  updateDisplayedRooms(query: string): void {
    this.displayedRooms = this.rooms.filter(room => room.title.includes(query));
  }

  getRooms(): void {
    this.roomService.getRooms().then(rooms => {
      this.rooms = rooms;
      if (this.rooms.length > 0) {
        this.selectedRoom = this.rooms[0];
      }
      this.updateDisplayedRooms('');
    });
  }

  onSelectRoom(room: Room): void {
    this.selectedRoom = room;
  }

}
