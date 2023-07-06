import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  handleCartState,
  handleLoginState,
  handleMenuState,
  handleSearchState,
} from 'src/app/store/actions/header.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isScrolled: boolean = false;
  showCart: boolean = false;
  showSearch: boolean = false;
  showMenu: boolean = false;
  header$: Observable<any>;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private store: Store<{ header: any }>
  ) {
    translate.setDefaultLang('en');
    this.header$ = store.select('header');
    this.header$.subscribe((headerData) => {
      this.showCart = headerData.isCartOpen;
      this.showSearch = headerData.isSearchOpen;
      this.showMenu = headerData.isMenuOpen;
    });
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

  handleMenuItemClick(path: string): void {
    this.router.navigate([path]);
    this.store.dispatch(handleMenuState({ state : false }));
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
    this.store.dispatch(handleLoginState({ state : true }));
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }
}
