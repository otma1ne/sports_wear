import { Component, Input } from '@angular/core';
import { ProductCart } from 'src/app/models/product_cart.model';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent {
  @Input() product?: ProductCart;
}
