import {Component, Input, OnInit} from '@angular/core';
import { Room } from '../rooms-list/room';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  @Input() selectedRoom: Room;

  constructor() { }

  ngOnInit() {
  }

}
