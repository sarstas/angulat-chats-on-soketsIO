import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: any;

  constructor() {

  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(msg: string) {
    this.socket.emit('chat message', msg);
  }

  acceptMessage(): Observable<string>  {
    return new Observable(subscriber => {
      this.socket.on('my broadcast', (data: string) => {
        subscriber.next(data);
        console.log(data);
      });
    })
  }
}
