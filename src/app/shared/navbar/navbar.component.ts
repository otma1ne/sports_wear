import { Component, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  handleCartState,
  handleLoginState,
  handleMenuState,
  handleSearchState,
} from 'src/app/store/actions/header.action';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import {
  handleAuthState,
  handleUserState,
} from 'src/app/store/actions/auth.action';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.scss',
    './navbar-responsive.component.scss',
    './navbar-header.component.scss',
  ],
})
export class NavbarComponent {
  isScrolled: boolean = false;
  showCart: boolean = false;
  showSearch: boolean = false;
  showMenu: boolean = false;
  header$: Observable<any>;
  cart$: Observable<any>;
  auth$: Observable<any>;
  isAuth: boolean = false;
  cartCount: number = 0;
  showUserMenu: boolean = false;
  selectedLang = 'en';
  username: string = '';
  email: string = '';
  subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private router: Router,
    private store: Store<{ header: any }>,
    private cartStore: Store<{ cart: any }>,
    private authStore: Store<{ auth: any }>,
    private authService: AuthService,
    private cookieService: CookieService,
    @Inject(DOCUMENT) private document: Document
  ) {
    translate.setDefaultLang('en');
    this.header$ = store.select('header');
    this.header$.subscribe((headerData) => {
      this.showCart = headerData.isCartOpen;
      this.showSearch = headerData.isSearchOpen;
      this.showMenu = headerData.isMenuOpen;
    });
    this.cart$ = this.cartStore.select('cart');
    this.cart$.subscribe((cartData) => {
      this.cartCount = cartData.cart.length;
    });
    this.auth$ = authStore.select('auth');
    this.auth$.subscribe((authData) => {
      this.isAuth = authData.isAuth;
    });
    this.username = this.cookieService.get('username');
    this.email = this.cookieService.get('email');
  }

  ngOnInit() {
    const currentLanguage = this.translate.getBrowserLang();
    const laguageSelector = this.document.querySelector(
      `#lang-selector option[value=${currentLanguage}]`
    );
    laguageSelector?.setAttribute('selected', 'true');
  }

  switchLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.translate.use(lang);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  hnadleMenuClick(state: boolean): void {
    const body = document.querySelector('body');
    this.store.dispatch(handleMenuState({ state }));
    if (state) {
      body!.style.overflow = 'hidden';
    } else {
      body!.style.overflow = 'auto';
    }
  }

  handleMenuItemClick(param: string): void {
    if (param === 'home') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/shop'], {
        queryParams: { category: param },
      });
    }
    this.hnadleMenuClick(false);
  }

  handleCartClick(state: boolean) {
    const body = document.querySelector('body');
    this.store.dispatch(handleCartState({ state }));
    if (state) {
      body!.style.overflow = 'hidden';
    } else {
      body!.style.overflow = 'auto';
    }
  }

  handleSearchClick(state: boolean) {
    const body = document.querySelector('body');
    this.store.dispatch(handleSearchState({ state }));
    if (state) {
      body!.style.overflow = 'hidden';
    } else {
      body!.style.overflow = 'auto';
    }
  }

  handleLoginClick(): void {
    if (this.isAuth) {
      this.handleShowMenu(true);
    } else {
      this.store.dispatch(handleLoginState({ state: true }));
    }
  }

  handleShowMenu(value: boolean): void {
    this.showUserMenu = value;
  }

  logout(): void {
    const token = this.cookieService.get('auth_token');
    this.authService.logout(token).subscribe({
      next: (res) => {
        this.cookieService.delete('auth_token');
        this.cookieService.delete('is_auth');
        this.cookieService.delete('userId');
        this.authStore.dispatch(handleAuthState({ state: false }));
        this.authStore.dispatch(handleUserState({ state: '' }));
        this.showUserMenu = false;
      },
      error: (err) => {},
    });
  }

  onLangSelected(value: string) {
    this.translate.use(value);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }
}
