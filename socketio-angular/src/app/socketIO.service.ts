import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {environment} from "../environments/environment";
import {interval, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  socket: any;

  constructor() {
    this.socket = io();
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
      });
    })
  }

}

export class SocketIOServiceStub {
  private _index = 0;

  public sendMessage(msg: string) {
    //void
  }

  public acceptMessage(): Observable<string> {
    return interval(1000).pipe(
      map( () => (this._index++).toString())
    );
  }
}
