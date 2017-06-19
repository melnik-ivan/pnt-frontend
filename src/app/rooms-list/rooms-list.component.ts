import {Component, Input, OnInit} from '@angular/core';
import { RoomService } from './room.service';
import { TokenAuthService } from '../token/token-auth.service';
import { Room } from './room';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
  rooms: Room[];
  users: Observable<User[]>; // TODO: replace to UserComponent
  currentUser: User; // TODO: replace to UserComponent
  displayedRooms: Room[] = [];
  @Input() messagesComponent: MessagesComponent;
  selectedRoom: Room = {
    id: 0,
    title: '',
    owner: 0,
    members: [],
    messages: []
  };
  toggles = {create: false, invite: false};
  private searchTerms = new Subject<string>();

  constructor(
    private roomService: RoomService,
    private tokenAuthService: TokenAuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.tokenAuthService.isValidOrRelocate()
      .then(isValid => {
        this.tokenAuthService.updateTokenStart();
      })
      .then(res => this.getRooms());
    this.users = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.userService.searchUsers(term) : Observable.of<User[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<User[]>([]);
      })
      .map(users => users.filter(user => this.selectedRoom.members.indexOf(user.id) < 0));
    this.userService.getCurrentUser().then(user => this.currentUser = user);
  }

  updateDisplayedRooms(query: string): void {
    this.displayedRooms = this.rooms.filter(room => room.title.includes(query));
  }

  getRooms(): Promise<Room[]> {
    return this.roomService.getRooms().then(rooms => {
      this.rooms = rooms;
      if (this.rooms.length > 0) {
        this.selectedRoom = this.rooms[0];
      }
      this.updateDisplayedRooms('');
      return rooms;
    });
  }

  onSelectRoom(room: Room): void {
    this.selectedRoom = room;
    this.messagesComponent.updateDisplayedMessages();
  }

  onToggleOn(key: string): void {
    this.toggles[key] = true;
  }

  onToggleOff(key: string): void {
    this.toggles[key] = false;
  }

  onCreateOk(roomTitle: string): void {
    this.roomService.postRoom(roomTitle).then(room => {
      this.getRooms();
    });
    this.onToggleOff('create');
  }

  searchUsers(term: string): void {
    this.searchTerms.next(term);
  }

  inviteUser(user: User): Promise<Room> {
    this.selectedRoom.members.push(user.id);
    return this.roomService.putRoom(this.selectedRoom);
  }

  onSelectUser(user: User): void {
    this.inviteUser(user).then(room => {
      this.getRooms().then(() => this.selectedRoom = room);
    });
    this.onToggleOff('invite');
  }

}
