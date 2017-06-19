import { Component, Input, OnInit } from '@angular/core';
import { Message } from './message';
import { MessageService } from './message.service';
import { TokenAuthService } from '../token/token-auth.service';
import { RoomsListComponent } from '../rooms-list/rooms-list.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  displayedMessages: Message[] = [];
  @Input() roomListComponent: RoomsListComponent;

  constructor(
    private messageService: MessageService,
    private tokenAuthService: TokenAuthService
  ) { }

  ngOnInit() {
    this.tokenAuthService.isValidOrRelocate()
      .then(isValid => {
        this.tokenAuthService.updateTokenStart();
      })
      .then(res => this.getMessages());
  }

  updateDisplayedMessages(): void {
    this.displayedMessages = this.messages.filter(message => message.room === this.roomListComponent.selectedRoom.id);
  }

  getMessages(): void {
    this.messageService.getMessages().then(messages => this.messages = messages).then(
      () => this.updateDisplayedMessages()
    );
  }

  sendMessage(content: string): Promise<Message> {
    const message: Message = {
      id: 0,
      owner: 0,
      room: this.roomListComponent.selectedRoom.id,
      content: content
    };
    const res =  this.messageService.postMessage(message);
    res.then(() => this.getMessages());
    return res;
  }

}
