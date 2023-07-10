import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { handleCartState } from 'src/app/store/actions/header.action';
import { Product } from '../models/product';

@Component({
  selector: 'app-sidecart',
  templateUrl: './sidecart.component.html',
  styleUrls: ['./sidecart.component.scss'],
})
export class SidecartComponent {
  header$: Observable<any>;
  auth$: Observable<any>;
  cart$: Observable<any>;
  showCart: boolean = false;
  isAuth: boolean = false;
  products: Product[] = [];

  constructor(
    private store: Store<{ header: any }>,
    private authStore: Store<{ auth: any }>,
    private cartStore: Store<{ cart: any }>
  ) {
    this.auth$ = this.authStore.select('auth');
    this.auth$.subscribe((authData) => {
      this.isAuth = authData.isAuth;
    });
    this.header$ = this.store.select('header');
    this.header$.subscribe((headerData) => {
      this.showCart = headerData.isCartOpen;
    });
    this.cart$ = this.cartStore.select('cart');
    this.cart$.subscribe((cartData) => {
      this.products = cartData.cart;
    });
  }

  ngOnInit() {}

  closeSidecart(): void {
    const body = document.querySelector('body');
    this.store.dispatch(handleCartState({ state: false }));
    body!.style.overflow = 'auto';
  }
}
