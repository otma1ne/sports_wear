import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
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
  registerForm: FormGroup;
  isLoading: boolean = false;
  showError: boolean = false;

  constructor(
    private store: Store<{ header: any }>,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.header$ = store.select('header');
    this.header$.subscribe((headerData) => {
      this.showRegister = headerData.isRegisterOpen;
    });

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  closeRegister(): void {
    this.store.dispatch(handleRegisterState({ state: false }));
  }

  login(): void {
    this.closeRegister();
    this.store.dispatch(handleLoginState({ state: true }));
  }

  register(): void {
    if (this.canSubmit()) {
      this.isLoading = true;
      const user: User = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        cart: [],
      };
      this.authService.register(user).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.closeRegister();
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }

  canSubmit(): boolean {
    this.showError = true;
    return this.registerForm.valid;
  }
}
