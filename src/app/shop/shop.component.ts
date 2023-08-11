import { Component } from '@angular/core';
import { pageTransitions } from '../page-transitions';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: [
    './shop.component.scss',
    './shop_responsive.component.scss',
    './breadcrumb.component.scss',
  ],
  animations: [pageTransitions],
})
export class ShopComponent {
  products: Product[] = [];
  showedProducts: Product[] = [];
  activeCategory: string = 'all';
  activeSort: string = 'dafault';
  isLoading: boolean = true;

  constructor(
    private productService: ProductsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchProducts();
    this.activeRoute.queryParams.subscribe((params) => {
      this.activeCategory = params['category'] || 'all';
      this.setProducts();
    });
  }

  fetchProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
        this.setProducts();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }

  getCategoryLength(category: string): Number {
    if (category === 'all') return this.products.length;
    const productCat = this.products.filter(
      (product) =>
        product.category.toLocaleLowerCase() === category.toLocaleLowerCase()
    );
    return productCat.length;
  }

  setCategory(category: string): void {
    this.activeCategory = category;
    this.setProducts();
  }

  setSort(event: any): void {
    this.activeSort = event.target.value;
    this.setProducts();
  }

  setProducts() {
    let filtredProducts = this.products;
    if (this.activeCategory !== 'all') {
      filtredProducts = this.products.filter(
        (product) =>
          product.category.toLocaleLowerCase() ===
          this.activeCategory.toLocaleLowerCase()
      );
    }

    switch (this.activeSort) {
      case 'by_name':
        filtredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'by_price_desc':
        filtredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'by_price_asc':
        filtredProducts.sort((a, b) => b.price - a.price);
    }

    this.showedProducts = filtredProducts;
  }
}
