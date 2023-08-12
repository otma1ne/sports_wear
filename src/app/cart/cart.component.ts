import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductCart } from '../models/product_cart.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  activeTab: string = '';
  cart$: Observable<any>;
  productsCart: ProductCart[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cartStore: Store<{ cart: any }>
  ) {
    this.cart$ = this.cartStore.select('cart');
    this.cart$.subscribe((data) => {
      this.productsCart = data.cart;
    });
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.activeTab = params['activeTab'] || '';
    });
  }

  switchTabs(value: string): void {
    this.activeTab = value;
  }

  returnToshop(): void {
    this.router.navigate(['/']);
  }

  calculTotal(): number {
    let total = 0;
    for (const product of this.productsCart) {
      total += product.sale_price * product.quantity;
    }
    return total;
  }
}
