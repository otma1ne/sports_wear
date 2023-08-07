import { Component, Input } from '@angular/core';
import { ProductCart } from 'src/app/models/product_cart.model';

@Component({
  selector: 'app-product-card2',
  templateUrl: './product-card2.component.html',
  styleUrls: ['./product-card2.component.scss']
})
export class ProductCard2Component {

  @Input() product?: ProductCart;

}
