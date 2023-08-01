import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {
  handleAuthState,
  handleUserState,
} from 'src/app/store/actions/auth.action';
import {
  handleLoginState,
  handleRegisterState,
} from 'src/app/store/actions/header.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  header$: Observable<any>;
  showLogin: boolean = false;
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private store: Store<{ header: any }>,
    private authStore: Store<{ auth: any }>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.header$ = store.select('header');
    this.header$.subscribe((headerData) => {
      this.showLogin = headerData.isLoginOpen;
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  closeLogin(): void {
    this.store.dispatch(handleLoginState({ state: false }));
  }

  register(): void {
    this.closeLogin();
    this.store.dispatch(handleRegisterState({ state: true }));
  }

  login(): void {
    if (this.canSubmit()) {
      this.isLoading = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.login(email, password).subscribe({
        next: (res) => {
          this.isLoading = false;
          const token = res.token;
          this.cookieService.set('auth_token', token);
          this.cookieService.set('is_auth', 'true');
          this.cookieService.set('userId', res.user._id);
          this.store.dispatch(handleLoginState({ state: false }));
          if (this.cookieService.get('is_auth') === 'true') {
            this.authStore.dispatch(handleAuthState({ state: true }));
            this.authStore.dispatch(
              handleUserState({ state: this.cookieService.get('userId') })
            );
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }

  canSubmit(): boolean {
    return this.loginForm.valid;
  }
}
