import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: Product;
  currentImg: number = 0;

  constructor(private router: Router) {}

  handleCardClick(): void {
    this.router.navigate(['/product']);
  }

  handleAddToCart(event: any): void {
    event.stopPropagation();
  }

  onHoverStart() {
    if (this.product?.images.length ?? 0 > 0) {
      this.currentImg = 1;
    }
  }

  onHoverEnd() {
    this.currentImg = 0;
  }
}
