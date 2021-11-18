import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SocketioService} from "./socketio.service";
import { SendFormComponent } from './send-form/send-form.component';
import { MessageListComponent } from './message-list/message-list.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SendFormComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
