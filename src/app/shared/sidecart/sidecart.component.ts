import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { handleCartState } from 'src/app/store/actions/header.action';
import { ProductCart } from 'src/app/models/product_cart.model';
import { Router } from '@angular/router';

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
  products: ProductCart[] = [];

  constructor(
    private store: Store<{ header: any }>,
    private authStore: Store<{ auth: any }>,
    private cartStore: Store<{ cart: any }>,
    private router: Router
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

  calculTotal(): number {
    let total = 0;
    for (const product of this.products) {
      total += product.sale_price * product.quantity;
    }
    return total;
  }

  redirectTocart(activeTab: string) {
    if (activeTab !== '') {
      this.router.navigate(['/cart'], {
        queryParams: { activeTab: activeTab },
      });
    } else {
      this.router.navigate(['/cart']);
    }
    const body = document.querySelector('body');
    this.store.dispatch(handleCartState({ state: false }));
    body!.style.overflow = 'auto';
  }
}
