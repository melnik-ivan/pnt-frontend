import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { MessageService } from './message.service';
import { TokenAuthService } from '../token/token-auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];

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

  getMessages(): void {
    this.messageService.getMessages().then(messages => this.messages = messages);
  }

}
