import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {environment} from "../environments/environment";
import {from, interval, map, Observable, of, take, timer} from "rxjs";

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
  private _index = 1;

  public sendMessage(msg: string) {
    return msg
  }

  public acceptMessage(): Observable<string> {

    return interval(1000).pipe(
      take(3),
      map( () => (this._index++).toString())
    );
  }




}
