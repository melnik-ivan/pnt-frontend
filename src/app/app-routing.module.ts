import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MessengerComponent } from './messenger/messenger.component';


const routes: Routes = [
  { path: 'static', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'rooms', component: RoomsListComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'messenger', component: MessengerComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
