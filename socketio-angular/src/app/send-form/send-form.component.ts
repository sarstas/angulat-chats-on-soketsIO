import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {SocketIOService} from "../socketIO.service";

@Component({
  selector: 'app-send-form',
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.scss']
})
export class SendFormComponent implements OnInit {
  public checkoutForm: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private socketService: SocketIOService
  ) {}

  public ngOnInit(): void {
    this.checkoutForm = this._formBuilder.group({
        message: ['', Validators.required]
      })
  }

  onSubmit(): void {
    this.socketService.sendMessage(this.checkoutForm.value.message);
    this.checkoutForm.reset();
  }
}

