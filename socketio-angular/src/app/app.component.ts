import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

import {SocketioService} from "./socketio.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  title = 'socketio-angular';

  tokenForm = this.formBuilder.group({
    token: "",
  });

  constructor(
    private socketService: SocketioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.socketService.setupSocketConnection();
  }


  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
