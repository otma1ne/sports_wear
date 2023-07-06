import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  handleLoginState,
  handleRegisterState,
} from 'src/app/store/actions/header.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  header$: Observable<any>;
  showRegister: boolean = false;

  constructor(private store: Store<{ header: any }>) {
    this.header$ = store.select('header');
    this.header$.subscribe((headerData) => {
      this.showRegister = headerData.isRegisterOpen;
    });
  }

  closeRegister(): void {
    this.store.dispatch(handleRegisterState({ state: false }));
  }

  login(): void {
    this.closeRegister();
    this.store.dispatch(handleLoginState({ state: true }));
  }
}
