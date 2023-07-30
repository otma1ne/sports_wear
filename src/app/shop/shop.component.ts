import { Component } from '@angular/core';
import { pageTransitions } from '../page-transitions';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss', './shop_responsive.component.scss'],
  animations: [pageTransitions],
})
export class ShopComponent {
  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
