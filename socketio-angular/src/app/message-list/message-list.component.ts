import { Component, OnInit } from '@angular/core';
import {SocketIOService} from "../socketIO.service";

interface Message {
  message: string
}

@Component({
  selector: 'app-messege-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];

  constructor(
    private socketService: SocketIOService,
  ) { }

  ngOnInit(): void {
    this.outputMes()
  }

  outputMes() {
    this.socketService.acceptMessage().subscribe( x  => {
        this.messages.push({message: x});
    })
  }
}
