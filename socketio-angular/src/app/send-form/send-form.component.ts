import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

import {SocketioService} from "../socketio.service";

@Component({
  selector: 'app-send-form',
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.scss']
})
export class SendFormComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    message: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketioService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.socketService.sendMessage(this.checkoutForm.value.message);
    this.checkoutForm.reset();
  }

}
