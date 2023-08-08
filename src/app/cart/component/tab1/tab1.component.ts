import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductCart } from 'src/app/models/product_cart.model';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss'],
})
export class Tab1Component {
  @Input() productsCart: ProductCart[] = [];
  @Output() switchTabs = new EventEmitter<any>();

  cart$: Observable<any>;

  constructor(private cartStore: Store<{ cart: any }>) {
    this.cart$ = this.cartStore.select('cart');
  }

  onCheckout(): void {
    this.switchTabs.emit('checkout');
  }
}
