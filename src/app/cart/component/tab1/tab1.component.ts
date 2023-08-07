import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductCart } from 'src/app/models/product_cart.model';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss'],
})
export class Tab1Component {
  cart$: Observable<any>;
  productsCart: ProductCart[] = [];

  constructor(private cartStore: Store<{ cart: any }>) {
    this.cart$ = this.cartStore.select('cart');
    this.cart$.subscribe((data) => {
      this.productsCart = data.cart;
    });
  }
}
