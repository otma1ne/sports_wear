import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { handleLoginState } from 'src/app/store/actions/header.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  header$: Observable<any>;
  showLogin: boolean = false;

  constructor(private store: Store<{ header: any }>) {
    this.header$ = store.select('header');
    this.header$.subscribe((headerData) => {
      this.showLogin = headerData.isLoginOpen;
    });
  }

  closeLogin(): void {
    this.store.dispatch(handleLoginState({ state: false }));
  }
}
