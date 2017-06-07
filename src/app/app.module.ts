import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenAuthService } from './token/token-auth.service';
import { LoginComponent } from './login/login.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomService } from './rooms-list/room.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    TokenAuthService,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
