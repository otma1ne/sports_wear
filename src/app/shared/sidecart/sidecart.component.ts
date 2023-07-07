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
  showCart: boolean = false;
  products: Product[] = [
    {
      id: 'product1',
      name: 'Top Dri FIT Academy',
      images: [
        'Top-Dri-FIT-Academy-1.jpg.webp',
        'Top-Dri-FIT-Academy-2.jpg.webp',
      ],
      rating: 5,
      price: 265,
      isHot: true,
      isSale: false,
    },
    {
      id: 'product2',
      name: 'Short Sleeve T-Shirt',
      images: [
        'Short-Sleeve-T-Shirt-1.jpg.webp',
        'Short-Sleeve-T-Shirt-2.jpg.webp',
      ],
      rating: 3,
      price: 265,
      isHot: true,
      isSale: false,
    },
  ];

  constructor(private store: Store<{ header: any }>) {
    this.header$ = store.select('header');
    this.header$.subscribe((headerData) => {
      this.showCart = headerData.isCartOpen;
    });
  }

  closeSidecart(): void {
    const body = document.querySelector('body');
    this.store.dispatch(handleCartState({ state: false }));
    body!.style.overflow = 'auto';
  }
}
