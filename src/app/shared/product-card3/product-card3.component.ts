import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { handleSearchState } from 'src/app/store/actions/header.action';

@Component({
  selector: 'app-product-card3',
  templateUrl: './product-card3.component.html',
  styleUrls: ['./product-card3.component.scss'],
})
export class ProductCard3Component {
  @Input() product?: Product;

  constructor(
    private router: Router,
    private headerStore: Store<{ header: any }>
  ) {}

  handleCardClick(): void {
    this.router.navigate(['/product/' + this.product?.id]);
    const body = document.querySelector('body');
    this.headerStore.dispatch(handleSearchState({ state: false }));
    body!.style.overflow = 'auto';
  }
}
