import { Component, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent {
  @Input() product?: Product;
}
