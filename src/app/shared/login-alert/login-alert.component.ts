import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { handleLoginState } from 'src/app/store/actions/header.action';

@Component({
  selector: 'app-login-alert',
  templateUrl: './login-alert.component.html',
  styleUrls: ['./login-alert.component.scss'],
})
export class LoginAlertComponent {
  @Output() closeAlert = new EventEmitter<any>();

  constructor(private headerStore: Store<{ header: any }>) {}

  handleClose() {
    this.closeAlert.emit();
  }

  handleLogin() {
    this.headerStore.dispatch(handleLoginState({ state: true }));
    this.handleClose();
  }
}
