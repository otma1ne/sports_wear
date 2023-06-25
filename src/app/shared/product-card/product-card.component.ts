import { Component, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: Product;

  currentImg: number = 0;

  onHoverStart() {
    if (this.product?.images.length ?? 0 > 0) {
      this.currentImg = 1;
    }
  }

  onHoverEnd() {
    this.currentImg = 0;
  }
}
